// Scroll animations via IntersectionObserver
// Elements with class 'animate-ready' animate in once when they enter viewport

(function() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                observer.unobserve(entry.target); // trigger once only
            }
        });
    }, {
        // Must stay 0: a ratio threshold never fires for an element taller than
        // viewport / threshold (e.g. the full project grid on a phone), which
        // left it invisible forever.
        threshold: 0,
        rootMargin: '0px 0px -40px 0px'
    });

    function initAnimations() {
        document.querySelectorAll('.animate-ready').forEach(el => {
            observer.observe(el);
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initAnimations);
    } else {
        initAnimations();
    }
})();
