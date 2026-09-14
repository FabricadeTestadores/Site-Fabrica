import { Link } from 'react-router-dom';
import { Arrow, ExternalLink } from '../UI';
import './styles.css';
const partners = [
  ['GREat', '/great.png', 'https://www.great.ufc.br/'],
  ['Residência em Segurança da Informação', '/Residencia.png', 'http://rsi.dc.ufc.br/', 'partner-logo--wide'],
  ['DETIC', '/detic.png', 'https://www.uece.br/proplan/detic/'],
  ['PROEX', '/PROEX.png', 'https://www.uece.br/proex/'],
];
const channels = [
  ['GitHub', 'https://github.com/FabricadeTestadores'],
  ['GitBook', 'https://fabrica-de-testadores-1.gitbook.io/fabrica-de-testadores'],
  ['LinkedIn', 'https://www.linkedin.com/in/f%C3%A1brica-de-testadores-06b161381/?originalSubdomain=br'],
  ['YouTube', 'https://www.youtube.com/@FabricadeTestadores'],
  ['Instagram · GESAD', 'https://www.instagram.com/gesad.uece/'],
];
export default function Footer() {
  return (
    <footer id="contact" tabIndex={-1}>
      <div className="footer-main">
        <div className="container">
          <div className="footer-invitation">
            <h2>Qualidade se constrói <span>em conjunto.</span></h2>
            <a href="mailto:fabrica.testadores@uece.br" className="footer-email">fabrica.testadores@uece.br <Arrow diagonal /></a>
          </div>
          <div className="footer-grid">
            <div className="footer-about">
              <Link className="brand" to="/">
                <img src="/logo_fabrica-removebg-preview.png" alt="" width="44" height="44" />
                <span>Fábrica de<br /><strong>Testadores<span className="brand-dot">.</span></strong></span>
              </Link>
              <p>Formação, pesquisa e prática<br />em qualidade de software.</p>
              <p className="footer-affiliation">Projeto de extensão · GESAD / UECE</p>
            </div>
            <nav aria-label="Navegação do rodapé">
              <h3>Explore</h3>
              <Link to="/#about">O projeto</Link>
              <Link to="/eventos">Eventos</Link>
              <Link to="/artigos">Artigos</Link>
              <Link to="/servicos">Serviços</Link>
              <Link to="/#team">Membros</Link>
            </nav>
            <div className="footer-channels">
              <h3>Acompanhe</h3>
              {channels.map(([name, url]) => <ExternalLink href={url} key={name}>{name}</ExternalLink>)}
            </div>
            <div className="footer-address">
              <h3>Onde estamos</h3>
              <address>Universidade Estadual do Ceará<br />Av. Dr. Silas Munguba, 1700<br />Itaperi, Fortaleza — CE<br />CEP: 60714-903</address>
            </div>
          </div>
          <section className="partners-inner" aria-labelledby="footer-partners-title">
            <div className="partners-heading">
              <h2 id="footer-partners-title">Nossos parceiros</h2>
              <p>Conexões que fortalecem.</p>
            </div>
            <ul className="partners-logos">
              {partners.map(([name, image, url, modifier = '']) => (
                <li key={name}>
                  <a
                    className={`partner-logo ${modifier}`.trim()}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${name} (abre em nova aba)`}
                  >
                    <img src={image} alt={name} width="144" height="48" loading="lazy" decoding="async" />
                  </a>
                </li>
              ))}
            </ul>
          </section>
          <div className="footer-bottom">
            <p>© {new Date().getFullYear()} Fábrica de Testadores — UECE.</p>
            <span>Feito para compartilhar conhecimento.</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
