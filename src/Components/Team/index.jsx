import { ExternalLink } from '../UI';
import './styles.css';

const members = [
  { name: 'Ismayle Santos', role: 'Coordenador', photo: '/ismayle.jpg', linkedin: 'https://www.linkedin.com/in/ismayle-de-sousa-santos-8b769620/', lattes: 'http://lattes.cnpq.br/4278565937358466' },
  { name: 'Pedro Henrique', photo: '/pedro.jpeg', linkedin: 'https://www.linkedin.com/in/pedro-henrique-rocha-dos-santos-nonato-a71802227/', lattes: 'http://lattes.cnpq.br/2465649502211452' },
  { name: 'Wallison Aquino', photo: '/wallison.jpg', linkedin: 'https://www.linkedin.com/in/wallison-aquino-5ab2931aaq/', lattes: 'http://lattes.cnpq.br/7204284995879329' },
  { name: 'Paulo Matheus', photo: '/Paulo Matheus.jpeg', linkedin: 'https://www.linkedin.com/in/paulo-matheus-barroso-de-vasconcelos-625509301', lattes: 'https://lattes.cnpq.br/5386022828155481' },
  { name: 'Kayque Mateus', photo: '/Kayque Mateus.jpeg', photoPosition: 'center 58%', linkedin: 'https://www.linkedin.com/in/kayque-mateus-998b9b22a', lattes: 'https://lattes.cnpq.br/6021361563558465' },
  { name: 'José Fortunato', photo: '/José Fortunato.png', linkedin: 'http://linkedin.com/in/jos%C3%A9-fortunato-39948b320/', lattes: 'http://lattes.cnpq.br/1569801029764141' },
  { name: 'Rafael Monteiro', photo: '/rafael monteiro.png', linkedin: 'https://www.linkedin.com/in/rafael-monteiro-de-castro/' },
];

export default function Team() {
  return (
    <section id="team" className="section team" tabIndex={-1} aria-labelledby="team-title">
      <div className="container">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Membros do projeto</p>
            <h2 id="team-title">Pessoas por trás dos testes.</h2>
          </div>
          <p>Uma equipe que aprende, pesquisa e<br className="desktop-only" /> compartilha conhecimento todos os dias.</p>
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
                  <ExternalLink href={member.linkedin} aria-label={`LinkedIn de ${member.name} (abre em nova aba)`}>LinkedIn</ExternalLink>
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
