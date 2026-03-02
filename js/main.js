// Mouse spotlight effect on cards and project cards
const cards = document.querySelectorAll('.card, .project-card');

cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        // Subtle spotlight with accent color hint
        card.style.background = `radial-gradient(circle at ${x}px ${y}px, #1e2a3a, #171717)`;
    });

    card.addEventListener('mouseleave', () => {
        card.style.background = '';
    });
});

console.log("Portfolio Loaded");
