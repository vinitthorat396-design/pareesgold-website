// ============ PARAS GOLD — SITE SCRIPT ============

document.addEventListener('DOMContentLoaded', () => {

  /* ---- Mobile nav toggle ---- */
  const toggle = document.querySelector('.menu-toggle');
  const navList = document.querySelector('nav ul');
  if (toggle && navList) {
    toggle.addEventListener('click', () => {
      navList.classList.toggle('mobile-open');
    });
  }

  /* ---- Hero slider ---- */
  const slides = document.querySelectorAll('.slide');
  const dots = document.querySelectorAll('.dot');
  let current = 0;
  let sliderInterval;

  function showSlide(index) {
    slides.forEach(s => s.classList.remove('active'));
    dots.forEach(d => d.classList.remove('active'));
    slides[index].classList.add('active');
    if (dots[index]) dots[index].classList.add('active');
    current = index;
  }

  function nextSlide() {
    showSlide((current + 1) % slides.length);
  }

  function prevSlide() {
    showSlide((current - 1 + slides.length) % slides.length);
  }

  function startAutoplay() {
    sliderInterval = setInterval(nextSlide, 5500);
  }

  if (slides.length) {
    showSlide(0);
    startAutoplay();

    dots.forEach((dot, i) => {
      dot.addEventListener('click', () => {
        clearInterval(sliderInterval);
        showSlide(i);
        startAutoplay();
      });
    });

    const arrowRight = document.querySelector('.arrow-right');
    const arrowLeft = document.querySelector('.arrow-left');
    if (arrowRight) arrowRight.addEventListener('click', () => { clearInterval(sliderInterval); nextSlide(); startAutoplay(); });
    if (arrowLeft) arrowLeft.addEventListener('click', () => { clearInterval(sliderInterval); prevSlide(); startAutoplay(); });
  }

  /* ---- Scroll-triggered reveal animation ---- */
  const revealEls = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  revealEls.forEach(el => observer.observe(el));

  /* ---- Header background on scroll ---- */
  const header = document.querySelector('header');
  if (header) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 40) {
        header.style.boxShadow = '0 4px 18px rgba(31,58,45,0.08)';
      } else {
        header.style.boxShadow = 'none';
      }
    });
  }

  /* ---- Contact form (demo only — connect to a real backend/Formspree later) ---- */
  const form = document.querySelector('.contact-form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      alert('Thank you! Your enquiry has been noted. We will get back to you shortly. (Connect this form to Formspree or your email service to receive real messages.)');
      form.reset();
    });
  }
});
