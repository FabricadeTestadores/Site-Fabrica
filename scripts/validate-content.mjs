import { readFile, readdir, stat } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { cmsConfig } from './cms-schema.mjs';

const root = fileURLToPath(new URL('../', import.meta.url));
const allowedRoutes = new Set(['/', '/eventos', '/artigos', '/servicos', '/#home', '/#about', '/#team', '/#contact', '/#objectives', '/#performance', '/#proximos-cursos']);
const publicRoot = path.join(root, 'public');
const imageExtensions = new Set(['.jpg', '.jpeg', '.png', '.webp', '.avif', '.gif', '.svg']);

export function validateFields(fields, data, location = 'conteúdo') {
  const errors = [];
  if (!data || typeof data !== 'object' || Array.isArray(data)) return [`${location}: esperado um objeto.`];
  for (const field of fields) {
    const value = data[field.name];
    const label = `${location}.${field.name}`;
    const empty = value === undefined || value === null || (typeof value === 'string' && !value.trim());
    if (empty) {
      if (field.required !== false) errors.push(`${label}: campo obrigatório.`);
      continue;
    }
    if (field.widget === 'list') {
      if (!Array.isArray(value)) { errors.push(`${label}: esperado uma lista.`); continue; }
      if (field.min && value.length < field.min) errors.push(`${label}: mínimo de ${field.min} item(ns).`);
      const ids = new Set();
      const names = new Set();
      value.forEach((item, index) => {
        errors.push(...validateFields(field.fields, item, `${label}[${index}]`));
        if (item?.id !== undefined) {
          if (ids.has(String(item.id))) errors.push(`${label}: ID duplicado ${item.id}.`);
          ids.add(String(item.id));
        }
        const key = item?.name ?? item?.to;
        if (key) {
          if (names.has(key)) errors.push(`${label}: nome/destino duplicado ${key}.`);
          names.add(key);
        }
      });
    } else if (field.widget === 'object') {
      errors.push(...validateFields(field.fields, value, label));
    } else if (field.widget === 'number') {
      if (!Number.isInteger(value) || value < field.min) errors.push(`${label}: esperado inteiro >= ${field.min}.`);
    } else if (field.widget === 'boolean') {
      if (typeof value !== 'boolean') errors.push(`${label}: esperado verdadeiro ou falso.`);
    } else if (typeof value !== 'string') {
      errors.push(`${label}: esperado texto.`);
    } else {
      if (field.pattern && !new RegExp(field.pattern[0]).test(value)) errors.push(`${label}: ${field.pattern[1]}`);
      if (field.widget === 'select' && !field.options.some((option) => (option.value ?? option) === value)) errors.push(`${label}: opção inválida.`);
      if (field.widget === 'datetime' && (!/^\d{4}-\d{2}-\d{2}$/.test(value) || !Number.isFinite(Date.parse(value)) || new Date(value).toISOString().slice(0, 10) !== value)) errors.push(`${label}: data inválida; use AAAA-MM-DD.`);
      if (field.name === 'photoPosition' && !/^(center|left|right|\d{1,3}%) (center|top|bottom|\d{1,3}%)$/.test(value)) errors.push(`${label}: enquadramento inválido (ex.: center 58%).`);
      if (field.pattern?.[0].startsWith('^https?')) {
        try {
          const url = new URL(value);
          if (!['http:', 'https:'].includes(url.protocol) || url.username || url.password) throw new Error();
        } catch { errors.push(`${label}: endereço externo inválido.`); }
      }
      if (field.pattern?.[0].startsWith('^/') && !allowedRoutes.has(value)) errors.push(`${label}: destino sem página ou seção correspondente.`);
      if (field.widget === 'image' && (!value.startsWith('/') || value.startsWith('//') || value.includes('..') || /[?#\\]/.test(value) || !imageExtensions.has(path.extname(value).toLowerCase()))) errors.push(`${label}: use uma imagem local da biblioteca de mídia.`);
    }
  }
  return errors;
}

function imagePaths(fields, data) {
  return fields.flatMap((field) => {
    const value = data?.[field.name];
    if (field.widget === 'image' && typeof value === 'string') return [value];
    if (field.widget === 'list' && Array.isArray(value)) return value.flatMap((item) => imagePaths(field.fields, item));
    if (field.widget === 'object' && value) return imagePaths(field.fields, value);
    return [];
  });
}

export async function validateContent() {
  const errors = [];
  const records = new Map();
  for (const collection of cmsConfig.collections) for (const file of collection.files) {
    try {
      const data = JSON.parse(await readFile(path.join(root, file.file), 'utf8'));
      records.set(file.name, data);
      errors.push(...validateFields(file.fields, data, file.file));
      for (const image of imagePaths(file.fields, data)) {
        const resolved = path.resolve(publicRoot, `.${image}`);
        if (!resolved.startsWith(`${publicRoot}${path.sep}`)) continue;
        try { if (!(await stat(resolved)).isFile()) throw new Error(); }
        catch { errors.push(`${file.file}: imagem não encontrada: ${image}.`); }
      }
    } catch (error) { errors.push(`${file.file}: ${error.message}`); }
  }
  const eventIds = new Set();
  for (const record of [records.get('upcoming'), records.get('past')]) for (const event of record?.events ?? []) {
    if (eventIds.has(String(event.id))) errors.push(`Eventos: ID ${event.id} repetido entre as listas.`);
    eventIds.add(String(event.id));
    if (event.registrationStatus === 'open' && !event.link) errors.push(`Evento ${event.id}: inscrições abertas exigem link.`);
    if (event.endDate && event.registrationDeadline && event.registrationDeadline > event.endDate) errors.push(`Evento ${event.id}: prazo de inscrição posterior ao fim do evento.`);
  }
  async function inspectUploads(directory) {
    for (const entry of await readdir(directory, { withFileTypes: true })) {
      if (entry.name === '.gitkeep') continue;
      const filename = path.join(directory, entry.name);
      if (entry.isDirectory()) { await inspectUploads(filename); continue; }
      if (entry.isSymbolicLink() || !imageExtensions.has(path.extname(filename).toLowerCase()) || path.extname(filename).toLowerCase() === '.svg') {
        errors.push(`Uploads: formato não permitido: ${entry.name}. Use JPG, PNG, WebP, AVIF ou GIF.`);
        continue;
      }
      if ((await stat(filename)).size > 5 * 1024 * 1024) errors.push(`Uploads: ${entry.name} excede 5 MB.`);
    }
  }
  await inspectUploads(path.join(publicRoot, 'uploads'));
  if (errors.length) throw new Error(`Conteúdo inválido:\n- ${errors.join('\n- ')}`);
  return records.size;
}

if (process.argv[1] && import.meta.url === pathToFileURL(path.resolve(process.argv[1])).href) {
  try { console.log(`Conteúdo validado: ${await validateContent()} arquivos, links, IDs e imagens conferidos.`); }
  catch (error) { console.error(error.message); process.exitCode = 1; }
}
