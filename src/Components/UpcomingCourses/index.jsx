import { Link } from 'react-router-dom';
import upcomingEvents from '../../content/events/upcomingEvents.json';
import { Arrow, ExternalLink } from '../UI';
import './styles.css';

function CourseIcon({ type }) {
  return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    {type === 'calendar' ? <><rect x="3" y="5" width="18" height="16" rx="2" /><path d="M3 10h18M7 3v4m10-4v4M7 14h3m4 0h3m-10 3h3" /></> : type === 'clock' ? <><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></> : <><path d="M19 10c0 5-7 11-7 11S5 15 5 10a7 7 0 1 1 14 0Z" /><circle cx="12" cy="10" r="2" /></>}
  </svg>;
}

export default function UpcomingCourses() {
  const nextEvents = upcomingEvents.slice(0, 2);

  return (
    <section id="proximos-cursos" className="section courses-preview" tabIndex={-1} aria-labelledby="courses-heading">
      <div className="container">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Nossa agenda</p>
            <h2 id="courses-heading">Seu próximo passo começa aqui.</h2>
            <p className="courses-intro">Conheça os próximos cursos da Fábrica de Testadores.</p>
          </div>
          <Link className="text-link" to="/eventos">Ver programação completa <Arrow /></Link>
        </div>
        {nextEvents.length ? <div className="courses-grid">
          {nextEvents.map((event, index) => {
            const [summary, registrationPeriod] = event.description.split('\n\n');
            return (
              <article className="course-card" key={event.id} aria-labelledby={`course-title-${event.id}`}>
                <div className="course-card-top">
                  <span className="course-label">Curso · {String(index + 1).padStart(2, '0')}</span>
                  {event.link && <span className="course-registration-status">Inscrições abertas</span>}
                </div>
                <h3 id={`course-title-${event.id}`}>{event.title}</h3>
                <p className="course-summary">{summary}</p>
                <dl className="course-details">
                  <div className="course-dates">
                    <dt><CourseIcon type="calendar" /> Encontros</dt>
                    <dd>{event.date}</dd>
                  </div>
                  {event.time && <div>
                    <dt><CourseIcon type="clock" /> Horário</dt>
                    <dd>{event.time}</dd>
                  </div>}
                  {event.location && <div>
                    <dt><CourseIcon type="location" /> Local</dt>
                    <dd>{event.location}</dd>
                  </div>}
                </dl>
                <div className="course-card-footer">
                  {registrationPeriod && <p className="course-registration-period">{registrationPeriod}</p>}
                  {event.link ? <ExternalLink className="button button-primary course-enroll" href={event.link}>Inscrever-se<span className="sr-only"> em {event.title}</span></ExternalLink> : <p className="course-registration-period">Inscrições em breve. Acompanhe nossos canais.</p>}
                </div>
              </article>
            );
          })}
        </div> : <div className="empty-state courses-empty">
          <h3>Espaço para o próximo encontro.</h3>
          <p>Não há eventos agendados no momento. Conheça os encontros que já realizamos.</p>
          <Link className="text-link" to="/eventos?periodo=passados">Conhecer eventos anteriores <Arrow /></Link>
        </div>}
      </div>
    </section>
  );
}
