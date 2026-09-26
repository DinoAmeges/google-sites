/**
 * VOLTIX TECHNOLOGY — Enrutador Inteligente para Google Sites y GitHub Pages
 * Lema: Electricidad • Tecnología • Innovación
 * Proyecto Académico • Ingeniería Eléctrica • Curso: 2-AF
 * Estudiante: GARCIA ANDRADE MATIAS EDUARDO
 * 
 * Este módulo gestiona de forma centralizada y limpia los enlaces de navegación,
 * adaptándose automáticamente a dos entornos de ejecución:
 * 
 * 1. ENTORNO A: GitHub Pages / Localhost (Navegación directa estándar entre archivos HTML)
 * 2. ENTORNO B: Google Sites (Página de inserción completa embebida en iframe)
 * 
 * REGLAS DE SEGURIDAD ESTRICTAS APLICADAS:
 * - NO se usa target="_top" (evita bloqueos de seguridad del sandbox de Google Sites).
 * - NO se usa window.top.location ni window.parent.location (previene violaciones de Same-Origin).
 * - NO se abren nuevas pestañas en la navegación interna (mantiene la experiencia integrada).
 * - NO se generan iframes anidados.
 */

// =============================================================================
// 1. URLs DE GITHUB PAGES (Rutas HTML estándar y portables)
// =============================================================================
const GITHUB_PAGES_URLS = {
  inicio: "inicio.html",
  electricidad: "electricidad.html",
  componentes: "componentes.html",
  aplicaciones: "aplicaciones.html",
  energias: "energias.html",
  multimedia: "multimedia.html",
  contacto: "contacto.html"
};

// =============================================================================
// CONFIGURAR URLs DE GOOGLE SITES
// =============================================================================
// Instrucción para el usuario:
// Una vez que tengas publicadas las páginas correspondientes en tu Google Site,
// coloca dentro de las comillas la URL real de cada una de ellas.
// 
// Ejemplo:
//   inicio: "https://sites.google.com/view/voltix-technology/inicio",
//   electricidad: "https://sites.google.com/view/voltix-technology/electricidad",
// 
// NOTA: Si una URL se deja vacía (""), el sistema utilizará automáticamente
// la ruta normal de GitHub Pages como respaldo seguro y funcional.
// =============================================================================
const GOOGLE_SITES_URLS = {
  inicio: "",
  electricidad: "",
  componentes: "",
  aplicaciones: "",
  energias: "",
  multimedia: "",
  contacto: ""
};

/**
 * Detecta de forma segura el entorno de ejecución actual:
 * @returns {boolean} true si está embebido en Google Sites (o cualquier iframe); false si se visualiza directo.
 */
function isRunningInGoogleSites() {
  try {
    return window.self !== window.top;
  } catch (e) {
    // Si el acceso a window.top lanza excepción de Same-Origin (CORS),
    // confirma fehacientemente que la página se encuentra dentro de un iframe externo.
    return true;
  }
}

(function initVoltixNavigation() {
  const inGoogleSites = isRunningInGoogleSites();

  // Indicador de clase contextual en <html> para posibles adaptaciones visuales
  if (inGoogleSites && document.documentElement) {
    document.documentElement.classList.add('in-iframe');
  }

  // Reseteo preventivo del scroll para asegurar que cada página inicie en el tope
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

      // Caso 1: Enlaces de ancla interna en la misma página (#seccion) -> Dejar intactos
      if (trimmedHref.startsWith('#')) return;

      // Caso 2: Protocolos especiales (javascript:, mailto:, tel:) -> Dejar intactos
      if (
        trimmedHref.startsWith('javascript:') ||
        trimmedHref.startsWith('mailto:') ||
        trimmedHref.startsWith('tel:')
      ) {
        return;
      }

      // Caso 3: Enlaces externos que NO forman parte de la navegación de VOLTIX
      if (
        (trimmedHref.startsWith('http://') || trimmedHref.startsWith('https://')) &&
        !trimmedHref.includes('sites.google.com') &&
        !trimmedHref.includes('dinoameges.github.io')
      ) {
        // Enlaces puramente externos (ej. YouTube, documentación externa)
        return;
      }

      // Caso 4: Identificar si el enlace corresponde a una de las páginas de VOLTIX
      const cleanName = trimmedHref
        .split('?')[0]
        .split('#')[0]
        .replace(/^\.\//, '')
        .replace('.html', '')
        .toLowerCase();

      // Mapear 'index' hacia 'inicio' por compatibilidad
      const pageKey = (cleanName === 'index') ? 'inicio' : cleanName;

      if (GITHUB_PAGES_URLS[pageKey] !== undefined) {
        let destinationUrl = GITHUB_PAGES_URLS[pageKey];

        // Si está integrado en Google Sites y el usuario configuró una URL real de Google Sites:
        if (inGoogleSites) {
          const configuredGsUrl = (GOOGLE_SITES_URLS[pageKey] || '').trim();
          if (configuredGsUrl !== '') {
            destinationUrl = configuredGsUrl;
          }
        }

        // Asignar la ruta resultante
        link.setAttribute('href', destinationUrl);

        // Garantizar que NO se utilice target="_top" ni target="_parent"
        // para cumplir estrictamente la regla de seguridad y sandbox de Google Sites
        const currentTarget = link.getAttribute('target');
        if (currentTarget === '_top' || currentTarget === '_parent') {
          link.removeAttribute('target');
        }

        // Listener para garantizar que el scroll empiece desde arriba al navegar
        link.addEventListener('click', (e) => {
          // Si el usuario utiliza teclas modificadoras (Ctrl/Cmd/Shift), respetar atajo del sistema
          if (e.ctrlKey || e.metaKey || e.shiftKey) return;

          try {
            window.scrollTo(0, 0);
          } catch (err) {}
        });
      }
    });

    // Notificación opcional de altura al contenedor padre mediante postMessage
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
