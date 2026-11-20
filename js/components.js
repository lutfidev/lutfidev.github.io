// Lucide v1 dropped the brand icons from its icon set, so `data-lucide="github"`
// and friends silently render nothing. Re-register them and merge them into
// every createIcons() call. Icon paths are the originals from lucide 0.544.0.
function registerBrandIcons() {
    const lucide = window.lucide;
    if (!lucide || typeof lucide.createIcons !== 'function' || lucide.brandIconsRegistered) return;
    lucide.brandIconsRegistered = true;

    const brandIcons = {
        Github: [
            ['path', { d: 'M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4' }],
            ['path', { d: 'M9 18c-4.51 2-5-2-7-2' }]
        ],
        Linkedin: [
            ['path', { d: 'M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z' }],
            ['rect', { width: '4', height: '12', x: '2', y: '9' }],
            ['circle', { cx: '4', cy: '4', r: '2' }]
        ],
        Figma: [
            ['path', { d: 'M5 5.5A3.5 3.5 0 0 1 8.5 2H12v7H8.5A3.5 3.5 0 0 1 5 5.5z' }],
            ['path', { d: 'M12 2h3.5a3.5 3.5 0 1 1 0 7H12V2z' }],
            ['path', { d: 'M12 12.5a3.5 3.5 0 1 1 7 0 3.5 3.5 0 1 1-7 0z' }],
            ['path', { d: 'M5 19.5A3.5 3.5 0 0 1 8.5 16H12v3.5a3.5 3.5 0 1 1-7 0z' }],
            ['path', { d: 'M5 12.5A3.5 3.5 0 0 1 8.5 9H12v7H8.5A3.5 3.5 0 0 1 5 12.5z' }]
        ]
    };

    const createIcons = lucide.createIcons;
    const allIcons = Object.assign({}, lucide.icons, brandIcons);

    lucide.createIcons = function (options = {}) {
        return createIcons(Object.assign({}, options, {
            icons: options.icons ? Object.assign({}, options.icons, brandIcons) : allIcons
        }));
    };
}

// Lucide is loaded with `defer` so its ~400KB bundle never blocks the first
// paint. Deferred scripts run before DOMContentLoaded, so icons are rendered
// then — or right away if lucide happens to be ready already.
function renderIcons() {
    if (!window.lucide) return;
    registerBrandIcons();
    window.lucide.createIcons();
}

// ---------------------------------------------------------------------------
// Shared chrome: header + footer. Edit these, never the markup inside a page.
// ---------------------------------------------------------------------------

const NAV_ITEMS = [
    { page: 'home', label: 'Home', href: '' },
    { page: 'projects', label: 'Projects', href: 'projects/' },
    { page: 'about', label: 'About', href: 'about/' },
    { page: 'achievement', label: 'Achievement', href: 'achievement/' },
    { page: 'contact', label: 'Contact', href: 'contact/' }
];

// The yoluvy mark: a heart whose point runs on into the tail of a "y".
// Monochrome: the tile takes the text colour, the stroke the page colour.
function logoMark() {
    return `
    <svg class="brand-mark" viewBox="0 0 64 64" aria-hidden="true">
        <rect width="64" height="64" rx="18" fill="currentColor"/>
        <path d="M32 40 L18.34 27.66 A8 8 0 1 1 32 22 A8 8 0 1 1 45.66 27.66 L32 40 L24.5 51.5"
              fill="none" style="stroke: var(--bg)" stroke-width="5.5" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>`;
}

function brandHTML(base) {
    return `<a href="${base}" class="brand" aria-label="yoluvy.dev — home">
        ${logoMark()}<span class="brand-word">yoluvy<span>.dev</span></span>
    </a>`;
}

function themeButtonHTML() {
    return `<button class="theme-btn" id="theme-toggle" type="button" aria-label="Toggle light/dark theme" title="Toggle theme">
        <i data-lucide="sun" class="icon-dark"></i>
        <i data-lucide="moon" class="icon-light"></i>
    </button>`;
}

function getHeaderHTML(base) {
    const links = NAV_ITEMS.map(n =>
        `<a href="${base}${n.href}" data-page="${n.page}">${n.label}</a>`).join('');
    const mobileLinks = NAV_ITEMS.map(n =>
        `<a href="${base}${n.href}" data-page="${n.page}">${n.label} <i data-lucide="arrow-up-right"></i></a>`).join('');
    return `
    <header class="site-header" id="site-header">
        <div class="container header-inner">
            ${brandHTML(base)}
            <nav class="main-nav" aria-label="Main">${links}</nav>
            <div class="header-actions">
                ${themeButtonHTML()}
                <button class="menu-btn" id="menu-btn" type="button" aria-label="Open menu" aria-expanded="false" aria-controls="mobile-menu">
                    <span></span><span></span><span></span>
                </button>
            </div>
        </div>
    </header>
    <nav class="mobile-menu" id="mobile-menu" aria-label="Mobile">
        ${mobileLinks}
    </nav>`;
}

function getFooterHTML(base) {
    const year = new Date().getFullYear();
    const nav = NAV_ITEMS.map(n => `<li><a href="${base}${n.href}">${n.label}</a></li>`).join('');
    return `
    <footer class="site-footer">
        <div class="container">
            <div class="footer-top">
                <div class="footer-brand">
                    ${brandHTML(base)}
                    <p>Web, mobile and game apps by Muhammad Lutfi, a developer in Batam, Indonesia.</p>
                    <span class="available"><span class="dot"></span> Available for project</span>
                </div>
                <div class="footer-col">
                    <h4>Navigate</h4>
                    <ul>${nav}</ul>
                </div>
                <div class="footer-col">
                    <h4>Projects</h4>
                    <ul>
                        <li><a href="${base}warung-tycoon/">Warung Tycoon</a></li>
                        <li><a href="${base}tropimori/">Tropimori</a></li>
                        <li><a href="${base}online-shop/">Online Shop</a></li>
                        <li><a href="${base}projects/">All projects</a></li>
                    </ul>
                </div>
                <div class="footer-col">
                    <h4>Elsewhere</h4>
                    <ul>
                        <li><a href="https://github.com/lutfidev" target="_blank" rel="noopener"><i data-lucide="github"></i> GitHub</a></li>
                        <li><a href="https://linkedin.com/in/lutfidev/" target="_blank" rel="noopener"><i data-lucide="linkedin"></i> LinkedIn</a></li>
                        <li><a href="mailto:yoluvy.dev@gmail.com"><i data-lucide="mail"></i> Email</a></li>
                    </ul>
                </div>
            </div>
            <div class="footer-bottom">
                <span>&copy; ${year} Muhammad Lutfi · yoluvy.dev</span>
                <button class="to-top" type="button" id="to-top">Back to top <i data-lucide="arrow-up"></i></button>
            </div>
        </div>
    </footer>`;
}

function currentPage() {
    const p = window.location.pathname;
    if (p.includes('/projects/') || document.body.dataset.project) return 'projects';
    if (p.includes('/about/')) return 'about';
    if (p.includes('/achievement/')) return 'achievement';
    if (p.includes('/contact/')) return 'contact';
    return 'home';
}

function setActiveNav() {
    const page = currentPage();
    document.querySelectorAll('.main-nav a, .mobile-menu a[data-page]').forEach(a => {
        const on = a.dataset.page === page;
        a.classList.toggle('active', on);
        if (on) a.setAttribute('aria-current', 'page');
    });
}

function initMenu() {
    const btn = document.getElementById('menu-btn');
    const menu = document.getElementById('mobile-menu');
    if (!btn || !menu) return;
    const setOpen = open => {
        btn.classList.toggle('active', open);
        menu.classList.toggle('open', open);
        document.body.classList.toggle('menu-open', open);
        btn.setAttribute('aria-expanded', String(open));
    };
    btn.addEventListener('click', () => setOpen(!menu.classList.contains('open')));
    menu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => setOpen(false)));
    document.addEventListener('keydown', e => { if (e.key === 'Escape') setOpen(false); });
}

function initHeaderScroll() {
    const header = document.getElementById('site-header');
    if (!header) return;
    const update = () => header.classList.toggle('is-scrolled', window.scrollY > 8);
    update();
    window.addEventListener('scroll', update, { passive: true });
}

function initToTop() {
    const btn = document.getElementById('to-top');
    if (btn) btn.addEventListener('click', () => window.scrollTo({ top: 0 }));
}

// Theme: Light / Dark. A saved choice wins; otherwise follow the OS.
function initTheme() {
    let saved = null;
    try { saved = localStorage.getItem('theme'); } catch (e) { /* storage blocked */ }
    const preferLight = window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches;
    if (saved === 'light' || (!saved && preferLight)) {
        document.body.classList.add('light-mode');
    }
}

// Binds the header button and the standalone toggle on privacy pages
// (both carry id="theme-toggle"), plus any [data-theme-toggle].
function initThemeToggle() {
    document.querySelectorAll('#theme-toggle, [data-theme-toggle]').forEach(btn => {
        btn.addEventListener('click', () => {
            const isLight = document.body.classList.toggle('light-mode');
            try { localStorage.setItem('theme', isLight ? 'light' : 'dark'); } catch (e) { /* ignore */ }
        });
    });
}

// Project screenshots (img[data-shot]) stay invisible until they load, so a
// missing file simply leaves the drawn mockup underneath on show.
function initShots() {
    document.querySelectorAll('img[data-shot]').forEach(img => {
        const done = () => img.classList.add('is-loaded');
        if (img.complete && img.naturalWidth > 0) done();
        else img.addEventListener('load', done, { once: true });
    });
}

function initComponents(base) {
    // Apply saved theme BEFORE injecting HTML to avoid flash
    initTheme();

    const navPlaceholder = document.getElementById('nav-placeholder');
    const footerPlaceholder = document.getElementById('footer-placeholder');

    if (navPlaceholder) navPlaceholder.outerHTML = getHeaderHTML(base);
    if (footerPlaceholder) footerPlaceholder.outerHTML = getFooterHTML(base);

    initMenu();
    setActiveNav();
    initHeaderScroll();
    initToTop();
    initThemeToggle();
    initShots();

    if (window.lucide) {
        renderIcons();
    } else {
        document.addEventListener('DOMContentLoaded', renderIcons);
    }
}

