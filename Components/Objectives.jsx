import "./Objectives.css";

export default function Objectives() {
  return (
    <section id="objectives" className="objectives">
      <div className="objectives-container">
        <h1 className="objectives-title">
          <span className="title-orange">NOSSOS </span>
          <span className="title-white">OBJETIVOS</span>
        </h1>

        <div className="objectives-list">
          <div className="objective-item">
            <span className="objective-number">01.</span>
            <p className="objective-textOne">
               Promover a formação de recursos humanos.
            </p>
          </div>

          <div className="objective-item">
            <span className="objective-number">02.</span>
            <p className="objective-text">
              Disseminar conhecimento teórico e prático sobre qualidade e
              segurança de software.
            </p>
          </div>

          <div className="objective-item">
            <span className="objective-number">03.</span>
            <p className="objective-text">
              Publicar artigos científicos e fomentar a integração da
              universidade com parceiros externos da UECE.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
