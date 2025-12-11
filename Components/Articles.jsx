import React from 'react'
import './Articles.css'

const Articles = () => {
  const articles = [
    {
      id: 1,
      title: 'Revisão sistemática da literatura',
      author: 'Lyanderson',
      date: '2025',
      summary: 'xxxxxxx',
      link: '#'
    }
  ]

  return (
    <section className="articles-container">
      <div className="articles-header">
        <h2>Artigos Submetidos</h2>
      </div>

      <div className="articles-grid">
        {articles.map((a) => (
          <article key={a.id} className="article-card">
            <h3 className="article-title">{a.title}</h3>
            <div className="article-meta">Por {a.author} • {a.date}</div>
            <p className="article-summary">{a.summary}</p>
            {/* <a className="article-link" href={a.link} target="_blank" rel="noopener noreferrer">Ler mais</a> */}
          </article>
        ))}
      </div>
    </section>
  )
}

export default Articles
