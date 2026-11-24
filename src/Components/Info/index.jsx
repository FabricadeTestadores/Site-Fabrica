import { useEffect, useRef, useState } from 'react';
import home from '../../content/home.json';
import './styles.css';
const { about } = home;
export default function Info() {
  const qualityRef = useRef(null);
  const [blinking, setBlinking] = useState(false);

  useEffect(() => {
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (preference.matches || !window.IntersectionObserver) return;

    const observer = new IntersectionObserver((entries) => {
      if (entries.some((entry) => entry.isIntersecting && entry.intersectionRatio >= 0.8)) {
        setBlinking(true);
        observer.disconnect();
      }
    }, { threshold: 0.8 });

    function stopForReducedMotion() {
      if (preference.matches) {
        observer.disconnect();
        setBlinking(false);
      }
    }

    observer.observe(qualityRef.current);
    preference.addEventListener('change', stopForReducedMotion);
    return () => {
      observer.disconnect();
      preference.removeEventListener('change', stopForReducedMotion);
    };
  }, []);
  return (
    <section id="about" className="section about" tabIndex={-1}>
      <div className="container about-grid">
        <div>
          <p className="eyebrow">{about.eyebrow}</p>
          <h2>{about.title}<br /><span ref={qualityRef} className={`quality-highlight${blinking ? ' is-blinking' : ''}`} onAnimationEnd={() => setBlinking(false)}>{about.highlight}</span> {about.titleEnd}</h2>
          <p className="about-ods-label">{about.odsLabel}</p>
          <a
            className="about-ods"
            href={about.odsLink}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${about.odsAlt} (abre em nova aba)`}
          >
            <img
              src={about.odsImage}
              alt={about.odsAlt}
              width="120"
              height="120"
              loading="lazy"
              decoding="async"
            />
          </a>
        </div>
        <div className="about-copy">
          <p className="lead">{about.lead}</p>
          {about.paragraphs.map((item, index) => <p className="content-lines" key={index}>{item.text}</p>)}
          <details className="disclosure">
            <summary>{about.disclosureTitle} <span aria-hidden="true">+</span></summary>
            <p className="content-lines">{about.disclosureText}</p>
          </details>
        </div>
      </div>
    </section>
  );
}
