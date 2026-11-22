// Project screenshot gallery + lightbox (project detail pages only).
// Screenshots are img/projects/<slug>/shot-N.webp (or web-shot-N.webp for a
// project's website gallery). A page may have several [data-gallery] sections;
// each one gets its own lightbox sequence. Items whose file is missing are
// dropped; if none load, that section shows its "coming soon" note instead.
(function () {
    const sections = Array.from(document.querySelectorAll('[data-gallery]'));
    if (!sections.length) return;

    sections.forEach(section => {
        const items = Array.from(section.querySelectorAll('.gallery-item'));
        let pending = items.length;
        const settle = () => {
            pending--;
            if (pending === 0 && !section.querySelector('.gallery-item.is-loaded')) {
                section.classList.add('is-empty');
            }
        };

        items.forEach(item => {
            const img = item.querySelector('img');
            const ok = () => { item.classList.add('is-loaded'); settle(); };
            const fail = () => { item.remove(); settle(); };
            if (img.complete) { img.naturalWidth > 0 ? ok() : fail(); }
            else {
                img.addEventListener('load', ok, { once: true });
                img.addEventListener('error', fail, { once: true });
            }
        });
    });

    // Lightbox (shared; browses the section that was clicked)
    const box = document.createElement('div');
    box.className = 'lightbox';
    box.setAttribute('role', 'dialog');
    box.setAttribute('aria-modal', 'true');
    box.setAttribute('aria-label', 'Screenshot viewer');
    box.innerHTML = `
        <img alt="">
        <button type="button" class="lb-close" aria-label="Close"><i data-lucide="x"></i></button>
        <button type="button" class="lb-prev" aria-label="Previous"><i data-lucide="chevron-left"></i></button>
        <button type="button" class="lb-next" aria-label="Next"><i data-lucide="chevron-right"></i></button>
        <span class="lb-count"></span>`;
    document.body.appendChild(box);
    const boxImg = box.querySelector('img');
    const count = box.querySelector('.lb-count');
    let index = 0;
    let current = sections[0];

    const shots = () => Array.from(current.querySelectorAll('.gallery-item.is-loaded img'));
    const show = i => {
        const list = shots();
        if (!list.length) return;
        index = (i + list.length) % list.length;
        boxImg.src = list[index].src;
        boxImg.alt = list[index].alt;
        count.textContent = (index + 1) + ' / ' + list.length;
    };
    const open = (section, i) => {
        current = section;
        show(i);
        box.classList.add('open');
        document.body.style.overflow = 'hidden';
        if (window.lucide) window.lucide.createIcons({ nodes: [box] });
        box.querySelector('.lb-close').focus();
    };
    const close = () => {
        box.classList.remove('open');
        document.body.style.overflow = '';
    };

    sections.forEach(section => {
        section.addEventListener('click', e => {
            const item = e.target.closest('.gallery-item.is-loaded');
            if (!item) return;
            const list = Array.from(section.querySelectorAll('.gallery-item.is-loaded img'));
            open(section, list.indexOf(item.querySelector('img')));
        });
    });
    box.querySelector('.lb-close').addEventListener('click', close);
    box.querySelector('.lb-prev').addEventListener('click', () => show(index - 1));
    box.querySelector('.lb-next').addEventListener('click', () => show(index + 1));
    box.addEventListener('click', e => { if (e.target === box) close(); });
    document.addEventListener('keydown', e => {
        if (!box.classList.contains('open')) return;
        if (e.key === 'Escape') close();
        if (e.key === 'ArrowLeft') show(index - 1);
        if (e.key === 'ArrowRight') show(index + 1);
    });
})();
