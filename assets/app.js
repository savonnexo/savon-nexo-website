/* ============================================================
   SAVON NEXO — Shared client logic
   - Site content store (admin-editable landing page)
   - Job postings store (admin-editable careers)
   - Auth (admin login)
   ============================================================ */

const STORE_KEYS = {
  CONTENT: 'savon_nexo_content_v1',
  JOBS:    'savon_nexo_jobs_v1',
  AUTH:    'savon_nexo_admin_session_v1',
};

const ADMIN_CREDS = {
  email: 'sesha.bellamkonda@gmail.com',
  password: 'SavonNexo@2026'
};

/* ---- Default content for the home page (admin editable) ---- */
const DEFAULT_CONTENT = {
  hero: {
    eyebrow: 'Business Intelligence • Data • AI',
    headlineLead: 'Smarter decisions,',
    headlineAccent: 'built on your data.',
    subhead: 'Savon Nexo helps retail and small-to-mid-sized businesses turn data into clear dashboards, faster decisions, and AI-powered automation — all while keeping their digital storefront strong.',
    ctaPrimary: { label: 'Start a project', href: 'contact.html' },
    ctaSecondary: { label: 'Explore services', href: 'services.html' },
  },
  about: {
    title: 'A modern technology partner for businesses that want to grow.',
    body: 'We connect operations, data, AI, and digital presence in one place — so retailers and small businesses can make smarter decisions, work more efficiently, and unlock new growth.'
  },
  cta: {
    title: 'Ready to put your data to work?',
    body: 'Tell us about your business. We will scope a starting project, share examples of similar work, and outline a clear plan.',
    ctaLabel: 'Get in touch'
  }
};

/* ---- Default jobs ---- */
const DEFAULT_JOBS = [
  {
    id: 'job-1',
    title: 'Business Intelligence Analyst',
    department: 'Analytics',
    location: 'Chesterfield, MO (Hybrid)',
    type: 'Full-time',
    summary: 'Build dashboards and reporting systems for retail clients. Translate operational questions into clear, actionable visualizations.',
    posted: '2026-04-20',
    active: true
  },
  {
    id: 'job-2',
    title: 'AI Solutions Engineer',
    department: 'AI',
    location: 'Remote (US)',
    type: 'Full-time',
    summary: 'Design and ship AI-powered automations and insight tools for our SMB clients. Strong Python, LLM, and prompt engineering skills required.',
    posted: '2026-04-12',
    active: true
  },
  {
    id: 'job-3',
    title: 'Web Solutions Developer',
    department: 'Web',
    location: 'Chesterfield, MO',
    type: 'Full-time',
    summary: 'Build and maintain client websites — landing pages, ecommerce content, and product visibility tooling.',
    posted: '2026-03-30',
    active: true
  }
];

/* ---- Store helpers ---- */
const Store = {
  getContent() {
    try {
      const raw = localStorage.getItem(STORE_KEYS.CONTENT);
      if (!raw) return structuredClone(DEFAULT_CONTENT);
      const parsed = JSON.parse(raw);
      // shallow-merge so missing fields fall back to defaults
      return Object.assign(structuredClone(DEFAULT_CONTENT), parsed);
    } catch (e) {
      return structuredClone(DEFAULT_CONTENT);
    }
  },
  setContent(content) {
    localStorage.setItem(STORE_KEYS.CONTENT, JSON.stringify(content));
  },
  resetContent() {
    localStorage.removeItem(STORE_KEYS.CONTENT);
  },

  getJobs() {
    try {
      const raw = localStorage.getItem(STORE_KEYS.JOBS);
      if (!raw) {
        localStorage.setItem(STORE_KEYS.JOBS, JSON.stringify(DEFAULT_JOBS));
        return structuredClone(DEFAULT_JOBS);
      }
      return JSON.parse(raw);
    } catch (e) {
      return structuredClone(DEFAULT_JOBS);
    }
  },
  setJobs(jobs) {
    localStorage.setItem(STORE_KEYS.JOBS, JSON.stringify(jobs));
  },
  resetJobs() {
    localStorage.removeItem(STORE_KEYS.JOBS);
  },
};

/* ---- Auth ---- */
const Auth = {
  login(email, password) {
    if (email.trim().toLowerCase() === ADMIN_CREDS.email &&
        password === ADMIN_CREDS.password) {
      const session = { email, since: Date.now() };
      sessionStorage.setItem(STORE_KEYS.AUTH, JSON.stringify(session));
      return true;
    }
    return false;
  },
  logout() {
    sessionStorage.removeItem(STORE_KEYS.AUTH);
  },
  current() {
    try {
      const raw = sessionStorage.getItem(STORE_KEYS.AUTH);
      return raw ? JSON.parse(raw) : null;
    } catch (e) { return null; }
  },
  isLoggedIn() { return !!this.current(); }
};

/* ---- Render shared nav/footer ---- */
const NAV_HTML = `
<header class="nav">
  <div class="nav-inner">
    <a href="index.html" class="nav-brand">
      <img src="assets/logo.png" alt="Savon Nexo" class="logo-img">
    </a>
    <nav>
      <ul class="nav-links" data-nav-links>
        <li><a href="index.html">Home</a></li>
        <li><a href="about.html">About</a></li>
        <li><a href="services.html">Services</a></li>
        <li><a href="careers.html">Careers</a></li>
        <li><a href="contact.html">Contact</a></li>
      </ul>
    </nav>
    <div class="nav-cta">
      <a href="contact.html" class="btn btn-primary btn-sm">Start a project</a>
      <button class="nav-toggle" data-nav-toggle aria-label="Open menu">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 12h18M3 6h18M3 18h18"/></svg>
      </button>
    </div>
  </div>
</header>`;

const FOOTER_HTML = `
<footer class="footer">
  <div class="container">
    <div class="footer-grid">
      <div class="footer-brand">
        <img src="assets/logo.png" alt="Savon Nexo" class="logo-img">
        <p>Business intelligence, data analytics, AI, and web solutions for retail and small business.</p>
      </div>
      <div>
        <h4>Services</h4>
        <ul>
          <li><a href="services-bi.html">Business Intelligence</a></li>
          <li><a href="services-analytics.html">Data Analytics</a></li>
          <li><a href="services-ai.html">AI Solutions</a></li>
          <li><a href="services-web.html">Web Solutions</a></li>
        </ul>
      </div>
      <div>
        <h4>Company</h4>
        <ul>
          <li><a href="about.html">About</a></li>
          <li><a href="careers.html">Careers</a></li>
          <li><a href="contact.html">Contact</a></li>
        </ul>
      </div>
      <div>
        <h4>Get in touch</h4>
        <ul>
          <li>18336 Edison Ave<br>Chesterfield, MO 63005</li>
          <li><a href="mailto:info@savonnexo.com">info@savonnexo.com</a></li>
          <li><a href="https://www.savonnexo.com">www.savonnexo.com</a></li>
        </ul>
      </div>
    </div>
    <div class="footer-bottom">
      <div>© <span data-year></span> Savon Nexo. All rights reserved.</div>
      <div>Chesterfield, MO</div>
    </div>
  </div>
</footer>`;

function renderShared() {
  const nav = document.querySelector('[data-nav-slot]');
  const footer = document.querySelector('[data-footer-slot]');
  if (nav) nav.outerHTML = NAV_HTML;
  if (footer) footer.outerHTML = FOOTER_HTML;
}

/* ---- Mobile nav toggle ---- */
function setupMobileNav() {
  const toggle = document.querySelector('[data-nav-toggle]');
  const links = document.querySelector('[data-nav-links]');
  if (!toggle || !links) return;
  toggle.addEventListener('click', () => links.classList.toggle('open'));
  links.querySelectorAll('a').forEach(a => a.addEventListener('click', () => links.classList.remove('open')));
}

/* ---- Mark active nav link ---- */
function markActiveNav() {
  const path = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(a => {
    const href = a.getAttribute('href');
    if (!href) return;
    if (href === path || (path === '' && href === 'index.html')) {
      a.classList.add('active');
    }
  });
}

/* ---- Year in footer ---- */
function setYear() {
  document.querySelectorAll('[data-year]').forEach(el => el.textContent = new Date().getFullYear());
}

document.addEventListener('DOMContentLoaded', () => {
  renderShared();
  setupMobileNav();
  markActiveNav();
  setYear();
});
