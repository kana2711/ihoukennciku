const steps = document.querySelectorAll('.progress-step');
const cards = document.querySelectorAll('[data-card]');

steps.forEach((step) => {
  step.addEventListener('click', () => {
    const target = step.dataset.step;
    steps.forEach((item) => {
      const active = item === step;
      item.classList.toggle('active', active);
      item.setAttribute('aria-selected', active ? 'true' : 'false');
    });
    cards.forEach((card) => {
      card.style.transform = card.dataset.card === target ? 'translateY(-4px)' : '';
      card.style.transition = 'transform .2s ease';
    });
    document.querySelector(`[data-card="${target}"]`).scrollIntoView({ behavior: 'smooth', block: 'center' });
  });
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    const current = entry.target.dataset.card;
    steps.forEach((step) => {
      const active = step.dataset.step === current;
      step.classList.toggle('active', active);
      step.setAttribute('aria-selected', active ? 'true' : 'false');
    });
  });
}, { threshold: 0.45 });

cards.forEach((card) => observer.observe(card));
