const text = (name, label, extra = {}) => ({ name, label, widget: 'string', ...extra });
const paragraph = (name, label) => text(name, label, { widget: 'text' });
const optional = (field) => ({ ...field, required: false });
const url = (name, label, required = true) => text(name, label, { required, pattern: ['^https?://[^\\s]+$', 'Informe uma URL http:// ou https:// válida.'] });
const route = (name, label) => text(name, label, { pattern: ['^/(?!/)[^\\s]*$', 'Informe um caminho interno, como /eventos.'] });
const image = (name, label) => text(name, label, { widget: 'image', choose_url: false, media_library: { allow_multiple: false, config: { max_file_size: 5242880 } } });
const number = (name, label, min = 1) => ({ name, label, widget: 'number', value_type: 'int', min });
const bool = (name, label) => ({ name, label, widget: 'boolean', default: false });
const object = (name, label, fields) => ({ name, label, widget: 'object', fields });
const list = (name, label, fields, extra = {}) => ({ name, label, widget: 'list', fields, summary: `{{fields.${['title', 'name', 'label', 'text', 'alt'].find((key) => fields.some((field) => field.name === key)) ?? fields[0].name}}}`, ...extra });
const date = (name, label) => ({ name, label, widget: 'datetime', format: 'YYYY-MM-DD', date_format: 'DD/MM/YYYY', time_format: false, required: false });
const file = (name, label, path, fields) => ({ name, label, file: `src/content/${path}.json`, format: 'json', fields });
const collection = (name, label, files) => ({ name, label, editor: { preview: false }, files });
const navigation = (name, label) => list(name, label, [text('label', 'Texto'), route('to', 'Destino')], { min: 1 });
const eventFields = [
  number('id', 'ID (único; preserve os existentes)'), text('title', 'Título'), text('date', 'Datas dos encontros (texto)'),
  date('endDate', 'Último dia do evento (move automaticamente para anteriores)'),
  optional(text('time', 'Horário')), paragraph('description', 'Descrição'), optional(text('location', 'Local')),
  optional(paragraph('registrationPeriod', 'Texto do período de inscrição')),
  optional({ name: 'registrationStatus', label: 'Situação das inscrições', widget: 'select', default: 'soon', options: [{label:'Em breve',value:'soon'},{label:'Abertas',value:'open'},{label:'Encerradas',value:'closed'}] }),
  date('registrationDeadline', 'Último dia de inscrição'), url('link', 'Link de inscrição', false),
  optional(number('registrations', 'Quantidade de inscritos', 0)),
];

export const cmsConfig = {
  backend: { name: 'github', repo: 'FabricadeTestadores/Site-Fabrica', branch: 'main', base_url: '', auth_endpoint: 'auth' },
  locale: 'pt', site_url: 'https://www.fabricadetestadores.com.br', display_url: 'https://www.fabricadetestadores.com.br',
  logo_url: '/logo_fabrica-removebg-preview.png', media_folder: 'public/uploads', public_folder: '/uploads',
  collections: [
    collection('configuracoes', 'Configurações do site', [file('site', 'Identidade, contatos, menus e parceiros', 'site', [
      text('title', 'Nome do site'), paragraph('description', 'Descrição para buscadores'), text('brandLine1', 'Marca: primeira linha'), text('brandLine2', 'Marca: segunda linha'), image('logo', 'Logotipo e favicon'),
      text('email', 'E-mail', {pattern:['^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$','Informe um e-mail válido.']}), paragraph('address', 'Endereço (uma linha por trecho)'), text('contactAction', 'Botão de contato do menu'),
      paragraph('footerDescription', 'Descrição do rodapé'), text('affiliation', 'Vínculo institucional'), text('invitation', 'Convite do rodapé'), text('invitationHighlight', 'Convite: trecho destacado'), text('copyrightName', 'Nome no copyright'), text('footerNote', 'Frase final'),
      navigation('navigation', 'Menu principal'), navigation('footerNavigation', 'Menu do rodapé'),
      list('channels', 'Redes e canais', [text('name','Nome'),url('url','Endereço')]),
      list('partners', 'Parceiros', [text('name','Nome'),image('image','Logotipo'),url('url','Site'),bool('wide','Logotipo largo')]),
    ])]),
    collection('inicio', 'Página inicial', [file('home', 'Apresentação, textos e indicadores', 'home', [
      object('hero', 'Apresentação principal', [
        text('eyebrow','Chamada superior'), text('title','Título'),text('firstWord','Primeira palavra animada'),text('finalWord','Palavra final animada'), paragraph('description','Descrição'),
        text('primaryLabel','Texto do botão principal'),route('primaryLink','Destino do botão principal'),text('secondaryLabel','Texto do segundo link'),route('secondaryLink','Destino do segundo link'),
        text('imageLabel','Legenda sobre a foto'),text('caption','Legenda: primeira linha'),text('captionHighlight','Legenda: destaque'),
        list('photos','Fotografias',[image('src','Imagem'),text('alt','Descrição acessível'),number('width','Largura original'),number('height','Altura original'),{name:'fit',label:'Enquadramento',widget:'select',options:[{label:'Fotografia',value:'default'},{label:'Captura de encontro online',value:'online'}],default:'default'}],{min:1}),
        list('institutions','Instituições',[text('name','Nome'),image('image','Logotipo'),url('url','Site'),bool('wide','Logotipo largo')]),
      ]),
      object('about','Sobre o projeto',[
        text('eyebrow','Chamada'),text('title','Título: primeira linha'),text('highlight','Palavra destacada'),text('titleEnd','Final do título'),
        text('odsLabel','Legenda do ODS'),url('odsLink','Link do ODS'),image('odsImage','Imagem do ODS'),text('odsAlt','Descrição acessível do ODS'),
        paragraph('lead','Apresentação'),list('paragraphs','Parágrafos',[paragraph('text','Texto')]),text('disclosureTitle','Título do texto expansível'),paragraph('disclosureText','Texto expansível'),
      ]),
      object('objectives','Objetivos',[text('eyebrow','Chamada'),paragraph('title','Título'),paragraph('description','Introdução'),list('items','Objetivos',[text('title','Título'),paragraph('text','Descrição'),route('link','Destino'),text('action','Texto do link')])]),
      object('courses','Chamada dos cursos',[text('eyebrow','Chamada'),text('title','Título'),paragraph('intro','Introdução'),text('allLabel','Texto do link para eventos')]),
      object('knowledge','Chamada dos artigos',[text('eyebrow','Chamada'),text('title','Título'),text('allLabel','Texto do link para artigos')]),
      list('metrics','Indicadores manuais',[text('value','Valor'),text('label','Descrição')]),
    ])]),
    collection('equipe','Equipe',[file('team','Integrantes e apresentação','team',[
      text('eyebrow','Chamada'),text('title','Título'),paragraph('description','Introdução'),
      list('members','Integrantes',[text('name','Nome'),optional(text('role','Função')),image('photo','Foto'),optional(text('photoPosition','Enquadramento (ex.: center 58%)')),url('linkedin','LinkedIn',false),url('lattes','Lattes',false)]),
    ])]),
    collection('eventos','Eventos',[
      file('upcoming','Agenda de eventos','events/upcomingEvents',[list('events','Eventos',eventFields)]),
      file('past','Acervo de eventos anteriores','events/pastEvents',[list('events','Eventos',eventFields)]),
    ]),
    collection('artigos','Artigos científicos',[file('articles','Publicações','articles/artigos',[list('articles','Artigos',[
      number('id','ID (único; preserve os existentes)'),text('title','Título'),text('author','Autores'),text('date','Ano',{pattern:['^\\d{4}$','Informe um ano com quatro dígitos.']}),optional(text('venue','Conferência ou revista')),paragraph('summary','Resumo'),url('link','Publicação original'),
    ])])]),
    collection('servicos','Serviços',[file('services','Serviços realizados','services/servicos',[list('services','Serviços',[
      text('title','Projeto'),text('date','Ano',{pattern:['^\\d{4}$','Informe um ano com quatro dígitos.']}),paragraph('description','Descrição'),
    ])])]),
    collection('paginas','Textos das páginas',[file('pages','Eventos, artigos e serviços','pages',[
      object('events','Eventos',[text('title','Título'),paragraph('description','Introdução')]),
      object('articles','Artigos',[text('title','Título'),paragraph('description','Introdução')]),
      object('services','Serviços',[text('title','Título'),paragraph('description','Introdução'),text('contactTitle','Título do convite'),paragraph('contactText','Descrição do convite'),text('contactLabel','Texto do link de contato')]),
    ])]),
  ],
};
