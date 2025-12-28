// Smooth scroll + scroll-spy for header nav links
(function () {
  const navLinks = document.querySelectorAll('header nav a[href^="#"]');

  // Click handler: smooth scroll and set active immediately
  navLinks.forEach(link => {
    link.addEventListener('click', function (e) {
      const hash = this.getAttribute('href');
      if (!hash || hash === '#') return;
      const target = document.querySelector(hash);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        // update active state
        navLinks.forEach(l => l.classList.remove('active'));
        this.classList.add('active');
      }
    });
  });

  // Scroll-spy using IntersectionObserver
  const sections = Array.from(navLinks)
    .map(l => l.getAttribute('href'))
    .filter(h => h && h.startsWith('#'))
    .map(h => document.querySelector(h))
    .filter(Boolean);

  if (sections.length === 0) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        const activeLink = document.querySelector(`header nav a[href="#${id}"]`);
        if (activeLink) {
          navLinks.forEach(l => l.classList.remove('active'));
          activeLink.classList.add('active');
        }
      }
    });
  }, { root: null, rootMargin: '-40% 0px -55% 0px', threshold: 0 });

  sections.forEach(s => observer.observe(s));
})();
