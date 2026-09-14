import { Link, useParams } from 'react-router-dom';
import { Arrow, ExternalLink } from '../Components/UI';
import articles from '../content/articles/artigos.json';
import './artigo.css';

export default function Artigo() {
  const { id } = useParams();
  const article = articles.find((item) => String(item.id) === id);

  if (!article) {
    return (
      <section className="container section not-found">
        <p className="eyebrow">Artigos</p>
        <h1>Artigo não encontrado.</h1>
        <p>Este artigo não está disponível no acervo. Explore as outras publicações do projeto.</p>
        <Link className="button button-primary" to="/artigos">Voltar aos artigos</Link>
      </section>
    );
  }

  return (
    <article className="article-detail" aria-labelledby="article-title">
      <header className="page-intro article-detail-intro">
        <div className="container">
          <nav className="breadcrumb" aria-label="Caminho da página">
            <Link to="/">Início</Link>
            <span aria-hidden="true">/</span>
            <Link to="/artigos">Artigos</Link>
            <span aria-hidden="true">/</span>
            <span aria-current="page">Detalhes do artigo</span>
          </nav>
          <p className="eyebrow">Artigo científico</p>
          <h1 id="article-title">{article.title}</h1>
          <dl className="article-detail-meta">
            <div className="article-detail-authors">
              <dt>Autores</dt>
              <dd>{article.author}</dd>
            </div>
            <div>
              <dt>Conferência ou revista</dt>
              <dd>{article.venue || 'Não informada'}</dd>
            </div>
            <div>
              <dt>Ano</dt>
              <dd><time dateTime={article.date}>{article.date}</time></dd>
            </div>
          </dl>
        </div>
      </header>
      <div className="container article-detail-content">
        <section className="article-detail-summary" aria-labelledby="article-summary-title">
          <h2 id="article-summary-title">Resumo</h2>
          <div className="article-detail-copy">
            <p>{article.summary}</p>
            <div className="article-detail-actions">
              <ExternalLink href={article.link} className="button button-primary">Acessar publicação original</ExternalLink>
              <Link to="/artigos" className="text-link">Voltar aos artigos <Arrow /></Link>
            </div>
          </div>
        </section>
      </div>
    </article>
  );
}
