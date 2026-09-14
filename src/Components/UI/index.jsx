import { Link } from 'react-router-dom';

export function Arrow({ diagonal = false, className = '' }) {
  return <svg className={`arrow ${diagonal ? 'arrow-diagonal ' : ''}${className}`} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{diagonal ? <path d="M6 18 18 6M6 6h12v12" /> : <path d="M4 12h16m-6-6 6 6-6 6" />}</svg>;
}

export function ExternalLink({ children, className = 'text-link', ...props }) {
  return <a {...props} className={className} target="_blank" rel="noopener noreferrer">{children}<Arrow diagonal /><span className="sr-only"> (abre em nova aba)</span></a>;
}

export function PageIntro({ label, title, children }) {
  return <header className="page-intro"><div className="container"><nav className="breadcrumb" aria-label="Caminho da página"><Link to="/">Início</Link><span aria-hidden="true">/</span><span aria-current="page">{label}</span></nav><p className="eyebrow">{label}</p><h1>{title}</h1><p className="page-description">{children}</p></div></header>;
}
