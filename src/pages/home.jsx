import Header from '../Components/Header';
import Info from '../Components/Info';
import Objectives from '../Components/Objectives';
import Performance from '../Components/Performance';
import Team from '../Components/Team';
import UpcomingCourses from '../Components/UpcomingCourses';
import { Arrow } from '../Components/UI';
import { Link } from 'react-router-dom';
import articles from '../content/articles/artigos.json';

export default function Homepage() {
  const latestArticles = [...articles].sort((a, b) => Number(b.date) - Number(a.date)).slice(0, 2);
  return (
    <>
      <Header />
      <Performance />
      <Info />
      <Objectives />
      <UpcomingCourses />
      <section className="section knowledge">
        <div className="container">
          <div className="section-heading">
            <div><p className="eyebrow">Continue explorando</p><h2>Conhecimento em movimento.</h2></div>
            <Link className="text-link" to="/artigos">Todos os artigos <Arrow /></Link>
          </div>
          <div className="knowledge-articles">
            {latestArticles.map((article) => <article key={article.id}><p className="meta">Pesquisa · {article.date}</p><h3><Link className="text-link" to={`/artigos/${article.id}`}>{article.title}<Arrow /></Link></h3></article>)}
          </div>
        </div>
      </section>
      <Team />
    </>
  );
}
