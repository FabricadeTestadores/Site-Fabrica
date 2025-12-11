import "./Header.css";

export default function Header() {
  return (
    <header id="home" className="header">
      
      <img src="/Site-Fabrica/Background.jpg" alt="Background" className="header-bg" />
      <div className="header-overlay"></div>

      
      <div className="header-container">
        
      
        <div className="institution-logos-container">
          <div className="institution-logos">
            <a href="https://www.uece.br/" target="_blank" rel="noopener noreferrer">
              <img src="/Site-Fabrica/logo_uece.png" alt="UECE" className="inst-logo" />
            </a>
            <a href="https://gesaduece.com.br/pt" target="_blank" rel="noopener noreferrer">
              <img src="/Site-Fabrica/logo_gesad.png" alt="GESAD" className="inst-logo" />
            </a>
          </div>
        </div>

        
        <div className="hero-section">
          <div className="logo-section">
            <img src="/Site-Fabrica/logo_fabrica-removebg-preview.png" alt="Fábrica de Testadores" className="main-logo" />
          </div>
          
          <div className="text-section">
            <h1 className="hero-title">FÁBRICA DE TESTADORES</h1>
            <p className="hero-subtitle">Projeto de Extensão Universitária</p>
            <p className="hero-description">
              Formando profissionais especializados em teste de software
            </p>
          </div>
        </div>

      </div>
    </header>
  );
}
