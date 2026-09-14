import Header from '../Components/Header';
import Info from '../Components/Info';
import Objectives from '../Components/Objectives';
import Performance from '../Components/Performance';
import Team from '../Components/Team';
import { Arrow, ExternalLink } from '../Components/UI';
import { Link } from 'react-router-dom';
import articles from '../content/articles/artigos.json';
import upcomingEvents from '../content/events/upcomingEvents.json';

export default function Homepage() {
  const latestArticles = [...articles].sort((a, b) => Number(b.date) - Number(a.date)).slice(0, 2);
  const nextEvent = upcomingEvents[0];
  return (
    <>
      <Header />
      <Performance />
      <Info />
      <Objectives />
      <section className="section knowledge">
        <div className="container">
          <div className="section-heading">
            <div><p className="eyebrow">Continue explorando</p><h2>Conhecimento em movimento.</h2></div>
            <Link className="text-link" to="/artigos">Todos os artigos <Arrow /></Link>
          </div>
          <div className="knowledge-grid">
            <div className="knowledge-articles">
              {latestArticles.map((article) => <article key={article.id}><p className="meta">Pesquisa · {article.date}</p><h3><Link className="text-link" to={`/artigos/${article.id}`}>{article.title}<Arrow /></Link></h3></article>)}
            </div>
            <aside className="agenda-preview">
              <p className="eyebrow">Nossa agenda</p>
              <h3>{nextEvent ? nextEvent.title : 'Espaço para o próximo encontro.'}</h3>
              {nextEvent && <p className="agenda-event-date"><strong>Período:</strong> {nextEvent.date}</p>}
              <p>{nextEvent ? nextEvent.description.split('\n\n')[0] : 'Não há eventos agendados no momento. Enquanto isso, explore os encontros que já realizamos e nossos conteúdos abertos.'}</p>
              <div className="agenda-actions">
                {nextEvent?.link && <ExternalLink className="button button-primary" href={nextEvent.link}>Inscrever-se</ExternalLink>}
                <Link className="text-link" to={nextEvent ? '/eventos' : '/eventos?periodo=passados'}>{nextEvent ? 'Ver programação' : 'Conhecer eventos anteriores'}<Arrow /></Link>
              </div>
            </aside>
          </div>
        </div>
      </section>
      <Team />
    </>
  );
}
