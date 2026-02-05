import "./Team.css";
import { useEffect, useRef } from "react";

export default function Team() {
  const carouselRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const carousel = carouselRef.current;
    const container = containerRef.current;
    if (!carousel || !container) return;

    let intervalId;

    const startAutoScroll = () => {
      
      let scrollAmount = 0;
      
      const autoScroll = () => {
        const isMobile = window.innerWidth <= 768;
        const currentScrollElement = isMobile ? container : carousel;
        const totalCards = 7;
        
        if (isMobile) {
          const containerWidth = currentScrollElement.offsetWidth;
          const cardWidth = 280; // largura do card no mobile
          const gap = 24; // 1.5rem gap
          
          const currentCardIndex = Math.round(scrollAmount / (cardWidth + gap));
          const nextCardIndex = (currentCardIndex + 1) % totalCards;
          
  
          const cardCenterOffset = (containerWidth - cardWidth) / 2;
          scrollAmount = nextCardIndex * (cardWidth + gap) - cardCenterOffset;
          
          if (scrollAmount < 0) scrollAmount = 0;
          
        } else {  
          const cardWidth = 280;
          scrollAmount += cardWidth;
          
          const maxScroll = (totalCards - 2) * cardWidth;
          if (scrollAmount >= maxScroll) {
            scrollAmount = 0;
          }
        }
        
        currentScrollElement.scrollTo({
          left: scrollAmount,
          behavior: 'smooth'
        });
      };

      intervalId = setInterval(autoScroll, 3000);
    };

    const handleResize = () => {
     
      if (intervalId) {
        clearInterval(intervalId);
      }
    
      setTimeout(startAutoScroll, 100);
    };

    startAutoScroll();

    window.addEventListener('resize', handleResize);

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <section id="team" className="team">
      <div className="team-header">
        <div className="team-container">
          <h1 className="team-title">
            <span className="title-orange">NOSSA</span>{" "}
            <span className="title-dark">EQUIPE</span>
          </h1>

          {/* Coordenador em destaque */}
          <div className="coordinator-card">
            <div className="member-photo coordinator-photo">
              <img src="/ismayle.jpg" alt="Ismayle Santos" />
            </div>
            <div className="member-info">
              <h3 className="member-name">ISMAYLE SANTOS</h3>
              <p className="member-role">COORDENADOR</p>
              <div className="member-social">
                <a href="https://www.linkedin.com/in/ismayle-de-sousa-santos-8b769620/" target="_blank" rel="noopener noreferrer" className="social-link linkedin">
                    <img src="/linkedin-icon.svg" alt="LinkedIn" />
                </a>
                <a href="http://lattes.cnpq.br/4278565937358466" target="_blank" rel="noopener noreferrer" className="social-link lattes">
                    <img src="/Lattes.png" alt="Lattes" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="team-members">
        <div className="team-container">
          <div className="carousel-container" ref={containerRef}>
            <div className="members-grid" ref={carouselRef}>
            {/* Primeira linha */}
       
            <div className="member-card">
              <div className="member-photo">
                <img src="/pedro.jpeg" alt="Pedro" />
              </div>
              <div className="member-info">
                <h3 className="member-name">PEDRO HENRIQUE</h3>
                <div className="member-social">
                  <a href="https://www.linkedin.com/in/pedro-henrique-rocha-dos-santos-nonato-a71802227/" target="_blank" rel="noopener noreferrer" className="social-link linkedin">
                    <img src="/linkedin-icon.svg" alt="LinkedIn" />
                  </a>
                  <a href="http://lattes.cnpq.br/2465649502211452" target="_blank" rel="noopener noreferrer" className="social-link lattes">
                    <img src="/Lattes.png" alt="Lattes" />
                  </a>
                </div>
              </div>
            </div>

             <div className="member-card">
              <div className="member-photo">
                <img src="/wallison.jpg" alt="Wallison" />
              </div>
              <div className="member-info">
                <h3 className="member-name">WALLISON AQUINO</h3>
                <div className="member-social">
                  <a href="https://www.linkedin.com/in/wallison-aquino-5ab2931aaq/" target="_blank" rel="noopener noreferrer" className="social-link linkedin">
                    <img src="/linkedin-icon.svg" alt="LinkedIn" />
                  </a>
                  <a href="http://lattes.cnpq.br/7204284995879329" target="_blank" rel="noopener noreferrer" className="social-link lattes">
                    <img src="/Lattes.png" alt="Lattes" />
                  </a>
                </div>
              </div>
            </div>
          
            <div className="member-card center-card">
              <div className="member-photo">
                <img
                  src="/gabriel.jpg"
                  alt="GABRIEL PINHEIRO"
                />
              </div>
              <div className="member-info">
                <h3 className="member-name">GABRIEL PINHEIRO</h3>
                <div className="member-social">
                  <a href="https://www.linkedin.com/in/gbrl-pnhr/" target="_blank" rel="noopener noreferrer" className="social-link linkedin">
                    <img src="/linkedin-icon.svg" alt="LinkedIn" />
                  </a>
                  <a href="http://lattes.cnpq.br/1708943350538903" target="_blank" rel="noopener noreferrer" className="social-link lattes">
                    <img src="/Lattes.png" alt="Lattes" />
                  </a>
                </div>
              </div>
            </div>

            {/* Segunda linha */}
            <div className="member-card">
              <div className="member-photo">
                <img src="/Paulo Matheus.jpeg" alt="Paulo Matheus" />
              </div>
              <div className="member-info">
                <h3 className="member-name">PAULO MATHEUS</h3>
                <div className="member-social">
                  <a href="https://www.linkedin.com/in/paulo-matheus-barroso-de-vasconcelos-625509301" target="_blank" rel="noopener noreferrer" className="social-link linkedin">
                    <img src="/linkedin-icon.svg" alt="LinkedIn" />
                  </a>
                  <a href="https://lattes.cnpq.br/5386022828155481" target="_blank" rel="noopener noreferrer" className="social-link lattes">
                    <img src="/Lattes.png" alt="Lattes" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </section>
  );
}
