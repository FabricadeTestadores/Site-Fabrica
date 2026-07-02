# 🧪 Site - Fábrica de Testadores

Site institucional da **Fábrica de Testadores**, desenvolvido com React + Vite e publicado no GitHub Pages.

🌐 **Acesse:** [fabricadetestadores.com.br](https://www.fabricadetestadores.com.br)

---

## 📋 Sobre o Projeto

A Fábrica de Testadores é um grupo de pesquisa e extensão voltado para a área de qualidade de software e testes. Este site apresenta informações sobre a equipe, eventos, artigos publicados e serviços oferecidos pelo grupo.

---

## 🚀 Tecnologias Utilizadas

| Tecnologia | Versão | Descrição |
|---|---|---|
| [React](https://react.dev/) | ^19.1.1 | Biblioteca para construção de interfaces |
| [Vite](https://vitejs.dev/) | ^7.1.2 | Ferramenta de build e dev server |
| [React Router DOM](https://reactrouter.com/) | ^7.10.1 | Roteamento entre páginas |
| [gh-pages](https://github.com/tschaub/gh-pages) | ^6.3.0 | Deploy para o GitHub Pages |

---

## 📁 Estrutura do Projeto

```
src/
├── App.jsx                  # Configuração de rotas principal
├── pages/
│   ├── home.jsx             # Página inicial
│   ├── artigos.jsx          # Página de artigos
│   ├── eventos.jsx          # Página de eventos
│   └── servico.jsx          # Página de serviços
├── Components/
│   ├── Team/                # Seção da equipe com carrossel
│   ├── Events/              # Listagem de eventos (próximos e passados)
│   ├── Articles/            # Listagem de artigos submetidos
│   └── ...
└── content/
    ├── events/
    │   ├── upcomingEvents.json   # Dados dos próximos eventos
    │   └── pastEvents.json       # Dados dos eventos passados
    └── articles/
        └── artigos.json          # Dados dos artigos
```

---

## 📄 Páginas

- **`/`** — Página inicial com apresentação do grupo
- **`/artigos`** — Artigos científicos submetidos pelo grupo
- **`/eventos`** — Eventos futuros e passados com opção de inscrição
- **`/servicos`** — Serviços oferecidos pela Fábrica de Testadores

---

## ⚙️ Como Rodar Localmente

### Pré-requisitos

- [Node.js](https://nodejs.org/) (versão 18+)
- npm

### Instalação

```bash
# Clone o repositório
git clone https://github.com/FabricadeTestadores/Site-Fabrica.git

# Acesse a pasta do projeto
cd Site-Fabrica

# Instale as dependências
npm install
```

### Desenvolvimento

```bash
npm run dev
```

O servidor será iniciado em `http://localhost:5173`.

---

## 🚢 Deploy

O deploy é feito automaticamente para o GitHub Pages com o comando abaixo. Ele executa o build e publica o conteúdo da pasta `dist` no branch `gh-pages`.

```bash
# 1. Commit e envie as alterações
git add .
git commit -m "sua mensagem"
git push

# 2. Publique no GitHub Pages
npm run deploy
```

---

## 👥 Equipe

| Nome | Papel |
|---|---|
| Ismayle Santos | Coordenador |
| Pedro Henrique | Membro |
| Wallison Aquino | Membro |
| Gabriel Pinheiro | Membro |
| Paulo Matheus | Membro |
| Kayque Mateus | Membro |
| José Fortunato | Membro |
| Rafael Monteiro | Membro |

---

## 📝 Como Atualizar Conteúdo

Eventos e artigos são gerenciados via arquivos JSON — sem necessidade de mexer no código dos componentes.

- **Próximos eventos:** `src/content/events/upcomingEvents.json`
- **Eventos passados:** `src/content/events/pastEvents.json`
- **Artigos:** `src/content/articles/artigos.json`

---

## 📜 Licença

Este projeto é de uso interno do grupo Fábrica de Testadores — UECE.
