import { useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import pastEvents from '../../content/events/pastEvents.json';
import upcomingEvents from '../../content/events/upcomingEvents.json';
import { ExternalLink, PageIntro } from '../UI';
import './styles.css';

export default function Events() {
  const [params, setParams] = useSearchParams();
  const activeTab = params.get('periodo') === 'passados' ? 'past' : 'upcoming';
  const tabs = useRef({});
  const currentEvents = activeTab === 'upcoming' ? upcomingEvents : pastEvents;
  function selectTab(tab, focus = false) {
    setParams((previous) => { const next = new URLSearchParams(previous); if (tab === 'past') next.set('periodo', 'passados'); else next.delete('periodo'); return next; }, { replace: true });
    if (focus) tabs.current[tab]?.focus();
  }
  function handleKeys(event) {
    if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
    event.preventDefault();
    const next = event.key === 'Home' ? 'upcoming' : event.key === 'End' ? 'past' : activeTab === 'upcoming' ? 'past' : 'upcoming';
    selectTab(next, true);
  }
  return <><PageIntro label="Eventos" title="Aprenda com a comunidade.">Cursos, minicursos e encontros para aproximar você da prática em testes e qualidade de software.</PageIntro><section className="container content-section" aria-label="Agenda de eventos"><div className="events-tabs" role="tablist" aria-label="Período dos eventos" onKeyDown={handleKeys}>{[['upcoming', 'Próximos eventos', upcomingEvents.length], ['past', 'Eventos anteriores', pastEvents.length]].map(([key, label, count]) => <button type="button" key={key} id={`tab-${key}`} role="tab" ref={(node) => { tabs.current[key] = node; }} aria-selected={activeTab === key} aria-controls={`panel-${key}`} tabIndex={activeTab === key ? 0 : -1} onClick={() => selectTab(key)}>{label}<span className="tab-count">{count}</span></button>)}</div><div role="tabpanel" id={`panel-${activeTab}`} aria-labelledby={`tab-${activeTab}`} tabIndex={0} className="event-panel">{currentEvents.length ? <div className="event-list">{currentEvents.map((event) => <article className="event-entry" key={event.id}><div className="event-date"><span className="meta">Quando</span><p>{event.date}</p>{event.time && <span className="meta">{event.time}</span>}</div><div className="event-body">{event.location && <p className="event-location">{event.location}</p>}<h2>{event.title}</h2><p className="event-description">{event.description}</p>{Number.isInteger(event.registrations) && <p className="event-enrollment"><strong>{event.registrations.toLocaleString('pt-BR')}</strong> {event.registrations === 1 ? 'inscrito' : 'inscritos'}</p>}{activeTab === 'upcoming' && (event.link ? <ExternalLink href={event.link} className="button button-primary">Inscrever-se</ExternalLink> : <p className="event-registration">Inscrições em breve. Acompanhe nossos canais.</p>)}</div><span className={`status-badge ${activeTab === 'past' ? '' : 'status-upcoming'}`}>{activeTab === 'past' ? 'Realizado' : 'Programado'}</span></article>)}</div> : <div className="empty-state event-empty"><span className="calendar-symbol" aria-hidden="true"><svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3"><rect x="3" y="5" width="18" height="16" rx="2" /><path d="M3 10h18M7 2v6M17 2v6m-9 7h8" /></svg></span><p className="eyebrow">Novos encontros, em breve</p><h2>Nossa próxima conversa<br />ainda está sendo preparada.</h2><p>Não há eventos agendados no momento. Conheça as atividades anteriores ou acompanhe os conteúdos disponíveis no nosso YouTube.</p><div className="empty-actions"><button type="button" className="button button-primary" onClick={() => selectTab('past', true)}>Ver eventos anteriores</button><ExternalLink href="https://www.youtube.com/@FabricadeTestadores">Explorar o YouTube</ExternalLink></div></div>}</div></section></>;
}
