/**
 * VOLTIX TECHNOLOGY — Enrutador Inteligente para Google Sites
 * 
 * Este archivo gestiona la compatibilidad entre:
 * 1. Ejecución local / GitHub Pages (rutas relativas entre archivos .html)
 * 2. Inserción dentro de Google Sites (páginas oficiales https://sites.google.com/view/...)
 * 
 * CONFIGURACIÓN RÁPIDA:
 * Si creaste páginas en Google Sites, pega la dirección de cada una abajo.
 * Si dejas las rutas por defecto ("inicio.html", etc.), funcionarán
 * automáticamente al alojar la carpeta en GitHub Pages, Vercel, Netlify o cualquier servidor.
 */

const GOOGLE_SITES_URLS = {
  inicio: "inicio.html",
  electricidad: "electricidad.html",
  componentes: "componentes.html",
  aplicaciones: "aplicaciones.html",
  energias: "energias.html",
  multimedia: "multimedia.html",
  contacto: "contacto.html"
};

(function initGoogleSitesIntegration() {
  document.addEventListener('DOMContentLoaded', () => {
    const isIframe = window.self !== window.top;
    
    if (isIframe) {
      document.body.classList.add('in-google-sites');
    }

    // Actualizar enlaces para abrir en el marco superior (_top) y aplicar URLs de Google Sites si están configuradas
    const allLinks = document.querySelectorAll('a[href]');
    allLinks.forEach(link => {
      const href = link.getAttribute('href');
      if (!href || href.startsWith('#') || href.startsWith('javascript:')) return;

      const pageKey = href.replace('.html', '').replace('./', '').trim().toLowerCase();
      
      // Si el usuario configuró una URL real de Google Sites (ej. https://sites.google.com/...)
      if (GOOGLE_SITES_URLS[pageKey] && GOOGLE_SITES_URLS[pageKey] !== href) {
        link.setAttribute('href', GOOGLE_SITES_URLS[pageKey]);
      }

      // Si está dentro del iframe de Google Sites, forzar target="_top" para evitar
      // que una página de Google Sites se abra encajonada dentro de otro iframe
      if (isIframe && !link.hasAttribute('target')) {
        link.setAttribute('target', '_top');
      }
    });

    // Notificar altura dinámica al contenedor si la plataforma lo soporta
    if (isIframe) {
      const reportHeight = () => {
        const height = document.documentElement.scrollHeight || document.body.scrollHeight;
        window.parent.postMessage({ type: 'voltix-resize', height: height }, '*');
      };
      window.addEventListener('load', reportHeight);
      window.addEventListener('resize', reportHeight);
    }
  });
})();
