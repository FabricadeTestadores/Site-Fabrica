import React from 'react'
import './Articles.css'

const Articles = () => {
  const articles = [
    {
      id: 1,
      title: 'Revisão Multifocal sobre ferramentas de teste e estratégias de segurança de APIs em microsserviços',
      author: 'Ismayle de S. Santos, Ian José Soares Mendes, Lyanderson S. Rodrigues, Rubens A. da S. Sousa',
      date: '2025',
      summary: 'A comunicação em arquiteturas de microsserviços tem se tornado cada vez mais comum, exigindo atenção aos testes de segurança para garantir a qualidade das APIs. Este estudo, através de uma revisão multifocal, investigou ferramentas e estratégias de segurança aplicadas ao desenvolvimento de APIs. Foram analisados 50 artigos da literatura branca e 270 da cinza. As ferramentas mais citadas foram RESTest (6), OWASP ZAP (6) e Postman (4). Entre as estratégias, destacaram-se Spring Security (93), JWT (81) e API Gateway (37). Os principais testes envolvem validação de entrada (20), detecção de vulnerabilidades (19) e autenticação/autorização (14), com foco em mitigar ameaças como SQL Injection (11), falhas de configuração (10) e OWASP Top Ten (8).',
      link: 'https://sol.sbc.org.br/index.php/sbseg_estendido/article/view/36764'
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
            <a className="article-link" href={a.link} target="_blank" rel="noopener noreferrer">Ler mais</a>
          </article>
        ))}
      </div>
    </section>
  )
}

export default Articles
