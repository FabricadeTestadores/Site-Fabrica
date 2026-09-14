import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Arrow } from '../UI';
import TypewriterWord from './TypewriterWord';
import './styles.css';

const heroPhotos = [
  { src: '/Fabrica.jpeg', alt: 'Apresentação presencial sobre extensão universitária em uma sala de aula.', width: 1200, height: 1600 },
  { src: '/fabrica2.jpeg', alt: 'Encontro online da Fábrica de Testadores durante o curso preparatório para a certificação CTFL.', width: 1429, height: 752 },
];

export default function Header() {
  const [activePhoto, setActivePhoto] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  const photo = heroPhotos[activePhoto];

  useEffect(() => {
    if (reducedMotion) return;
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
          <p className="eyebrow"><span className="small-rule" /> Extensão universitária · UECE</p>
          <h1>Qualidade de software começa com <TypewriterWord /></h1>
          <p className="hero-description">Formamos pessoas em testes de software e conectamos conhecimento, pesquisa e prática para construir sistemas mais confiáveis.</p>
          <div className="hero-actions"><Link className="button button-primary" to="/eventos">Explore nossos eventos <Arrow /></Link><Link className="text-link" to="/#about">Conheça o projeto <Arrow diagonal /></Link></div>
          <div className="hero-institutions"><a href="https://www.uece.br/" target="_blank" rel="noopener noreferrer" aria-label="Universidade Estadual do Ceará (abre em nova aba)"><img className="hero-logo-uece" src="/logo_uece.png" alt="Universidade Estadual do Ceará" width="210" height="64" /></a><a href="https://gesaduece.com.br/pt" target="_blank" rel="noopener noreferrer" aria-label="GESAD (abre em nova aba)"><img src="/logo_gesad.png" alt="GESAD" width="98" height="48" /></a></div>
        </div>
        <figure className="hero-visual">
          <div className="hero-image-wrap">
            <div id="hero-photo" aria-live="off">
              <img className={`hero-image${activePhoto === 1 ? ' hero-image-online' : ''}`} src={photo.src} alt={photo.alt} width={photo.width} height={photo.height} fetchPriority="high" />
            </div>
            <span className="image-label">APRENDER. TESTAR. COMPARTILHAR.</span>
          </div>
          <figcaption><div>Da universidade<br /><strong>para a prática.</strong></div><span className="figure-mark" aria-hidden="true">↗</span></figcaption>
        </figure>
      </div>
    </header>
  );
}
