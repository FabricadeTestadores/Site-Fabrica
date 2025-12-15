import "./styles.css";
import postcardIcon from "/postcard-icon.svg";
import locatorIcon from "/locator-icon.svg";
import githubIcon from "/github-icon.svg";
import linkedinIcon from "/linkedin-icon.svg";
import youtubeIcon from "/youtube-icon.svg";
import instagramIcon from "/instagram-icon.svg";
import gitbookIcon from "/gitbook-icon.svg";

export default function Footer() {
  return (
    <footer className="footer" id="contact">
      <div className="footer-main">
        <div className="footer-container">


          <div className="footer-grid">

            <div className="footer-column">
              <h3 className="column-title">CONTATOS</h3>
              <div className="contact-list">
                <div className="contact-item">
                  <div className="contact-icon">
                    <img src={postcardIcon} alt="Ícone de email" />
                  </div>
                  <a href="mailto:fabrica.testadores@uece.br" className="contact-link">
                    fabrica.testadores@uece.br
                  </a>
                </div>

                <div className="contact-item">
                  <div className="contact-icon">
                    <img src={locatorIcon} alt="Ícone de localização" />
                  </div>
                  <div className="contact-text">
                    <p>Av. Dr. Silas Munguba, 1700<br />
                      Itaperi, Fortaleza - CE<br />
                      CEP: 60714-903</p>
                  </div>
                </div>


              </div>
            </div>

            <div className="footer-column">
              <h3 className="column-title">PARCERIAS</h3>
              <div className="partners-list">
                <div className="partner-item">
                  <a href="https://www.great.ufc.br/" target="_blank" rel="noopener noreferrer">
                    <img src="/great.png" alt="GREat" className="partner-logo" />
                  </a>
                </div>
                <div className="partner-item">
                  <a href="http://rsi.dc.ufc.br/" target="_blank" rel="noopener noreferrer">
                    <img src="/Residencia.png" alt="Residência em Segurança da Informação" className="partner-logo" />
                  </a>
                </div>
                <div className="partner-item">
                  <a href="https://www.uece.br/proplan/detic/" target="_blank" rel="noopener noreferrer">
                    <img src="/detic.png" alt="DETIC" className="partner-logo" />
                  </a>
                </div>
                <div className="partner-item">
                  <a href="https://www.uece.br/proex/" target="_blank" rel="noopener noreferrer">
                    <img src="/PROEX.png" alt="PROEX" className="partner-logo" />
                  </a>
                </div>
              </div>
            </div>

            <div className="footer-column">
              <h3 className="column-title">REDES SOCIAIS</h3>
              <div className="contact-list">
                <div className="contact-item">
                  <div className="contact-icon">
                    <img src={githubIcon} alt="Ícone do GitHub" />
                  </div>
                  <a href="https://github.com/FabricadeTestadores" target="_blank" rel="noopener noreferrer" className="contact-link">
                    GitHub
                  </a>
                </div>

                <div className="contact-item">
                  <div className="contact-icon">
                    <img src={gitbookIcon} alt="Ícone do GitBook" />
                  </div>
                  <a href="https://fabrica-de-testadores-1.gitbook.io/fabrica-de-testadores" target="_blank" rel="noopener noreferrer" className="contact-link">
                    GitBook
                  </a>
                </div>

                <div className="contact-item">
                  <div className="contact-icon">
                    <img src={linkedinIcon} alt="Ícone do LinkedIn" />
                  </div>
                  <a href="https://www.linkedin.com/in/f%C3%A1brica-de-testadores-06b161381/?originalSubdomain=br" target="_blank" rel="noopener noreferrer" className="contact-link">
                    LinkedIn
                  </a>
                </div>

                <div className="contact-item">
                  <div className="contact-icon youtube-icon" aria-hidden="true">
                    <img src={youtubeIcon} alt="Ícone do YouTube" />
                  </div>
                  <a href="https://www.youtube.com/@FabricadeTestadores" target="_blank" rel="noopener noreferrer" className="contact-link">
                    YouTube
                  </a>
                </div>

                <div className="contact-item">
                  <div className="contact-icon instagram-icon">
                    <img src={instagramIcon} alt="Ícone do Instagram" />
                  </div>
                  <a href="https://www.instagram.com/gesad.uece/" target="_blank" rel="noopener noreferrer" className="contact-link">
                    Instagram - GESAD
                  </a>
                </div>

              </div>
            </div>

          </div>
        </div>
      </div>


      <div className="footer-bottom">
        <div className="footer-container">
          <div className="copyright-content">
            <p>&copy; 2025 Fábrica de Testadores - UECE. Todos os direitos reservados.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
