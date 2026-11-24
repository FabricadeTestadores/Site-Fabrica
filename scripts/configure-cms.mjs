import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { cmsConfig } from './cms-schema.mjs';

// JSON is valid YAML; this avoids a second parser and keeps one schema for validation.
const source = process.argv.includes('--source');
const output = new URL(source ? '../public/admin/' : '../dist/admin/', import.meta.url);
const config = structuredClone(cmsConfig);
const endpoint = process.env.CMS_AUTH_URL?.trim();
if (endpoint) {
  const url = new URL(endpoint);
  if (url.protocol !== 'https:' || url.username || url.password || url.search || url.hash || url.pathname !== '/') {
    throw new Error('CMS_AUTH_URL deve ser a origem HTTPS do Worker, sem caminho, credenciais ou parâmetros.');
  }
  config.backend.base_url = url.origin;
}
await mkdir(output, { recursive: true });
await writeFile(new URL('config.yml', output), `${JSON.stringify(config, null, 2)}\n`);
if (!source) {
  const site = JSON.parse(await readFile(new URL('../src/content/site.json', import.meta.url), 'utf8'));
  const htmlFile = new URL('../dist/index.html', import.meta.url);
  const escape = (value) => value.replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');
  const html = (await readFile(htmlFile, 'utf8'))
    .replace(/<title>.*?<\/title>/, `<title>${escape(site.title)}</title>`)
    .replace(/(<meta name="description" content=")[^"]*("\s*\/?>)/, (_, before, after) => `${before}${escape(site.description)}${after}`)
    .replace(/<link rel="icon"[^>]*>/, `<link rel="icon" href="${escape(site.logo)}" />`);
  await writeFile(htmlFile, html);
}
console.log(`Configuração do CMS gerada em ${fileURLToPath(output)}. ${endpoint ? 'OAuth configurado.' : 'Login de produção aguardando CMS_AUTH_URL.'}`);
