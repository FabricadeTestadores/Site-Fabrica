import { ExternalLink } from '../UI';
import team from '../../content/team.json';
import './styles.css';

const members = team.members;

export default function Team() {
  return (
    <section id="team" className="section team" tabIndex={-1} aria-labelledby="team-title">
      <div className="container">
        <div className="section-heading">
          <div>
            <p className="eyebrow">{team.eyebrow}</p>
            <h2 id="team-title">{team.title}</h2>
          </div>
          <p className="content-lines">{team.description}</p>
        </div>
        <div className="team-grid">
          {members.map((member) => (
            <article className="team-member" key={member.name}>
              <div className="member-photo">
                <img src={member.photo} alt={member.name} width="400" height="400" loading="lazy" style={{ objectPosition: member.photoPosition }} />
                {member.role && <span className="member-badge">{member.role}</span>}
              </div>
              <div className="member-info">
                <h3>{member.name}</h3>
                <p>{member.role || 'Integrante do projeto'}</p>
                <div className="member-links">
                  {member.linkedin && <ExternalLink href={member.linkedin} aria-label={`LinkedIn de ${member.name} (abre em nova aba)`}>LinkedIn</ExternalLink>}
                  {member.lattes && <ExternalLink href={member.lattes} aria-label={`Currículo Lattes de ${member.name} (abre em nova aba)`}>Lattes</ExternalLink>}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
