import test from 'node:test';
import assert from 'node:assert/strict';
import { validateFields, validateContent } from './validate-content.mjs';
import { cmsConfig } from './cms-schema.mjs';
import { registrationIsOpen, registrationMessage, splitEvents, siteDate } from '../src/content/events.js';
import { readFile } from 'node:fs/promises';
import vm from 'node:vm';

test('todos os conteúdos migrados atendem ao esquema e apontam para imagens existentes', async () => {
  assert.equal(await validateContent(), 8);
});

test('publicação rejeita IDs duplicados, links perigosos e arquivos fora de public', () => {
  const fields = cmsConfig.collections.find((collection) => collection.name === 'artigos').files[0].fields;
  const article = { id: 1, title: 'Pesquisa', author: 'Equipe', date: '2026', summary: 'Resumo', link: 'https://example.org/artigo' };
  assert.deepEqual(validateFields(fields, { articles: [article] }), []);
  const errors = validateFields(fields, { articles: [article, { ...article, link: 'javascript:alert(1)' }] });
  assert.ok(errors.some((message) => message.includes('ID duplicado')));
  assert.ok(errors.some((message) => message.includes('URL')));
  assert.ok(validateFields([{name:'photo',widget:'image'}], {photo:'/../segredo.png'}).length);
});

test('datas impossíveis, listas vazias obrigatórias e rotas inexistentes são rejeitadas', () => {
  assert.ok(validateFields([{name:'endDate',widget:'datetime'}], {endDate:'2026-02-30'}).length);
  assert.ok(validateFields([{name:'photos',widget:'list',fields:[],min:1}], {photos:[]}).length);
  assert.ok(validateFields([{name:'to',widget:'string',pattern:['^/','Rota inválida']}], {to:'/inexistente'}).length);
});

test('eventos encerrados passam para o acervo sem perder registros; o último dia permanece na agenda', () => {
  const events = [{id:1,endDate:'2026-11-23'},{id:2,endDate:'2026-11-24'},{id:3}];
  const result = splitEvents(events, [{id:4}], '2026-11-24');
  assert.deepEqual(result.upcomingEvents.map(({id}) => id), [2,3]);
  assert.deepEqual(result.pastEvents.map(({id}) => id), [1,4]);
});

test('inscrição só abre com status, link e prazos válidos; respeita o fuso de Fortaleza', () => {
  const event = {link:'https://example.org',registrationStatus:'open',registrationDeadline:'2026-11-24',endDate:'2026-11-25'};
  assert.equal(registrationIsOpen(event,'2026-11-24'), true);
  assert.equal(registrationIsOpen(event,'2026-11-25'), false);
  assert.equal(registrationIsOpen({...event,registrationStatus:'closed'},'2026-11-24'), false);
  assert.equal(registrationIsOpen({...event,link:''},'2026-11-24'), false);
  assert.equal(registrationMessage(event,'2026-11-25'),'Inscrições encerradas');
  assert.equal(siteDate(new Date('2026-11-25T01:00:00Z')), '2026-11-24');
});

test('painel bloqueia login sem OAuth e nunca habilita proxy local em domínio público', async () => {
  const source = (await readFile(new URL('../public/admin/bootstrap.js', import.meta.url), 'utf8')).replace(/^startCMS\(\);\s*$/m, '');
  async function boot(hostname, search, endpoint = '') {
    const elements = Object.fromEntries(['cms-status','cms-message','cms-help'].map((id) => [id, {hidden:false}]));
    let initialized;
    const context = {
      URLSearchParams,
      window: {location: {hostname,search}, CMS:{init(config) {initialized=config.config;}}},
      fetch: async () => ({ok:true,json:async()=>({backend:{name:'github',base_url:endpoint}})}),
      document: {getElementById:(id)=>elements[id],createElement:()=>({}),head:{append:(script)=>script.onload()}},
    };
    await vm.runInNewContext(`${source}\nstartCMS();`, context);
    return {elements,initialized};
  }
  const pending = await boot('www.fabricadetestadores.com.br', '?local=true');
  assert.equal(pending.initialized, undefined);
  assert.match(pending.elements['cms-message'].textContent,/concluir a configuração/);
  const local = await boot('localhost','?local=true');
  assert.equal(local.initialized.local_backend.url,'http://localhost:8081/api/v1');
  assert.equal(local.initialized.backend.base_url,undefined);
  const production = await boot('www.fabricadetestadores.com.br','?local=true','https://oauth.example.org');
  assert.equal(production.initialized.local_backend,false);
  assert.equal(production.initialized.backend.base_url,'https://oauth.example.org');
});
