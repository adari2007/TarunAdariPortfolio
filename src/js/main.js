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
    position: fixed; bottom: 2rem; right: calc(2rem + 52px + 1rem);
    width: 52px; height: 52px;
    background: var(--bg2); color: var(--neon);
    border: 1px solid var(--border); cursor: pointer;
    font-size: 1.2rem; font-weight: 700;
    opacity: 0; pointer-events: none;
    transition: opacity 0.3s, transform 0.3s;
    z-index: 501;
    clip-path: polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 10px 100%, 0 calc(100% - 10px));
  `;

  document.body.appendChild(btn);

  window.addEventListener('scroll', () => {
    const visible = window.scrollY > 600;
    btn.style.opacity = visible ? '1' : '0';
    btn.style.transform = visible ? 'translateY(0)' : 'translateY(10px)';
    btn.style.pointerEvents = visible ? 'auto' : 'none';
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

/* ── Chatbot ── */
(function initChatbot() {
  const toggle   = document.getElementById('chat-toggle');
  const panel    = document.getElementById('chat-panel');
  const closeBtn = document.getElementById('chat-close');
  const input    = document.getElementById('chat-input');
  const sendBtn  = document.getElementById('chat-send');
  const messages = document.getElementById('chat-messages');
  const iconOpen  = document.getElementById('chat-icon-open');
  const iconClose = document.getElementById('chat-icon-close');
  if (!toggle) return;

  const history = [];
  let isOpen = false;

  function openChat() {
    isOpen = true;
    panel.setAttribute('aria-hidden', 'false');
    iconOpen.style.display  = 'none';
    iconClose.style.display = 'block';
    input.focus();
  }

  function closeChat() {
    isOpen = false;
    panel.setAttribute('aria-hidden', 'true');
    iconOpen.style.display  = 'block';
    iconClose.style.display = 'none';
  }

  toggle.addEventListener('click', () => isOpen ? closeChat() : openChat());
  closeBtn.addEventListener('click', closeChat);

  const heroBtn = document.getElementById('hero-chat-btn');
  if (heroBtn) heroBtn.addEventListener('click', openChat);

  function formatMarkdown(text) {
    return text
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/(^|\n)(- .+)(\n- .+)*/g, (block) => {
        const items = block.trim().split('\n').map(l => `<li>${l.replace(/^- /, '').replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')}</li>`).join('');
        return `<ul>${items}</ul>`;
      })
      .replace(/\n\n/g, '<br><br>')
      .replace(/\n/g, '<br>');
  }

  function appendMessage(role, text) {
    const wrapper = document.createElement('div');
    wrapper.className = `chat-msg ${role}`;
    const bubble = document.createElement('div');
    bubble.className = 'chat-bubble';
    if (role === 'bot') {
      bubble.innerHTML = formatMarkdown(text);
    } else {
      bubble.textContent = text;
    }
    wrapper.appendChild(bubble);
    messages.appendChild(wrapper);
    messages.scrollTop = messages.scrollHeight;
    return wrapper;
  }

  function appendTyping() {
    const wrapper = document.createElement('div');
    wrapper.className = 'chat-msg bot chat-typing';
    wrapper.innerHTML = '<div class="chat-bubble"><span></span><span></span><span></span></div>';
    messages.appendChild(wrapper);
    messages.scrollTop = messages.scrollHeight;
    return wrapper;
  }

  async function sendMessage() {
    const text = input.value.trim();
    if (!text) return;

    input.value = '';
    sendBtn.disabled = true;
    appendMessage('user', text);
    history.push({ role: 'user', content: text });

    const typing = appendTyping();

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: history }),
      });
      const data = await res.json();
      const reply = data.content || data.error || 'Sorry, something went wrong.';
      typing.remove();
      appendMessage('bot', reply);
      history.push({ role: 'assistant', content: reply });
    } catch {
      typing.remove();
      appendMessage('bot', 'Connection error. Please try again.');
    } finally {
      sendBtn.disabled = false;
      input.focus();
    }
  }

  sendBtn.addEventListener('click', sendMessage);
  input.addEventListener('keydown', (e) => { if (e.key === 'Enter') sendMessage(); });
})();
