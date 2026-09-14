import { useEffect, useRef } from 'react';
import { Link, Route, Routes, matchPath, useLocation } from 'react-router-dom';
import Navbar from './Components/Navbar';
import Footer from './Components/Footer';
import Homepage from './pages/home';
import Artigos from './pages/artigos';
import Artigo from './pages/artigo';
import Eventos from './pages/eventos';
import Servico from './pages/servico';
import usePageMotion from './hooks/usePageMotion';
import articles from './content/articles/artigos.json';
import './App.css';
import './motion.css';

export default function App() {
  const location = useLocation();
  const appRef = useRef(null);
  const previousPath = useRef(location.pathname);
  useEffect(() => {
    const articleRoute = matchPath('/artigos/:id', location.pathname);
    const article = articleRoute && articles.find((item) => String(item.id) === articleRoute.params.id);
    document.title = articleRoute ? `${article?.title || 'Artigo não encontrado'} | Fábrica de Testadores` : 'Fabrica de Testadores';
    const target = location.hash ? document.getElementById(decodeURIComponent(location.hash.slice(1))) : null;
    if (target) {
      target.scrollIntoView();
      target.focus({ preventScroll: true });
    } else {
      window.scrollTo({ top: 0, behavior: 'instant' });
      if (previousPath.current !== location.pathname) document.getElementById('main-content')?.focus({ preventScroll: true });
    }
    previousPath.current = location.pathname;
  }, [location]);
  usePageMotion(appRef, location.pathname);
  return (
    <div className="app" ref={appRef}>
      <a className="skip-link" href="#main-content" onClick={(event) => { event.preventDefault(); document.getElementById('main-content').focus(); document.getElementById('main-content').scrollIntoView(); }}>Pular para o conteúdo</a>
      <Navbar key={location.pathname} />
      <main id="main-content" tabIndex={-1}>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/artigos" element={<Artigos />} />
          <Route path="/artigos/:id" element={<Artigo />} />
          <Route path="/eventos" element={<Eventos />} />
          <Route path="/servicos" element={<Servico />} />
          <Route path="*" element={<section className="container section not-found"><p className="eyebrow">Erro 404</p><h1>Esta página não foi encontrada.</h1><p>Continue explorando o projeto pela página inicial.</p><Link className="button button-primary" to="/">Voltar ao início</Link></section>} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
