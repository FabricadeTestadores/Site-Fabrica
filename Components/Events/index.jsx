import React, { useState } from 'react'
import './Events.css'

const Events = () => {
  const [activeTab, setActiveTab] = useState('upcoming')

  const upcomingEvents = [
    {
      id: 1,
      title: "CTFL 2.0",
      date: "2026",
      description: "Curso de capacitação em testes de software para certificação CTFL.",
      location: "Youtube / Fabrica de testadores",
    },
  ]

  const pastEvents = [
    {
      id: 2,
      title: "Introdução a Teste de Segurança",
      date: "2025",
      description: "Minicurso apresentando uma introdução aos testes de segurança e a aplicação de CTF (Capture The Flag).",
      location: "LABCOMP - UECE",
    },
    {
      id: 3,
      title: "CTFL",
      date: "2025",
      description: "Curso de capacitação em testes de software para certificação CTFL.",
      location: "Youtube - Fabrica de Testadores",
    },
    {
      id: 4,
      title: "Testes Exploratórios",
      date: "2024",
      description: "Apresentação dos conceitos e práticas de testes exploratórios em software.",
      location: "LABCOMP - UECE",
    },
    {
      id: 5,
      title: "Testes Manuais",
      date: "2024",
      description: "Curso introdutório sobre conceitos e técnicas de testes manuais em software.",
      location: "LABCOMP - UECE",
    }, 
    {
      id: 6,
      title: "Testes Unitários e Testes de API",
      date: "2024",
      description: "Curso introdutório sobre testes unitários e testes de API.",
      location: "LABCOMP - UECE",

    },
  ]

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
        {currentEvents.map((event) => (
          <div key={event.id} className="event-card">
            <h3>{event.title}</h3>
            <div className="event-info">
              <p className="event-date"><i className="far fa-calendar"></i> {event.date}</p>
              <p className="event-time"><i className="far fa-clock"></i> {event.time}</p>
              <p className="event-location"><i className="fas fa-map-marker-alt"></i> {event.location}</p>
            </div>
            <p className="event-description">{event.description}</p>
            {/* BOTAO PARA INSCRICAO */}
            {/* {activeTab === 'upcoming' && (
              <button className="event-button">Inscrever-se</button>
            )} */}
          </div>
        ))}
      </div>
    </div>
  )
}

export default Events