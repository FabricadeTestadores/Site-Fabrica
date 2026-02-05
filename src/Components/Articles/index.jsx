import './styles.css'
import articles from '../../content/articles/artigos.json';

const Articles = () => {
  return (
    <section className="articles-container">
      <div className="articles-header">
        <h2>Artigos Submetidos</h2>
      </div>

      <div className="articles-grid">
        {articles.map((article) => (
          <article key={article.id} className="article-card">
            <h3 className="article-title">{article.title}</h3>
            <div className="article-meta">Por {article.author} • {article.date}</div>
            <p className="article-summary">{article.summary}</p>
            <a className="article-link" href={article.link} target="_blank" rel="noopener noreferrer">Ler mais</a>
          </article>
        ))}
      </div>
    </section>
  )
}

export default Articles
