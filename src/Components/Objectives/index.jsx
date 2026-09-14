import { Link } from 'react-router-dom';
import { Arrow } from '../UI';
import './styles.css';
const objectives = [
  { title: 'Formar pessoas', text: 'Desenvolver competências em testes de software com cursos, minicursos e experiências práticas.', link: '/eventos', action: 'Conheça os eventos' },
  { title: 'Compartilhar conhecimento', text: 'Disseminar teoria e prática sobre qualidade e segurança de software, com materiais abertos à comunidade.', link: '/artigos', action: 'Explore os artigos' },
  { title: 'Conectar pesquisa e prática', text: 'Publicar estudos científicos e aproximar a universidade de parceiros externos por meio de projetos reais.', link: '/servicos', action: 'Veja os serviços' },
];
export default function Objectives() {
  return <section id="objectives" className="section objectives"><div className="container"><div className="section-heading"><div><p className="eyebrow">O que nos move</p><h2>Aprender fazendo.<br />E fazer a diferença.</h2></div><p>Três frentes que aproximam a universidade,<br className="desktop-only" /> o mercado e a comunidade.</p></div><div className="objectives-grid">{objectives.map((item, index) => <article key={item.title}><span className="objective-number">0{index + 1}</span><h3>{item.title}</h3><p>{item.text}</p><Link className="text-link" to={item.link}>{item.action}<Arrow /></Link></article>)}</div></div></section>;
}
