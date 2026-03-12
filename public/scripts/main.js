// ===== SCROLL ANIMATIONS =====
const observerOptions = { threshold: 0.05, rootMargin: '0px 0px 0px 0px' };
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

document.querySelectorAll('.fade-in, .slide-left, .slide-right').forEach(el => {
  observer.observe(el);
});


// ===== VIDEO LAZY LOADING =====
document.querySelectorAll('.project-video').forEach(video => {
  const source = video.querySelector('source[data-src]');
  if (!source) return;
  video.load();
  video.classList.add('video-pending');
});

const videoObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const video = entry.target;
    const source = video.querySelector('source[data-src]');
    if (!source) return;

    source.src = source.dataset.src;
    source.removeAttribute('data-src');
    video.load();
    video.classList.remove('video-pending');
    video.classList.add('video-loading');

    video.addEventListener('canplay', () => {
      video.classList.remove('video-loading');
      video.classList.add('video-ready');
      video.play().catch(() => {});
    }, { once: true });

    videoObserver.unobserve(video);
  });
}, { rootMargin: '0px 0px 200px 0px', threshold: 0 });

document.querySelectorAll('.project-video').forEach(video => {
  videoObserver.observe(video);
});


// ===== PROJECT FILTERING =====
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const filter = btn.dataset.filter;
    projectCards.forEach(card => {
      card.style.display = (filter === 'all' || card.dataset.category === filter) ? '' : 'none';
    });
  });
});


// ===== SMOOTH SCROLLING =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      const navHeight = document.querySelector('.navbar').offsetHeight;
      window.scrollTo({ top: target.offsetTop - navHeight, behavior: 'smooth' });
    }
  });
});