/* ============================================
   MAIN JAVASCRIPT - Portfolio Template
============================================ */

document.addEventListener('DOMContentLoaded', () => {
  // ---------- Theme Toggle ----------
  const themeToggle = document.getElementById('theme-toggle');
  const html = document.documentElement;
  
  // Load saved theme or system preference
  const savedTheme = localStorage.getItem('theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  if (savedTheme) {
    html.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);
  } else if (!prefersDark) {
    html.setAttribute('data-theme', 'light');
    updateThemeIcon('light');
  }
  
  themeToggle?.addEventListener('click', () => {
    const current = html.getAttribute('data-theme');
    const next = current === 'light' ? 'dark' : 'light';
    html.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
    updateThemeIcon(next);
  });
  
  function updateThemeIcon(theme) {
    const icon = themeToggle?.querySelector('i');
    if (icon) {
      icon.className = theme === 'light' ? 'fas fa-sun' : 'fas fa-moon';
    }
  }

  // ---------- Mobile Menu ----------
  const navToggle = document.getElementById('nav-toggle');
  const navClose = document.getElementById('nav-close');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav__link');
  
  navToggle?.addEventListener('click', () => {
    navMenu?.classList.add('show');
  });
  
  navClose?.addEventListener('click', () => {
    navMenu?.classList.remove('show');
  });
  
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navMenu?.classList.remove('show');
    });
  });

  // ---------- Header scroll effect ----------
  const header = document.getElementById('header');
  
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header?.classList.add('scrolled');
    } else {
      header?.classList.remove('scrolled');
    }
  });

  // ---------- Active nav link on scroll ----------
  const sections = document.querySelectorAll('section[id]');
  
  function highlightNav() {
    const scrollY = window.scrollY;
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 100;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');
      const navLink = document.querySelector(`.nav__link[href="#${sectionId}"]`);
      
      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        navLinks.forEach(l => l.classList.remove('active'));
        navLink?.classList.add('active');
      }
    });
  }
  
  window.addEventListener('scroll', highlightNav);

  // ---------- Scroll to top button ----------
  const scrollTop = document.getElementById('scroll-top');
  
  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      scrollTop?.classList.add('visible');
    } else {
      scrollTop?.classList.remove('visible');
    }
  });
  
  scrollTop?.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // ---------- Project filters ----------
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');
  
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Active state
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      
      const filter = btn.dataset.filter;
      
      projectCards.forEach(card => {
        const categories = card.dataset.category || '';
        
        if (filter === 'all' || categories.includes(filter)) {
          card.classList.remove('hidden');
          card.style.animation = 'fadeIn 0.4s ease';
        } else {
          card.classList.add('hidden');
        }
      });
    });
  });

  // ---------- Counter animation ----------
  const counters = document.querySelectorAll('.stat__number');
  let counted = false;
  
  function animateCounters() {
    if (counted) return;
    
    const heroStats = document.querySelector('.hero__stats');
    if (!heroStats) return;
    
    const rect = heroStats.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      counted = true;
      
      counters.forEach(counter => {
        const target = parseInt(counter.dataset.count) || 0;
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;
        
        const update = () => {
          current += step;
          if (current < target) {
            counter.textContent = Math.floor(current);
            requestAnimationFrame(update);
          } else {
            counter.textContent = target;
          }
        };
        
        update();
      });
    }
  }
  
  window.addEventListener('scroll', animateCounters);
  animateCounters(); // Check on load

  // ---------- Footer year ----------
  const yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // ---------- Contact form (demo) ----------
  const contactForm = document.getElementById('contact-form');
  
  contactForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // You can connect this to Formspree, EmailJS, Netlify Forms, etc.
    // Formspree example: action="https://formspree.io/f/TU_ID" method="POST"
    
    const btn = contactForm.querySelector('button[type="submit"]');
    const originalText = btn.innerHTML;
    
    btn.innerHTML = '<i class="fas fa-check"></i> Sent!';
    btn.style.background = '#22c55e';
    
    setTimeout(() => {
      btn.innerHTML = originalText;
      btn.style.background = '';
      contactForm.reset();
    }, 2500);
    
    // Opcional: mostrar alerta
    // alert('Thanks for your message! (This is just a demo)');
  });

  // ---------- Smooth reveal on scroll (Intersection Observer) ----------
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);
  
  // Observe cards and sections
  document.querySelectorAll('.project-card, .extension-card, .contact__card, .gallery__item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
  });
  
  // Add revealed styles dynamically
  const style = document.createElement('style');
  style.textContent = `
    .revealed {
      opacity: 1 !important;
      transform: translateY(0) !important;
    }
    @keyframes fadeIn {
      from { opacity: 0; transform: scale(0.95); }
      to { opacity: 1; transform: scale(1); }
    }
  `;
  document.head.appendChild(style);
});
