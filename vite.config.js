import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

function serveAdminIndex(server) {
  server.middlewares.use((request, response, next) => {
    const url = new URL(request.url, 'http://localhost');
    if (url.pathname === '/admin' || url.pathname === '/admin/') {
      response.writeHead(302, { Location: `/admin/index.html${url.search}` });
      response.end();
      return;
    }
    next();
  });
}

export default defineConfig({
  plugins: [react(), {
    name: 'cms-admin-index',
    configureServer: serveAdminIndex,
    configurePreviewServer: serveAdminIndex,
  }],
  base: '/',
})
