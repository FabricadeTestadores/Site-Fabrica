import './styles.css'
import services from '../../content/services/servicos.json';

const Services = () => {

  return (
    <section className="services-container">
      <div className="services-header">
        <h2>Serviços Executados</h2>
      </div>

      <div className="services-grid">
        {services.map((s) => (
          <article key={s.id} className="service-card">
            <div className="service-top">
              <div className="service-icon" aria-hidden>
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="3" y="3" width="18" height="18" rx="3" stroke="currentColor" strokeWidth="1.2" />
                  <path d="M8 12h8" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                </svg>
              </div>
              <div>
                <h3 className="service-title">{s.title}</h3>
                <span className="service-date">{s.date}</span>
              </div>
            </div>

            <p className="service-description">{s.description}</p>

            <div className="service-status">Concluído</div>
          </article>
        ))}
      </div>
    </section>
  )
}

export default Services
