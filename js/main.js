/**
 * VOLTIX TECHNOLOGY — Lógica Frontend Global Perfeccionada
 * Lema: Electricidad • Tecnología • Innovación
 * Proyecto Académico • Ingeniería Eléctrica • Curso: 2-AF
 * Estudiante: GARCIA ANDRADE MATIAS EDUARDO
 */

document.addEventListener('DOMContentLoaded', () => {
  initHeroCanvas();
  initMobileMenu();
  initScrollHeader();
  initActiveNavLink();
  initScrollFadeIn();
  initMultimediaModals();
  initContactForm();
});

/* ==========================================================================
   1. Canvas Hero — Red Eléctrica con Movimiento Sutil y Baja Opacidad
   ========================================================================== */
function initHeroCanvas() {
  const canvas = document.getElementById('heroCanvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let width, height;
  let particles = [];
  const particleCount = 32;
  const maxDistance = 130;

  function resize() {
    width = canvas.width = canvas.parentElement.offsetWidth;
    height = canvas.height = canvas.parentElement.offsetHeight;
  }

  window.addEventListener('resize', resize);
  resize();

  class Particle {
    constructor() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.vx = (Math.random() - 0.5) * 0.45;
      this.vy = (Math.random() - 0.5) * 0.45;
      this.radius = Math.random() * 1.5 + 1;
      this.pulse = Math.random() * Math.PI * 2;
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;
      this.pulse += 0.02;

      if (this.x < 0 || this.x > width) this.vx *= -1;
      if (this.y < 0 || this.y > height) this.vy *= -1;
    }

    draw() {
      const alpha = 0.25 + Math.sin(this.pulse) * 0.18;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(0, 212, 255, ${alpha})`;
      ctx.shadowBlur = 8;
      ctx.shadowColor = '#00d4ff';
      ctx.fill();
    }
  }

  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
  }

  function animate() {
    ctx.clearRect(0, 0, width, height);

    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.hypot(dx, dy);

        if (dist < maxDistance) {
          const alpha = (1 - dist / maxDistance) * 0.14;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(0, 212, 255, ${alpha})`;
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
      }
    }

    particles.forEach(p => {
      p.update();
      p.draw();
    });

    requestAnimationFrame(animate);
  }

  animate();
}

/* ==========================================================================
   2. Menú Responsive Móvil
   ========================================================================== */
function initMobileMenu() {
  const toggleBtn = document.getElementById('mobileToggle');
  const navMenu = document.getElementById('navMenu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (!toggleBtn || !navMenu) return;

  toggleBtn.addEventListener('click', () => {
    toggleBtn.classList.toggle('active');
    navMenu.classList.toggle('open');
  });

  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      toggleBtn.classList.remove('active');
      navMenu.classList.remove('open');
    });
  });
}

/* ==========================================================================
   3. Header Sticky Dinámico al hacer Scroll
   ========================================================================== */
function initScrollHeader() {
  const header = document.querySelector('.site-header');
  if (!header) return;

  window.addEventListener('scroll', () => {
    if (window.pageYOffset > 30) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });
}

/* ==========================================================================
   4. Detección de Enlace Activo en la Navegación
   ========================================================================== */
function initActiveNavLink() {
  const rawCurrent = window.location.pathname.split('/').pop() || 'inicio.html';
  const currentPath = rawCurrent.split('?')[0].split('#')[0] || 'inicio.html';
  const navLinks = document.querySelectorAll('.nav-link');

  navLinks.forEach(link => {
    const rawLinkPath = (link.getAttribute('href') || '').split('?')[0].split('#')[0];
    const isCurrent = rawLinkPath === currentPath || 
      (currentPath === 'inicio.html' && (rawLinkPath === 'inicio.html' || rawLinkPath === 'index.html')) ||
      (currentPath === 'index.html' && (rawLinkPath === 'inicio.html' || rawLinkPath === 'index.html')) ||
      (currentPath === '' && (rawLinkPath === 'inicio.html' || rawLinkPath === 'index.html'));

    if (isCurrent) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
}

/* ==========================================================================
   5. Aparición Suave de Elementos al hacer Scroll (IntersectionObserver)
   ========================================================================== */
function initScrollFadeIn() {
  const elements = document.querySelectorAll('.pillar-card, .fund-card, .app-card-item, .renew-card-item, .comp-box');
  if (!('IntersectionObserver' in window)) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  elements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(16px)';
    el.style.transition = 'opacity 0.5s cubic-bezier(0.16, 1, 0.3, 1), transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)';
    observer.observe(el);
  });
}

/* ==========================================================================
   6. Modales Multimedia (Osciloscopio Digital)
   ========================================================================== */
function initMultimediaModals() {
  const modal = document.getElementById('mediaModal');
  const modalClose = document.getElementById('modalClose');
  const triggerBtns = document.querySelectorAll('[data-video-target]');

  if (!modal || !triggerBtns.length) return;

  triggerBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      modal.classList.add('active');
      modal.style.display = 'flex';
      startWaveAnimation();
    });
  });

  function closeModal() {
    modal.classList.remove('active');
    modal.style.display = 'none';
  }

  if (modalClose) {
    modalClose.addEventListener('click', closeModal);
  }

  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  function startWaveAnimation() {
    const oscCanvas = document.getElementById('oscilloCanvas');
    if (!oscCanvas) return;
    const ctx = oscCanvas.getContext('2d');
    oscCanvas.width = oscCanvas.offsetWidth;
    oscCanvas.height = oscCanvas.offsetHeight;

    let t = 0;
    function draw() {
      if (!modal.classList.contains('active')) return;
      ctx.fillStyle = '#070d18';
      ctx.fillRect(0, 0, oscCanvas.width, oscCanvas.height);

      // Rejilla de osciloscopio tenue
      ctx.strokeStyle = 'rgba(0, 212, 255, 0.07)';
      ctx.lineWidth = 1;
      const step = 28;
      for (let x = 0; x < oscCanvas.width; x += step) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, oscCanvas.height);
        ctx.stroke();
      }
      for (let y = 0; y < oscCanvas.height; y += step) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(oscCanvas.width, y);
        ctx.stroke();
      }

      // Trazo sinusoidal nítido
      ctx.beginPath();
      ctx.strokeStyle = '#00d4ff';
      ctx.lineWidth = 2.2;
      ctx.shadowBlur = 10;
      ctx.shadowColor = '#00d4ff';

      const midY = oscCanvas.height / 2;
      for (let x = 0; x < oscCanvas.width; x++) {
        const y = midY + Math.sin((x * 0.028) + t) * (oscCanvas.height * 0.3);
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      t += 0.045;
      requestAnimationFrame(draw);
    }
    draw();
  }
}

/* ==========================================================================
   7. Formulario de Contacto Académico
   ========================================================================== */
function initContactForm() {
  const form = document.getElementById('academicContactForm');
  const alertBox = document.getElementById('formAlert');

  if (!form || !alertBox) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    alertBox.style.display = 'block';
    alertBox.textContent = 'Mensaje registrado con éxito en la plataforma académica de Voltix Technology.';
    form.reset();
    setTimeout(() => {
      alertBox.style.display = 'none';
    }, 4500);
  });
}
