# Administração de conteúdo

O site continua em React + Vite e GitHub Pages. O Decap CMS edita JSON e envia imagens para `public/uploads`. As publicações do painel geram commits na `main`; o GitHub Actions valida os dados, gera o site e publica o resultado.

## Testar no computador sem OAuth

Use Node 22.12+ ou 24+ e instale as dependências com `npm ci`. Na raiz do projeto, abra dois terminais:

```powershell
# Terminal 1
npm run dev -- --host 127.0.0.1
```

```powershell
# Terminal 2
npm run cms:local
```

Abra `http://localhost:5173/admin/?local=true` (ajuste a porta se o Vite informar outra). O modo local edita arquivos no computador; não envia commits nem publica. O site em desenvolvimento atualiza pelo Vite. Não foi configurada uma prévia visual das páginas dentro do editor.

O proxy local não tem autenticação: use apenas no computador de desenvolvimento, não o exponha à internet ou à rede e encerre-o ao terminar. O painel só aceita `?local=true` em hosts de loopback (`localhost`, `127.0.0.1` ou `[::1]`).

## Ativar login e publicação em produção

Sem OAuth, `/admin/` mostra uma mensagem de ativação pendente; o site funciona normalmente.

1. Crie uma conta no Cloudflare. Use um Worker separado para OAuth, sem mudar a hospedagem ou o DNS do site.
2. Prepare o [proxy comunitário indicado pelo Decap](https://github.com/sterlingwes/decap-proxy) em uma pasta/repositório separado. Revise a versão utilizada e siga seu README para configurar e publicar. O endereço `workers.dev` do Worker é suficiente.
3. Crie uma OAuth App nas configurações da conta/organização GitHub responsável. Nesse template, use a origem do Worker como Homepage URL e `https://SEU-WORKER.SUA-CONTA.workers.dev/callback` como Authorization callback URL.
4. Cadastre `GITHUB_OAUTH_ID` e `GITHUB_OAUTH_SECRET` como **Secrets do Worker**. Nunca coloque o Client Secret nem tokens no código público, em variáveis `VITE_*` ou em mensagens.
5. Publique o proxy, confira `/auth`, `/callback` e a validação de estado/origem do fluxo OAuth. Autorize o aplicativo na organização GitHub se a política exigir.
6. No repositório `FabricadeTestadores/Site-Fabrica`, abra **Settings → Secrets and variables → Actions → Variables** e crie a variável de repositório `CMS_AUTH_URL`. Use a origem HTTPS do Worker, sem `/auth`, `/callback`, credenciais ou parâmetros.
7. Em **Settings → Pages → Source**, selecione **GitHub Actions**, mantendo o domínio personalizado e HTTPS. `public/CNAME` continua sendo incluído no build.
8. Envie as mudanças ao GitHub e acompanhe **Actions → Validar e publicar site**. Depois de alterar `CMS_AUTH_URL`, execute **Run workflow** ou envie outro commit na `main`: mudar a variável não dispara o build sozinho.
9. Acesse `https://www.fabricadetestadores.com.br/admin/`, entre e teste uma edição. Confira a execução do Actions e o resultado público.

Cada editor precisa de conta GitHub com acesso de escrita ao repositório. Essa permissão também permite alterar código fora do painel; o formulário não é uma barreira de autorização por arquivo. Use contas individuais, 2FA e colaboradores de confiança. Proteções que bloqueiam push na `main` podem bloquear o CMS; se houver aprovação obrigatória, configure um fluxo editorial compatível em vez de remover as proteções.

Referências: [backend GitHub](https://decapcms.org/docs/github-backend/), [OAuth](https://decapcms.org/docs/backends-overview/), [GitHub Pages](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages).

## Áreas editáveis

| Painel | Arquivo |
| --- | --- |
| Configurações, contatos, menus e parceiros | `src/content/site.json` |
| Página inicial, fotos e indicadores | `src/content/home.json` |
| Equipe | `src/content/team.json` |
| Agenda de eventos | `src/content/events/upcomingEvents.json` |
| Acervo de eventos anteriores | `src/content/events/pastEvents.json` |
| Artigos | `src/content/articles/artigos.json` |
| Serviços | `src/content/services/servicos.json` |
| Textos das páginas | `src/content/pages.json` |

É possível adicionar, remover e reordenar itens. Os JSON usam objetos com listas nomeadas (`articles`, `events`, `services`); os consumidores foram adaptados. Os textos não interpretam HTML enviado pelo editor. Criar layouts ou rotas continua exigindo desenvolvimento.

O esquema está em `scripts/cms-schema.mjs`. Após alterá-lo, rode `npm run cms:config` e inclua `public/admin/config.yml` no commit. O arquivo gerado usa JSON, que é YAML válido. `npm run dev` regenera a configuração local; o build gera a configuração de produção em `dist/admin/config.yml`.

## Publicar uma atualização

1. Entre em `/admin/`, escolha a área e edite os campos.
2. Salve/publique pelo comando do editor. Não existe revisão separada configurada.
3. Aguarde o Actions concluir. Salvar no GitHub e publicar o site são etapas distintas.
4. Atualize o site para conferir.

Se a validação/build falhar, a versão pública anterior permanece. Corrija o erro indicado ou reverta o commit. Não execute o deploy manual durante uma publicação automática.

## Eventos e inscrições

- **Datas dos encontros:** texto livre para vários encontros ou intervalos.
- **Último dia do evento:** data estruturada opcional. No dia seguinte, o evento da agenda aparece entre os anteriores, considerando `America/Fortaleza`. A classificação acontece ao abrir a página; o arquivo não é movido.
- **Situação das inscrições:** em breve, abertas ou encerradas. Ter um link não abre inscrições automaticamente.
- **Último dia de inscrição:** após a data, o botão de inscrição deixa de aparecer.
- **Texto do período de inscrição:** separado da descrição.
- **ID:** inteiro positivo único entre ambas as listas. Preserve os IDs publicados.

O acervo anterior permanece sempre no histórico. Sem data estruturada, um evento da agenda permanece nela até ser editado ou movido manualmente. Não duplique IDs entre arquivos. Os dois cursos já encerrados foram preservados com seus prazos estruturados e agora aparecem no histórico.

## Imagens e validação

Envie imagens pela biblioteca. Prefira nomes sem espaços nem acentos e preencha descrições acessíveis e dimensões das fotos principais. Os logos e fotos da equipe usam os nomes das instituições/integrantes como descrição.

Uploads aceitam JPG, PNG, WebP, AVIF ou GIF de até 5 MB; novos SVG e arquivos executáveis são rejeitados. Os SVG existentes na identidade visual continuam disponíveis. As referências devem apontar para imagens locais em `public/`. O build verifica campos obrigatórios, IDs repetidos, anos, datas, destinos, URLs e arquivos existentes. O validador não substitui controle de acesso: escritores do repositório continuam sendo pessoas de confiança.

```powershell
npm run content:validate
npm test
npm run build
npm run preview
```

O build atualiza também título, descrição e favicon no HTML. `CMS_AUTH_URL` é público; para testar OAuth em PowerShell, defina `$env:CMS_AUTH_URL = 'https://SEU-WORKER.SUA-CONTA.workers.dev'` antes de `npm run build`.

## Recuperação e backup

Reverta o commit de uma edição para desfazê-la e disparar outra publicação. Para recuperar apenas um arquivo ou imagem, restaure a versão anterior em um novo commit. Evite reescrever o histórico da `main`.

Mantenha uma cópia independente, incluindo imagens. Em outro disco/destino da equipe:

```powershell
git clone --mirror https://github.com/FabricadeTestadores/Site-Fabrica.git Site-Fabrica-backup.git
```

Preserve cópias datadas antes de atualizar o espelho e teste a restauração em outro repositório. Git não inclui alterações locais sem commit, configurações das contas nem segredos OAuth. Documente responsáveis e guarde os segredos em um gerenciador de senhas da equipe.

## Custos e operação

Decap é gratuito; GitHub Pages, Actions e o Worker podem operar nas condições gratuitas dos provedores. Domínio e cotas continuam aplicáveis. Esta implementação não criou contas, cadastrou credenciais nem alterou configurações externas.

A instalação registrou alertas no `npm audit`, inclusive em dependências de desenvolvimento do proxy local. O `decap-server` é usado apenas no desenvolvimento e não é enviado em `dist/`. Não foram aplicadas atualizações forçadas das dependências existentes; revise os avisos antes de expor qualquer serviço de desenvolvimento.
