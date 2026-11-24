import { Link } from 'react-router-dom';
import { Arrow, ExternalLink } from '../UI';
import site from '../../content/site.json';
import './styles.css';
const partners = site.partners;
const channels = site.channels;
export default function Footer() {
  return (
    <footer id="contact" tabIndex={-1}>
      <div className="footer-main">
        <div className="container">
          <div className="footer-invitation">
            <h2>{site.invitation} <span>{site.invitationHighlight}</span></h2>
            <a href={`mailto:${site.email}`} className="footer-email">{site.email} <Arrow diagonal /></a>
          </div>
          <div className="footer-grid">
            <div className="footer-about">
              <Link className="brand" to="/">
                <img src={site.logo} alt="" width="44" height="44" />
                <span>{site.brandLine1}<br /><strong>{site.brandLine2}<span className="brand-dot">.</span></strong></span>
              </Link>
              <p className="content-lines">{site.footerDescription}</p>
              <p className="footer-affiliation">{site.affiliation}</p>
            </div>
            <nav aria-label="Navegação do rodapé">
              <h3>Explore</h3>
              {site.footerNavigation.map((item) => <Link key={item.to} to={item.to}>{item.label}</Link>)}
            </nav>
            <div className="footer-channels">
              <h3>Acompanhe</h3>
              {channels.map(({name, url}) => <ExternalLink href={url} key={name}>{name}</ExternalLink>)}
            </div>
            <div className="footer-address">
              <h3>Onde estamos</h3>
              <address className="content-lines">{site.address}</address>
            </div>
          </div>
          <section className="partners-inner" aria-labelledby="footer-partners-title">
            <div className="partners-heading">
              <h2 id="footer-partners-title">Nossos parceiros</h2>
              <p>Conexões que fortalecem.</p>
            </div>
            <ul className="partners-logos">
              {partners.map(({name, image, url, wide}) => (
                <li key={name}>
                  <a
                    className={`partner-logo ${wide ? 'partner-logo--wide' : ''}`.trim()}
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
            <p>© {new Date().getFullYear()} {site.copyrightName}.</p>
            <span>{site.footerNote}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
