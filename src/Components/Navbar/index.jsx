import { useRef, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Arrow } from '../UI';
import './styles.css';

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const trigger = useRef(null);
  function closeOnEscape(event) {
    if (event.key === 'Escape' && open) { setOpen(false); trigger.current?.focus(); }
  }
  return (
    <header className="site-header" onKeyDown={closeOnEscape} onBlur={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) setOpen(false); }}>
      <div className="container navbar-container">
        <Link className="brand" to="/" aria-label="Fábrica de Testadores — início" onClick={() => { setOpen(false); window.scrollTo({ top: 0, behavior: 'instant' }); }}>
          <img src="/logo_fabrica-removebg-preview.png" alt="" width="48" height="48" />
          <span>Fábrica de<br /><strong>Testadores<span className="brand-dot">.</span></strong></span>
        </Link>
        <button className="menu-toggle" type="button" ref={trigger} aria-expanded={open} aria-controls="primary-navigation" onClick={() => setOpen(!open)}>
          {open ? 'Fechar' : 'Menu'}<span className={`menu-icon ${open ? 'is-open' : ''}`} aria-hidden="true"><span /><span /></span>
        </button>
        <nav id="primary-navigation" className={`primary-navigation ${open ? 'is-open' : ''}`} aria-label="Navegação principal">
          <NavLink to="/" end onClick={() => setOpen(false)}>Início</NavLink>
          <NavLink to="/eventos" onClick={() => setOpen(false)}>Eventos</NavLink>
          <NavLink to="/artigos" onClick={() => setOpen(false)}>Artigos</NavLink>
          <NavLink to="/servicos" onClick={() => setOpen(false)}>Serviços</NavLink>
          <Link to="/#team" onClick={() => setOpen(false)}>Membros</Link>
          <a className="nav-contact" href="mailto:fabrica.testadores@uece.br" onClick={() => setOpen(false)}>Fale com a gente <Arrow diagonal /></a>
        </nav>
      </div>
    </header>
  );
}
