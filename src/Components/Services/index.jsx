import servicesData from '../../content/services/servicos.json';
import { Arrow, PageIntro } from '../UI';
import site from '../../content/site.json';
import pages from '../../content/pages.json';
import './styles.css';
const services = servicesData.services;
export default function Services() {
  return <><PageIntro label="Serviços" title={pages.services.title}>{pages.services.description}</PageIntro><section className="container content-section" aria-label="Serviços executados"><div className="results-toolbar"><p className="eyebrow services-label">Experiência na prática</p><p className="results-count">{services.length} serviços realizados</p></div><div className="services-list">{services.map((service, index) => <article className="service-entry" key={service.title}><span className="service-number">0{index + 1}</span><div className="service-name"><p className="meta">{service.date}</p><h2>{service.title}</h2><span className="status-badge">Concluído</span></div><p className="service-description">{service.description}</p></article>)}</div><aside className="service-contact"><div><h2>{pages.services.contactTitle}</h2><p>{pages.services.contactText}</p></div><a className="text-link" href={`mailto:${site.email}`}>{pages.services.contactLabel} <Arrow diagonal /></a></aside></section></>;
}
