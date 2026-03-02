// Auto-detect basePath based on current URL
const path = window.location.pathname;
let basePath;
if (path.includes('/project/')) {
    basePath = '../../';
} else if (path.includes('/about/') || path.includes('/achievement/') || path.includes('/projects/') || path.includes('/contact/')) {
    basePath = '../';
} else {
    basePath = './';
}

function getSidebarHTML(base) {
    return `
    <aside class="sidebar" id="sidebar">

        <div class="sidebar-profile">
            <div class="sidebar-avatar">
                <img src="${base}img/photo.jpg" alt="Muhammad Lutfi">
            </div>
            <div class="sidebar-profile-info">
                <span class="sidebar-name">Muhammad Lutfi</span>
                <span class="sidebar-handle">@lutfidev</span>
            </div>
        </div>

        <div class="sidebar-socials">
            <a href="https://github.com/lutfidev" target="_blank" class="sidebar-social" title="GitHub">
                <i data-lucide="github"></i>
            </a>
            <a href="https://linkedin.com/in/lutfidev/" target="_blank" class="sidebar-social" title="LinkedIn">
                <i data-lucide="linkedin"></i>
            </a>
            <a href="mailto:mhdlutfidev@gmail.com" class="sidebar-social" title="Email">
                <i data-lucide="mail"></i>
            </a>
        </div>

        <div class="sidebar-divider"></div>

        <nav class="sidebar-nav">
            <a href="${base}" class="sidebar-item" data-page="home">
                <i data-lucide="house"></i>
                <span>Home</span>
            </a>
            <a href="${base}projects/" class="sidebar-item" data-page="projects">
                <i data-lucide="layout-grid"></i>
                <span>Projects</span>
            </a>
            <a href="${base}about/" class="sidebar-item" data-page="about">
                <i data-lucide="user"></i>
                <span>About</span>
            </a>
            <a href="${base}achievement/" class="sidebar-item" data-page="achievement">
                <i data-lucide="award"></i>
                <span>Achievement</span>
            </a>
            <a href="${base}contact/" class="sidebar-item" data-page="contact">
                <i data-lucide="phone"></i>
                <span>Contact</span>
            </a>
        </nav>

        <div class="sidebar-divider"></div>

        <button class="sidebar-theme-toggle" id="theme-toggle">
            <i data-lucide="sun" class="icon-dark"></i>
            <i data-lucide="moon" class="icon-light"></i>
            <span class="label-dark">Light Mode</span>
            <span class="label-light">Dark Mode</span>
        </button>

        <button class="sidebar-hamburger" id="hamburger" aria-label="Toggle menu">
            <span></span><span></span><span></span>
        </button>

    </aside>
    <div class="sidebar-mobile-overlay" id="mobile-overlay">
        <nav class="sidebar-mobile-nav">
            <a href="${base}" class="sidebar-mobile-link">
                <i data-lucide="house"></i><span>Home</span>
            </a>
            <a href="${base}projects/" class="sidebar-mobile-link">
                <i data-lucide="layout-grid"></i><span>Projects</span>
            </a>
            <a href="${base}about/" class="sidebar-mobile-link">
                <i data-lucide="user"></i><span>About</span>
            </a>
            <a href="${base}achievement/" class="sidebar-mobile-link">
                <i data-lucide="award"></i><span>Achievement</span>
            </a>
            <a href="${base}contact/" class="sidebar-mobile-link">
                <i data-lucide="phone"></i><span>Contact</span>
            </a>
        </nav>
    </div>`;
}

function getFooterHTML() {
    return `
    <footer class="site-footer">
        <p>&copy; 2026 Muhammad Lutfi. All rights reserved.</p>
    </footer>`;
}

function initHamburger() {
    const hamburger = document.getElementById('hamburger');
    const overlay = document.getElementById('mobile-overlay');
    if (!hamburger || !overlay) return;

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        overlay.classList.toggle('open');
    });

    overlay.querySelectorAll('.sidebar-mobile-link').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            overlay.classList.remove('open');
        });
    });
}

function setActiveNav() {
    const currentPath = window.location.pathname;
    document.querySelectorAll('.sidebar-item').forEach(item => {
        item.classList.remove('active');
        const page = item.getAttribute('data-page');
        if (!page) return;

        if (page === 'about' && currentPath.includes('/about/')) {
            item.classList.add('active');
        } else if (page === 'achievement' && currentPath.includes('/achievement/')) {
            item.classList.add('active');
        } else if (page === 'projects' && (currentPath.includes('/projects/') || currentPath.includes('/project/'))) {
            item.classList.add('active');
        } else if (page === 'contact' && currentPath.includes('/contact/')) {
            item.classList.add('active');
        } else if (page === 'home' && !currentPath.includes('/about/')
            && !currentPath.includes('/achievement/')
            && !currentPath.includes('/project/')
            && !currentPath.includes('/projects/')
            && !currentPath.includes('/contact/')) {
            item.classList.add('active');
        }
    });
}

// Theme: Light / Dark
function initTheme() {
    const saved = localStorage.getItem('theme');
    if (saved === 'light') {
        document.body.classList.add('light-mode');
    }
}

function initThemeToggle() {
    const btn = document.getElementById('theme-toggle');
    if (!btn) return;
    btn.addEventListener('click', () => {
        const isLight = document.body.classList.toggle('light-mode');
        localStorage.setItem('theme', isLight ? 'light' : 'dark');
    });
}

function initComponents(base) {
    // Apply saved theme BEFORE injecting HTML to avoid flash
    initTheme();

    const navPlaceholder = document.getElementById('nav-placeholder');
    const footerPlaceholder = document.getElementById('footer-placeholder');

    if (navPlaceholder) {
        navPlaceholder.innerHTML = getSidebarHTML(base);
    }
    if (footerPlaceholder) {
        footerPlaceholder.innerHTML = getFooterHTML();
    }

    initHamburger();
    setActiveNav();
    initThemeToggle();
}
