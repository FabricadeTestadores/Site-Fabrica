import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Arrow } from '../UI';
import TypewriterWord from './TypewriterWord';
import home from '../../content/home.json';
import './styles.css';

const { hero } = home;
const heroPhotos = hero.photos;

export default function Header() {
  const [activePhoto, setActivePhoto] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  const photo = heroPhotos[activePhoto];

  useEffect(() => {
    if (reducedMotion || heroPhotos.length < 2) return;
    const timer = window.setInterval(() => setActivePhoto((current) => (current + 1) % heroPhotos.length), 5000);
    return () => window.clearInterval(timer);
  }, [reducedMotion]);

  useEffect(() => {
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handleChange = () => setReducedMotion(preference.matches);
    preference.addEventListener('change', handleChange);
    return () => preference.removeEventListener('change', handleChange);
  }, []);

  return (
    <header id="home" className="hero">
      <div className="container hero-grid">
        <div className="hero-copy">
          <p className="eyebrow"><span className="small-rule" /> {hero.eyebrow}</p>
          <h1>{hero.title} <TypewriterWord /></h1>
          <p className="hero-description">{hero.description}</p>
          <div className="hero-actions"><Link className="button button-primary" to={hero.primaryLink}>{hero.primaryLabel} <Arrow /></Link><Link className="text-link" to={hero.secondaryLink}>{hero.secondaryLabel} <Arrow diagonal /></Link></div>
          <div className="hero-institutions">{hero.institutions.map((institution) => <a key={institution.name} href={institution.url} target="_blank" rel="noopener noreferrer" aria-label={`${institution.name} (abre em nova aba)`}><img className={institution.wide ? 'hero-logo-uece' : undefined} src={institution.image} alt={institution.name} width={institution.wide ? 210 : 98} height={institution.wide ? 64 : 48} /></a>)}</div>
        </div>
        <figure className="hero-visual">
          <div className="hero-image-wrap">
            <div id="hero-photo" aria-live="off">
              <img className={`hero-image${photo.fit === 'online' ? ' hero-image-online' : ''}`} src={photo.src} alt={photo.alt} width={photo.width} height={photo.height} fetchPriority="high" />
            </div>
            <span className="image-label">{hero.imageLabel}</span>
          </div>
          <figcaption><div>{hero.caption}<br /><strong>{hero.captionHighlight}</strong></div><span className="figure-mark" aria-hidden="true">↗</span></figcaption>
        </figure>
      </div>
    </header>
  );
}
