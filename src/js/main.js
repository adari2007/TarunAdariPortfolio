/**
 * Tarun Adari — Portfolio
 * main.js — Interactivity & enhancements
 */

/* ── Smooth active nav highlighting ── */
(function initNavHighlight() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a');

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          navLinks.forEach((link) => link.classList.remove('active'));
          const active = document.querySelector(`.nav-links a[href="#${entry.target.id}"]`);
          if (active) active.classList.add('active');
        }
      });
    },
    { rootMargin: '-40% 0px -55% 0px' }
  );

  sections.forEach((section) => observer.observe(section));
})();

/* ── Scroll-reveal animations ── */
(function initScrollReveal() {
  const revealEls = document.querySelectorAll(
    '.job, .project-card, .skill-category, .cert-card, .blog-card'
  );

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 }
  );

  revealEls.forEach((el) => {
    el.classList.add('reveal-pending');
    observer.observe(el);
  });
})();

/* ── Contact form handler ── */
(function initContactForm() {
  const btn = document.querySelector('.contact-form .btn-primary');
  if (!btn) return;

  btn.addEventListener('click', () => {
    const name    = document.querySelector('.contact-form input[placeholder="Your name"]');
    const email   = document.querySelector('.contact-form input[type="email"]');
    const subject = document.querySelector('.contact-form input[placeholder="What\'s this about?"]');
    const message = document.querySelector('.contact-form textarea');

    if (!name.value || !email.value || !message.value) {
      showToast('Please fill in all required fields.', 'error');
      return;
    }

    if (!isValidEmail(email.value)) {
      showToast('Please enter a valid email address.', 'error');
      return;
    }

    // Build mailto link as fallback (replace with backend endpoint as needed)
    const mailto = `mailto:adari.tarun@gmail.com?subject=${encodeURIComponent(subject.value || 'Portfolio Inquiry')}&body=${encodeURIComponent(`Name: ${name.value}\nEmail: ${email.value}\n\n${message.value}`)}`;
    window.location.href = mailto;

    showToast('Opening your email client…', 'success');
  });
})();

/* ── Typed hero subtitle cycling ── */
(function initTypedEffect() {
  const el = document.querySelector('.hero-title .highlight');
  if (!el) return;

  const phrases = ['AI / MCP / Agents', 'Claude & Anthropic', 'Agentic Workflows', 'Cloud Architecture'];
  let i = 0;
  let charIdx = 0;
  let deleting = false;

  function tick() {
    const current = phrases[i];
    if (deleting) {
      charIdx--;
      el.textContent = current.slice(0, charIdx);
      if (charIdx === 0) {
        deleting = false;
        i = (i + 1) % phrases.length;
        setTimeout(tick, 400);
        return;
      }
      setTimeout(tick, 50);
    } else {
      charIdx++;
      el.textContent = current.slice(0, charIdx);
      if (charIdx === current.length) {
        deleting = true;
        setTimeout(tick, 2200);
        return;
      }
      setTimeout(tick, 90);
    }
  }

  setTimeout(tick, 1200);
})();

/* ── Back to top button ── */
(function initBackToTop() {
  const btn = document.createElement('button');
  btn.textContent = '↑';
  btn.setAttribute('aria-label', 'Back to top');
  btn.style.cssText = `
    position: fixed; bottom: 2rem; right: 2rem;
    width: 44px; height: 44px;
    background: var(--neon); color: #000;
    border: none; cursor: pointer;
    font-size: 1.1rem; font-weight: 700;
    opacity: 0; transition: opacity 0.3s, transform 0.3s;
    z-index: 99;
    clip-path: polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 8px 100%, 0 calc(100% - 8px));
  `;

  document.body.appendChild(btn);

  window.addEventListener('scroll', () => {
    btn.style.opacity = window.scrollY > 600 ? '1' : '0';
    btn.style.transform = window.scrollY > 600 ? 'translateY(0)' : 'translateY(10px)';
  });

  btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
})();

/* ── Toast notification ── */
function showToast(message, type = 'success') {
  const existing = document.querySelector('.portfolio-toast');
  if (existing) existing.remove();

  const toast = document.createElement('div');
  toast.className = 'portfolio-toast';
  toast.textContent = message;
  toast.style.cssText = `
    position: fixed; bottom: 5rem; left: 50%; transform: translateX(-50%);
    background: ${type === 'error' ? '#7f1d1d' : '#0f2a1f'};
    color: ${type === 'error' ? '#fca5a5' : '#34a884'};
    border: 1px solid ${type === 'error' ? '#ef4444' : '#34a884'};
    padding: 0.75rem 1.5rem;
    font-family: var(--font-mono); font-size: 0.8rem; letter-spacing: 1px;
    z-index: 200; animation: fadeIn 0.3s ease;
  `;
  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 3500);
}

/* ── Helpers ── */
function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
