import articlesData from '../../content/articles/artigos.json';
import home from '../../content/home.json';
import './styles.css';
const articles = articlesData.articles;
const metrics = [...home.metrics.map(({ value, label }) => [value, label]), [String(articles.length).padStart(2, '0'), articles.length === 1 ? 'artigo publicado' : 'artigos publicados']];
export default function Performance() {
  return <section id="performance" className="impact" aria-label="Resultados do projeto"><div className="container"><dl className="impact-grid">{metrics.map(([value, label]) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}</dl></div></section>;
}
