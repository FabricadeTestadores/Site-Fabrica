import { useEffect, useRef, useState } from 'react';
import './styles.css';
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
          <p className="eyebrow">O projeto</p>
          <h2>Conhecimento aberto.<br /><span ref={qualityRef} className={`quality-highlight${blinking ? ' is-blinking' : ''}`} onAnimationEnd={() => setBlinking(false)}>Qualidade</span> compartilhada.</h2>
          <p className="about-ods-label">Objetivo da ODS relacionado</p>
          <a
            className="about-ods"
            href="https://brasil.un.org/pt-br/sdgs/4"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Conheça o ODS 4 no site da ONU (abre em nova aba)"
          >
            <img
              src="/ods-4-educacao-de-qualidade.svg"
              alt="ODS 4 — Educação de qualidade"
              width="120"
              height="120"
              loading="lazy"
              decoding="async"
            />
          </a>
        </div>
        <div className="about-copy">
          <p className="lead">Somos a Fábrica de Testadores, um projeto de extensão da Universidade Estadual do Ceará dedicado à formação em testes, segurança e qualidade de software.</p>
          <p>Reunimos recursos da literatura, desenvolvemos materiais didáticos e oferecemos palestras e minicursos abertos à comunidade. Aproximamos estudantes e profissionais dos desafios reais da área.</p>
          <p>Com verificação e validação de software, buscamos melhorar a confiabilidade, o desempenho e a experiência de quem usa os sistemas, reduzindo riscos e custos.</p>
          <details className="disclosure">
            <summary>Nosso compromisso com a educação <span aria-hidden="true">+</span></summary>
            <p>Alinhado aos Objetivos de Desenvolvimento Sustentável da ONU, especialmente às metas 4.3 e 4.4, o projeto promove a igualdade de acesso à educação técnica, profissional e superior de qualidade, a preços acessíveis. Também busca ampliar as competências de jovens e adultos para o emprego, o trabalho decente e o empreendedorismo até 2030.</p>
          </details>
        </div>
      </div>
    </section>
  );
}
