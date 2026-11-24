window.CMS_MANUAL_INIT = true;

async function startCMS() {
  const status = document.getElementById('cms-status');
  const message = document.getElementById('cms-message');
  const help = document.getElementById('cms-help');
  try {
    const response = await fetch('./config.yml', { cache: 'no-store' });
    if (!response.ok) throw new Error('Não foi possível carregar a configuração do painel.');
    const config = await response.json();
    const local = ['localhost', '127.0.0.1', '[::1]'].includes(window.location.hostname)
      && new URLSearchParams(window.location.search).get('local') === 'true';
    if (!local && !config.backend.base_url) {
      message.textContent = 'O painel está instalado. O responsável pelo site precisa concluir a configuração do login para liberar a edição.';
      help.hidden = false;
      return;
    }
    // The unauthenticated local proxy is only enabled explicitly on loopback hosts.
    config.local_backend = local ? { url: 'http://localhost:8081/api/v1' } : false;
    if (local) delete config.backend.base_url;
    config.load_config_file = false;
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/decap-cms@3.18.0/dist/decap-cms.js';
    await new Promise((resolve, reject) => {
      script.onload = resolve;
      script.onerror = () => reject(new Error('Não foi possível carregar o editor. Verifique sua conexão e tente novamente.'));
      document.head.append(script);
    });
    window.CMS.init({ config });
    status.hidden = true;
  } catch (error) {
    message.textContent = error.message;
    help.hidden = false;
  }
}

startCMS();
