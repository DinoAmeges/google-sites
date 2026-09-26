/**
 * VOLTIX TECHNOLOGY — Enrutador Central de Navegación
 * Lema: Electricidad • Tecnología • Innovación
 * Proyecto Académico: Computación II • Ingeniería Eléctrica • Curso: 2-AF
 * Estudiante: GARCIA ANDRADE MATIAS EDUARDO
 * Docente: VICTOR JAVIER QUIÑONEZ QUIÑONEZ
 * Año: 2026
 * 
 * =============================================================================
 * 1. CONFIGURACIÓN CENTRALIZADA DE RUTAS DEL PROYECTO
 * =============================================================================
 * Este objeto centraliza todas las rutas oficiales de VOLTIX TECHNOLOGY
 * tanto para visualización directa en GitHub Pages como para la arquitectura
 * incrustada en Google Sites.
 */
const VOLTIX_ROUTER = {
  // Dominio base de GitHub Pages
  githubPagesBase: "https://dinoameges.github.io/google-sites/",

  // Las 7 páginas oficiales del proyecto
  pages: {
    inicio: {
      file: "inicio.html",
      name: "Inicio",
      githubUrl: "https://dinoameges.github.io/google-sites/inicio.html"
    },
    electricidad: {
      file: "electricidad.html",
      name: "Electricidad",
      githubUrl: "https://dinoameges.github.io/google-sites/electricidad.html"
    },
    componentes: {
      file: "componentes.html",
      name: "Componentes",
      githubUrl: "https://dinoameges.github.io/google-sites/componentes.html"
    },
    aplicaciones: {
      file: "aplicaciones.html",
      name: "Aplicaciones",
      githubUrl: "https://dinoameges.github.io/google-sites/aplicaciones.html"
    },
    energias: {
      file: "energias.html",
      name: "Energías",
      githubUrl: "https://dinoameges.github.io/google-sites/energias.html"
    },
    multimedia: {
      file: "multimedia.html",
      name: "Multimedia",
      githubUrl: "https://dinoameges.github.io/google-sites/multimedia.html"
    },
    contacto: {
      file: "contacto.html",
      name: "Contacto",
      githubUrl: "https://dinoameges.github.io/google-sites/contacto.html"
    }
  }
};

/**
 * =============================================================================
 * 2. DETECCIÓN DE ENTORNO DE EJECUCIÓN
 * =============================================================================
 * Determina si la página se ejecuta de forma directa (GitHub Pages / Localhost)
 * o si está incrustada dentro de un iframe (Google Sites).
 * 
 * @returns {boolean} true si está dentro de un iframe (Google Sites), false si es directo.
 */
function isRunningInsideGoogleSites() {
  try {
    return window.self !== window.top;
  } catch (e) {
    // Si la lectura de window.top genera excepción de Same-Origin (CORS),
    // confirma que estamos dentro de un iframe sandboxed de otro dominio.
    return true;
  }
}

/**
 * =============================================================================
 * 3. IDENTIFICADOR DE PÁGINA ACTUAL
 * =============================================================================
 */
function getCurrentPageKey() {
  const rawPath = window.location.pathname.split('/').pop() || 'inicio.html';
  const cleanPath = rawPath.split('?')[0].split('#')[0].toLowerCase();
  
  if (cleanPath === '' || cleanPath === 'index.html' || cleanPath === 'inicio.html') {
    return 'inicio';
  }
  return cleanPath.replace('.html', '');
}

/**
 * =============================================================================
 * 4. NOTIFICACIÓN VISUAL ELEGANTE PARA GOOGLE SITES
 * =============================================================================
 * Muestra un aviso discreto y premium al usuario cuando intenta usar el navbar
 * interno dentro de Google Sites, guiándolo hacia el menú principal de Google Sites.
 */
function showGoogleSitesNavNotice(targetPageName) {
  let notice = document.getElementById('voltixGsNavNotice');
  if (!notice) {
    notice = document.createElement('div');
    notice.id = 'voltixGsNavNotice';
    notice.setAttribute('role', 'status');
    notice.setAttribute('aria-live', 'polite');
    notice.style.cssText = `
      position: fixed;
      top: 18px;
      left: 50%;
      transform: translateX(-50%) translateY(-20px);
      background: rgba(14, 21, 36, 0.96);
      backdrop-filter: blur(14px);
      -webkit-backdrop-filter: blur(14px);
      border: 1px solid rgba(0, 212, 255, 0.4);
      border-radius: 8px;
      padding: 10px 18px;
      color: #f1f5f9;
      font-family: 'Inter', -apple-system, sans-serif;
      font-size: 0.86rem;
      font-weight: 500;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.6), 0 0 15px rgba(0, 212, 255, 0.25);
      z-index: 999999;
      pointer-events: none;
      opacity: 0;
      transition: opacity 0.3s ease, transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
      display: flex;
      align-items: center;
      gap: 10px;
      max-width: 90vw;
      text-align: center;
    `;
    document.body.appendChild(notice);
  }

  notice.innerHTML = `
    <span style="color: #ff9500; font-size: 1.15rem; filter: drop-shadow(0 0 6px #ff9500); line-height: 1;">⚡</span>
    <span>Para cambiar a <strong style="color: #00d4ff;">${targetPageName}</strong>, utiliza el menú principal en la parte superior de Google Sites.</span>
  `;

  // Animar entrada
  requestAnimationFrame(() => {
    notice.style.opacity = '1';
    notice.style.transform = 'translateX(-50%) translateY(0)';
  });

  if (notice._timer) clearTimeout(notice._timer);

  notice._timer = setTimeout(() => {
    notice.style.opacity = '0';
    notice.style.transform = 'translateX(-50%) translateY(-15px)';
  }, 3600);
}

/**
 * =============================================================================
 * 5. CONTROLADOR PRINCIPAL DE NAVEGACIÓN
 * =============================================================================
 */
(function initVoltixNavigationController() {
  const inGoogleSites = isRunningInsideGoogleSites();
  const currentPageKey = getCurrentPageKey();

  // Clase contextual en el elemento raíz
  if (inGoogleSites && document.documentElement) {
    document.documentElement.classList.add('in-iframe', 'in-google-sites');
  }

  // Reseteo preventivo del scroll hacia arriba
  try {
    window.scrollTo(0, 0);
    if (document.documentElement) document.documentElement.scrollTop = 0;
    if (document.body) document.body.scrollTop = 0;
  } catch (e) {}

  document.addEventListener('DOMContentLoaded', () => {
    if (inGoogleSites && document.body) {
      document.body.classList.add('in-iframe', 'in-google-sites');
    }

    const allLinks = document.querySelectorAll('a[href]');

    allLinks.forEach(link => {
      const rawHref = link.getAttribute('href');
      if (!rawHref) return;

      const trimmedHref = rawHref.trim();

      // 1. Enlaces de ancla interna en la misma página (#seccion) -> Preservar para scroll suave
      if (trimmedHref.startsWith('#')) return;

      // 2. Protocolos especiales (javascript:, mailto:, tel:) -> Preservar
      if (
        trimmedHref.startsWith('javascript:') ||
        trimmedHref.startsWith('mailto:') ||
        trimmedHref.startsWith('tel:')
      ) {
        return;
      }

      // 3. Enlaces externos que no corresponden a páginas de VOLTIX -> Preservar
      if (
        (trimmedHref.startsWith('http://') || trimmedHref.startsWith('https://')) &&
        !trimmedHref.includes('dinoameges.github.io')
      ) {
        return;
      }

      // 4. Identificar la página destino del proyecto VOLTIX
      const cleanName = trimmedHref
        .split('?')[0]
        .split('#')[0]
        .replace(/^\.\//, '')
        .replace('.html', '')
        .toLowerCase();

      const targetKey = (cleanName === 'index') ? 'inicio' : cleanName;

      // Si es una de las 7 páginas oficiales:
      if (VOLTIX_ROUTER.pages[targetKey]) {
        const pageConfig = VOLTIX_ROUTER.pages[targetKey];

        // Normalizar siempre el href al archivo HTML relativo portable
        link.setAttribute('href', pageConfig.file);

        // Remover target="_top" o target="_parent" para respetar la sandbox
        const currentTarget = link.getAttribute('target');
        if (currentTarget === '_top' || currentTarget === '_parent') {
          link.removeAttribute('target');
        }

        // =====================================================================
        // NAVEGACIÓN FLUIDA UNIVERSAL (GITHUB PAGES Y GOOGLE SITES)
        // =====================================================================
        link.addEventListener('click', (e) => {
          if (e.ctrlKey || e.metaKey || e.shiftKey) return;
          try {
            window.scrollTo(0, 0);
            if (document.documentElement) document.documentElement.scrollTop = 0;
            if (document.body) document.body.scrollTop = 0;
          } catch (err) {}
        });
      }
    });

    // Notificación de altura al contenedor padre si aplica
    if (inGoogleSites) {
      const sendResize = () => {
        try {
          const height = Math.max(
            document.body.scrollHeight,
            document.documentElement.scrollHeight,
            document.body.offsetHeight,
            document.documentElement.offsetHeight
          );
          window.parent.postMessage({ type: 'voltix-resize', height: height }, '*');
        } catch (err) {}
      };

      window.addEventListener('load', sendResize);
      window.addEventListener('resize', sendResize);
    }
  });
})();
