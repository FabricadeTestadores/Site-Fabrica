import { useRef, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Arrow } from '../UI';
import site from '../../content/site.json';
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
        <Link className="brand" to="/" aria-label={`${site.title} — início`} onClick={() => { setOpen(false); window.scrollTo({ top: 0, behavior: 'instant' }); }}>
          <img src={site.logo} alt="" width="48" height="48" />
          <span>{site.brandLine1}<br /><strong>{site.brandLine2}<span className="brand-dot">.</span></strong></span>
        </Link>
        <button className="menu-toggle" type="button" ref={trigger} aria-expanded={open} aria-controls="primary-navigation" onClick={() => setOpen(!open)}>
          {open ? 'Fechar' : 'Menu'}<span className={`menu-icon ${open ? 'is-open' : ''}`} aria-hidden="true"><span /><span /></span>
        </button>
        <nav id="primary-navigation" className={`primary-navigation ${open ? 'is-open' : ''}`} aria-label="Navegação principal">
          {site.navigation.map((item) => item.to.includes('#')
            ? <Link key={item.to} to={item.to} onClick={() => setOpen(false)}>{item.label}</Link>
            : <NavLink key={item.to} to={item.to} end={item.to === '/'} onClick={() => setOpen(false)}>{item.label}</NavLink>)}
          <a className="nav-contact" href={`mailto:${site.email}`} onClick={() => setOpen(false)}>{site.contactAction} <Arrow diagonal /></a>
        </nav>
      </div>
    </header>
  );
}
