import { Link } from 'react-router-dom';
import { Arrow } from '../UI';
import home from '../../content/home.json';
import './styles.css';
const section = home.objectives;
const objectives = section.items;
export default function Objectives() {
  return <section id="objectives" className="section objectives"><div className="container"><div className="section-heading"><div><p className="eyebrow">{section.eyebrow}</p><h2 className="content-lines">{section.title}</h2></div><p className="content-lines">{section.description}</p></div><div className="objectives-grid">{objectives.map((item, index) => <article key={item.title}><span className="objective-number">0{index + 1}</span><h3>{item.title}</h3><p>{item.text}</p><Link className="text-link" to={item.link}>{item.action}<Arrow /></Link></article>)}</div></div></section>;
}
