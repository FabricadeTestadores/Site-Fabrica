import { useState } from 'react';
import { Link } from 'react-router-dom';
import articles from '../../content/articles/artigos.json';
import { Arrow, PageIntro } from '../UI';
import './styles.css';

const normalize = (value) => value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLocaleLowerCase('pt-BR');
export default function Articles() {
  const [query, setQuery] = useState('');
  const [year, setYear] = useState('');
  const years = [...new Set(articles.map((article) => article.date))].sort().reverse();
  const results = [...articles].filter((article) => (!year || article.date === year) && normalize(`${article.title} ${article.author} ${article.summary}`).includes(normalize(query.trim()))).sort((a, b) => Number(b.date) - Number(a.date));
  return (
    <>
      <PageIntro label="Artigos" title="Pesquisa que amplia a prática.">Explore os artigos científicos do grupo sobre testes, segurança e qualidade de software.</PageIntro>
      <section className="container content-section" aria-label="Artigos científicos">
        <div className="results-toolbar">
          <div className="article-filters">
            <label className="field article-search" htmlFor="article-search">
              Busque no acervo
              <input id="article-search" type="search" placeholder="Título, autor ou assunto" value={query} onChange={(event) => setQuery(event.target.value)} />
            </label>
            <label className="field" htmlFor="article-year">
              Ano
              <select id="article-year" value={year} onChange={(event) => setYear(event.target.value)}>
                <option value="">Todos os anos</option>
                {years.map((item) => <option key={item} value={item}>{item}</option>)}
              </select>
            </label>
          </div>
          <p className="results-count" role="status">{results.length} {results.length === 1 ? 'artigo encontrado' : 'artigos encontrados'}</p>
        </div>
        <div className="article-list">
          {results.map((article) => (
            <article className="research-article" key={article.id}>
              <div className="article-year"><span>{article.date}</span><span>Pesquisa</span></div>
              <div>
                <h2><Link className="text-link" to={`/artigos/${article.id}`}>{article.title}<Arrow /></Link></h2>
                <p className="article-authors">{article.author}</p>
                <details className="disclosure article-abstract">
                  <summary>Ler resumo <span aria-hidden="true">+</span></summary>
                  <p>{article.summary}</p>
                </details>
                <Link to={`/artigos/${article.id}`} className="text-link article-source">Ver artigo <Arrow /></Link>
              </div>
            </article>
          ))}
        </div>
        {!results.length && (
          <div className="empty-state">
            <h2>Nenhum artigo encontrado.</h2>
            <p>Tente outro título, autor ou assunto, ou amplie o período da busca.</p>
            <button type="button" className="button button-secondary" onClick={() => { setQuery(''); setYear(''); document.getElementById('article-search').focus(); }}>Limpar filtros</button>
          </div>
        )}
      </section>
    </>
  );
}
