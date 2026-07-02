import { useState } from 'react'
import pastEvents from '../../content/events/pastEvents.json'
import upcomingEvents from '../../content/events/upcomingEvents.json'
import './styles.css'

const Events = () => {
  const [activeTab, setActiveTab] = useState('upcoming')

  const currentEvents = activeTab === 'upcoming' ? upcomingEvents : pastEvents

  return (
    <div className="events-container">
      <div className="events-header">
        <h2>Eventos</h2>
      </div>
      <div className="events-tabs">
        <button
          className={`tab-button ${activeTab === 'upcoming' ? 'active' : ''}`}
          onClick={() => setActiveTab('upcoming')}
        >
          Próximos Eventos
        </button>
        <button
          className={`tab-button ${activeTab === 'past' ? 'active' : ''}`}
          onClick={() => setActiveTab('past')}
        >
          Eventos Passados
        </button>
      </div>

      <div className="events-grid">
        {currentEvents.length === 0 ? (
          <p className="events-empty">Nenhum evento disponível no momento.</p>
        ) : (
          currentEvents.map((event) => (
            <div key={event.id} className="event-card">
              <h3>{event.title}</h3>
              <div className="event-info">
                <p className="event-date"><i className="far fa-calendar"></i> {event.date}</p>
                <p className="event-time"><i className="far fa-clock"></i> {event.time}</p>
                <p className="event-location"><i className="fas fa-map-marker-alt"></i> {event.location}</p>
              </div>
              <p className="event-description">{event.description}</p>
              {/* BOTAO PARA INSCRICAO */}
              {activeTab === 'upcoming' && (
                <a href={event.link} className="event-button">Inscrever-se</a>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default Events