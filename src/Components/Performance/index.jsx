import articles from '../../content/articles/artigos.json';
import './styles.css';
const metrics = [['200+', 'pessoas impactadas'], ['05', 'softwares impactados'], ['06', 'cursos oferecidos'], [String(articles.length).padStart(2, '0'), articles.length === 1 ? 'artigo publicado' : 'artigos publicados']];
export default function Performance() {
  return <section id="performance" className="impact" aria-label="Resultados do projeto"><div className="container"><dl className="impact-grid">{metrics.map(([value, label]) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}</dl></div></section>;
}
