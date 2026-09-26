/**
 * VOLTIX TECHNOLOGY — Enrutador de Navegación Universal
 * Proyecto Académico: Ingeniería Eléctrica • Curso: 2-AF
 * 
 * Compatibilidad garantizada:
 * 1. Escenario A: Visualización directa en GitHub Pages (ej. https://dinoameges.github.io/google-sites/inicio.html)
 * 2. Escenario B: Inserción como "Página completa" en Google Sites (Iframe sandboxed)
 * 3. Escenario C: Entorno local de desarrollo (localhost / file://)
 * 
 * ANÁLISIS DE LA RESTRICCIÓN DE GOOGLE SITES:
 * Google Sites incrusta páginas externas dentro de un iframe con el atributo:
 * sandbox="allow-scripts allow-forms allow-same-origin allow-popups allow-popups-to-escape-sandbox"
 * 
 * Al NO incluir "allow-top-navigation", cualquier enlace con target="_top" es bloqueado
 * automáticamente por las políticas de seguridad del navegador (DOMException).
 * La navegación correcta y estable dentro de Google Sites debe operar en el marco actual
 * (navegación relativa sin forzar _top), permitiendo recorrer fluidamente todo el sitio
 * sin abrir pestañas innecesarias, sin crear iframes anidados y sin congelar la barra de navegación.
 */

// 1. Configuración Centralizada de Rutas (Relativas, portables y seguras)
const VOLTIX_ROUTES = {
  inicio: "inicio.html",
  electricidad: "electricidad.html",
  componentes: "componentes.html",
  aplicaciones: "aplicaciones.html",
  energias: "energias.html",
  multimedia: "multimedia.html",
  contacto: "contacto.html"
};

(function initVoltixNavigation() {
  // Detección segura de entorno iframe
  let isInsideIframe = false;
  try {
    isInsideIframe = window.self !== window.top;
  } catch (e) {
    // Si el acceso a window.top lanza error de cross-origin, definitivamente estamos en un iframe
    isInsideIframe = true;
  }

  // Marcar visualmente el contenedor para estilos contextuales si es necesario
  if (isInsideIframe) {
    document.documentElement.classList.add('in-iframe');
  }

  // Reseteo preventivo del scroll para asegurar que cada página inicie en el tope
  try {
    window.scrollTo(0, 0);
    if (document.documentElement) document.documentElement.scrollTop = 0;
    if (document.body) document.body.scrollTop = 0;
  } catch (e) {}

  document.addEventListener('DOMContentLoaded', () => {
    if (isInsideIframe && document.body) {
      document.body.classList.add('in-iframe', 'in-google-sites');
    }

    // Normalización de enlaces
    const allLinks = document.querySelectorAll('a[href]');

    allLinks.forEach(link => {
      const rawHref = link.getAttribute('href');
      if (!rawHref) return;

      const trimmedHref = rawHref.trim();

      // Caso 1: Enlaces de ancla dentro de la misma página (#introduccion, #que-es, etc.)
      if (trimmedHref.startsWith('#')) {
        // Dejar intacto para permitir scroll suave nativo
        return;
      }

      // Caso 2: Protocolos especiales (javascript:, mailto:, tel:)
      if (trimmedHref.startsWith('javascript:') || trimmedHref.startsWith('mailto:') || trimmedHref.startsWith('tel:')) {
        return;
      }

      // Caso 3: Enlaces externos absolutos (http://, https://) que NO son de VOLTIX
      if (trimmedHref.startsWith('http://') || trimmedHref.startsWith('https://')) {
        // Enlaces externos deben abrir en pestaña nueva para no ser bloqueados
        if (isInsideIframe && !link.hasAttribute('target')) {
          link.setAttribute('target', '_blank');
          link.setAttribute('rel', 'noopener noreferrer');
        }
        return;
      }

      // Caso 4: Enlaces del proyecto VOLTIX TECHNOLOGY
      // Extraer nombre de la página de destino (ej. "inicio.html" -> "inicio", "./electricidad.html" -> "electricidad")
      const cleanName = trimmedHref
        .split('?')[0]
        .split('#')[0]
        .replace(/^\.\//, '')
        .replace('.html', '')
        .toLowerCase();

      if (VOLTIX_ROUTES[cleanName]) {
        // Asignar la ruta normalizada correspondiente
        const targetFile = VOLTIX_ROUTES[cleanName];
        link.setAttribute('href', targetFile);

        // Si previamente tenía target="_top", removerlo para evitar que el sandbox de Google Sites lo bloquee
        if (link.getAttribute('target') === '_top') {
          link.removeAttribute('target');
        }

        // Listener para garantizar reseteo de scroll antes de navegar a la nueva página
        link.addEventListener('click', (e) => {
          // Si el usuario presiona Ctrl, Cmd o Shift para abrir en nueva pestaña, respetar atajo nativo
          if (e.ctrlKey || e.metaKey || e.shiftKey) return;

          // Asegurar que la nueva página cargue desde arriba
          try {
            window.scrollTo(0, 0);
          } catch (err) {}
        });
      }
    });

    // Comunicación opcional de altura con la ventana padre
    if (isInsideIframe) {
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
