# GUÍA DEFINITIVA: CÓMO INTEGRAR VOLTIX TECHNOLOGY EN GOOGLE SITES

> **Proyecto Académico:** VOLTIX TECHNOLOGY — Electricidad • Tecnología • Innovación  
> **Carrera:** Ingeniería Eléctrica | **Curso:** 2-AF | **Año:** 2026  
> **Estudiante:** GARCIA ANDRADE MATIAS EDUARDO | **Docente:** VICTOR JAVIER QUIÑONEZ QUIÑONEZ  

---

## 1. INTRODUCCIÓN: REALIDAD TÉCNICA DE GOOGLE SITES

Google Sites **no es un servidor de hosting tradicional** (no tiene un botón para «subir una carpeta ZIP con HTML, CSS, JS e imágenes»). Google Sites es un maquetador visual que permite dos formas de introducir contenido externo:

1. **Método A — «Insertar > Código» (HTML embebido dentro de un bloque):**
   - El código se ejecuta dentro de un marco aislado (`iframe`) en los servidores de Google (`*.googleusercontent.com`).
   - **Limitación principal:** Si en el código colocas `<img src="assets/images/foto.jpg">`, la imagen no se verá porque no existe dentro del servidor de Google; requiere que las imágenes estén alojadas en una URL pública de internet. Además, los enlaces entre páginas pueden quedar atrapados dentro del bloque si no usan `target="_top"`.

2. **Método B [MÉTODO RECOMENDADO Y 100% FIEL] — «Insertar > Página Completa por URL»:**
   - Subes la carpeta `google-sites/` a un servicio de hosting web estático gratuito e instantáneo (como **GitHub Pages**, **Vercel**, **Netlify** o **Tiiny.host**).
   - En Google Sites creas una página y seleccionas **«Insertar > Página completa»**, pegando la URL de tu página (ej. `https://tu-usuario.github.io/voltix/inicio.html`).
   - **Ventajas definitivas:**
     - El diseño se conserva al **100% exactamente igual al original**: colores, tipografías, canvas de red eléctrica interactivo, osciloscopio en tiempo real, efectos hover y transiciones.
     - Todas las imágenes cargan instantáneamente en alta definición.
     - Es 100% responsive en computadoras, tablets y teléfonos móviles.
     - No requiere tocar ni una sola línea de código en Google Sites.

---

## 2. QUÉ ARCHIVOS SE DEBEN UTILIZAR Y CUÁLES NO

### ✅ Archivos que SÍ forman parte de la versión para Google Sites (`/google-sites/`):
- `inicio.html`: Página de inicio oficial (adaptada de `index.html`).
- `electricidad.html`: Fundamentos, magnitudes y Ley de Ohm.
- `componentes.html`: Catálogo editorial con esquemáticos SVG de 8 componentes.
- `aplicaciones.html`: Grandes historias visuales de la electricidad moderna.
- `energias.html`: Presentación técnica de fuentes de energía renovable y convencional.
- `multimedia.html`: Galería tecnológica asimétrica y osciloscopio virtual interactivo.
- `contacto.html`: Composición institucional universitaria y ficha técnica.
- `css/style.css`: Hoja de estilos con variables, diseño responsive y optimización iframe.
- `js/main.js`: Lógica visual, menú móvil, canvas de partículas y simulador.
- `js/google-sites-nav.js`: Enrutador inteligente que sincroniza los enlaces con Google Sites.
- `assets/images/`: Las 15 fotografías de ingeniería y laboratorios.

### ❌ Archivos que NO se necesitan en Google Sites:
- `server.js` (solo sirve para pruebas locales con Node.js en tu PC).
- `package.json` y `package-lock.json` (solo se usaron para generar el Word/PDF).
- `node_modules/` (dependencias internas de desarrollo).
- `scripts/` (scripts utilitarios).
- Archivos `.docx` o `.pdf` (son documentos de entrega independiente).

---

## 3. PASO A PASO: LA FORMA MÁS RÁPIDA Y PROFESIONAL (MÉTODO RECOMENDADO)

### PASO 1: Alojar la carpeta `google-sites` en GitHub Pages (Gratis y Permanente)

1. Ingresa a [GitHub.com](https://github.com) con tu cuenta (o créate una gratis).
2. Crea un nuevo repositorio público llamado, por ejemplo: `voltix-site`.
3. Sube el contenido de la carpeta `google-sites/` al repositorio (de modo que `inicio.html` quede en la raíz del repositorio).
4. En GitHub, ve a **Settings** > **Pages**.
5. En la sección **Build and deployment > Branch**, selecciona `main` (o `master`) y la carpeta `/ (root)`. Haz clic en **Save**.
6. En un par de minutos, GitHub te dará tu enlace público, por ejemplo:
   ```
   https://tu-usuario.github.io/voltix-site/inicio.html
   ```

*(Alternativa aún más rápida sin cuenta de GitHub: puedes arrastrar la carpeta `google-sites` a [Netlify Drop](https://app.netlify.com/drop) o [Tiiny.host](https://tiiny.host) y te dará una URL web en 15 segundos).*

---

### PASO 2: Configurar las Páginas en Google Sites

1. Entra a [Google Sites](https://sites.google.com/) y abre tu sitio en blanco o existente.
2. En el panel lateral derecho, haz clic en la pestaña **«Páginas»**.
3. Haz clic en el botón inferior **«+»** (Nueva página).
4. **IMPORTANTE:** Para que ocupe toda la pantalla sin bordes molestos, en lugar de una página común, haz clic en el icono de **«Página de inserción completa»** (Full page embed) o crea una página y elimina el encabezado predeterminado de Google Sites.
5. Crea las 7 páginas en este orden:
   - **Inicio**
   - **Electricidad**
   - **Componentes**
   - **Aplicaciones**
   - **Energías**
   - **Multimedia**
   - **Contacto**

---

### PASO 3: Insertar cada Página mediante su URL

1. En tu Google Site, ve a la página **Inicio**.
2. Haz clic en **«Insertar»** > **«Por URL»** (o en el botón grande del centro si es página de inserción completa).
3. Pega la URL correspondiente a esa página:
   ```
   https://tu-usuario.github.io/voltix-site/inicio.html
   ```
4. Selecciona **«Página completa»** y haz clic en **Insertar**.
5. Repite este mismo proceso para las 6 páginas restantes:
   - Para Electricidad: `.../electricidad.html`
   - Para Componentes: `.../componentes.html`
   - Para Aplicaciones: `.../aplicaciones.html`
   - Para Energías: `.../energias.html`
   - Para Multimedia: `.../multimedia.html`
   - Para Contacto: `.../contacto.html`

---

### PASO 4: Sincronizar el Menú de Navegación de VOLTIX con las URLs de Google Sites

Dentro del archivo `google-sites/js/google-sites-nav.js` existe una configuración centralizada:

```javascript
const GOOGLE_SITES_URLS = {
  inicio: "https://sites.google.com/view/tu-sitio/inicio",
  electricidad: "https://sites.google.com/view/tu-sitio/electricidad",
  componentes: "https://sites.google.com/view/tu-sitio/componentes",
  aplicaciones: "https://sites.google.com/view/tu-sitio/aplicaciones",
  energias: "https://sites.google.com/view/tu-sitio/energias",
  multimedia: "https://sites.google.com/view/tu-sitio/multimedia",
  contacto: "https://sites.google.com/view/tu-sitio/contacto"
};
```

1. Copia las direcciones exactas de tus páginas de Google Sites.
2. Pégalas en `google-sites/js/google-sites-nav.js`.
3. Guarda y sube el cambio a tu repositorio.
4. **¡Listo!** Ahora, al hacer clic en el menú o en los botones dentro del diseño, la navegación cambiará fluidamente de página en Google Sites.

---

## 4. MÉTODO B ALTERNATIVO: «INSERTAR CÓDIGO DIRECTO» (SIN HOSTING EXTERNO)

Si tu docente exige estrictamente **no usar hosting externo** y pegar el código directamente en Google Sites:

1. **Alojamiento previo de imágenes:**
   Debes subir las 15 imágenes de `google-sites/assets/images/` a un almacén público con enlace directo (como Imgur, Cloudinary, o Google Drive en modo enlace directo público).
2. **Reemplazo de rutas:**
   En cada archivo HTML, sustituyes `assets/images/nombre.jpg` por la URL pública directa de la imagen correspondiente.
3. **Insertar en Google Sites:**
   - En Google Sites, haz clic en **«Insertar»** > **«Insertar código»**.
   - Abre el archivo HTML (ej. `inicio.html`), copia todo su contenido y pégalo en la ventana.
   - Haz clic en **«Siguiente»** e **«Insertar»**.
   - **Paso indispensable:** En el editor de Google Sites, arrastra los puntos azules inferiores del cuadro embebido hacia abajo para darle suficiente altura y evitar que aparezcan barras de desplazamiento internas.

---

## 5. CATÁLOGO COMPLETO DE IMÁGENES UTILIZADAS (15 IMÁGENES)

| Archivo | Temática Técnica | Páginas donde se utiliza |
| :--- | :--- | :--- |
| `intro-lab.jpg` | Laboratorio de ensayos de circuitos | Inicio, Multimedia, Contacto |
| `hero-energy.jpg` | Líneas de transmisión de alta potencia | Electricidad, Multimedia |
| `components-banner.jpg` | Placa de circuito y semiconductores | Componentes, Multimedia |
| `comp-capacitor.jpg` | Banco de capacitores e inductancias | Componentes, Multimedia |
| `app-industry.jpg` | Subestación eléctrica de media tensión | Aplicaciones, Multimedia |
| `app-automation.jpg` | Robótica industrial y PLCs | Aplicaciones, Multimedia |
| `app-transport.jpg` | Tracción eléctrica y trenes de alta velocidad | Aplicaciones, Multimedia |
| `app-tech.jpg` | Telecomunicaciones y centro de datos | Aplicaciones, Multimedia, Contacto |
| `app-home.jpg` | Electrificación residencial y domótica | Aplicaciones |
| `energy-solar.jpg` | Parque fotovoltaico con celdas de silicio | Energías, Multimedia |
| `energy-wind.jpg` | Aerogeneradores eólicos modernos | Energías, Multimedia |
| `energy-hydro.jpg` | Central hidroeléctrica y turbinas de agua | Energías |
| `energy-geothermal.jpg` | Generación térmica y cogeneración | Energías |
| `cta-energy.jpg` | Red eléctrica y circuitos inteligentes | Inicio, Multimedia |
| `multimedia-preview.jpg` | Pantalla de osciloscopio analizando onda AC | Multimedia |

---

## 6. CÓMO PROBAR ANTES DE PUBLICAR: EL SIMULADOR LOCAL

En la raíz del proyecto se creó el archivo:

👉 **`TEST-GOOGLE-SITES.html`**

### Instrucciones de uso:
1. Asegúrate de tener el servidor local encendido (doble clic en `iniciar.bat` o `node server.js`).
2. Abre en tu navegador:
   ```
   http://localhost:3000/TEST-GOOGLE-SITES.html
   ```
3. Podrás:
   - Probar las 7 páginas en un entorno que simula exactamente un `iframe` de Google Sites.
   - Probar cómo se ve en **Desktop (100%)**, **Laptop (1024px)**, **Tablet (768px)** y **Móvil (390px)**.
   - Verificar que no existan desbordes horizontales ni fallas tipográficas.

---

## 7. CRITERIOS DE REVISIÓN Y CHECKLIST FINAL DE ENTREGA

Antes de entregar tu enlace de Google Sites, comprueba:
- [ ] Las 7 páginas cargan con el fondo oscuro y acentos azul eléctrico/cyan.
- [ ] La tipografía (Inter, Outfit, JetBrains Mono) se visualiza correctamente.
- [ ] Los esquemáticos vectoriales de componentes se renderizan con nitidez.
- [ ] La asignatura indica formalmente: **Computación II**.
- [ ] El nombre del estudiante (**GARCIA ANDRADE MATIAS EDUARDO**) y del docente (**VICTOR JAVIER QUIÑONEZ QUIÑONEZ**) están visibles en el pie de página y en Contacto.
- [ ] El simulador de osciloscopio en *Multimedia* dibuja la onda senoidal en tiempo real.
- [ ] No existen barras de desplazamiento horizontales en ninguna resolución.
