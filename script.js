// ===== SCROLL ANIMATIONS =====
const observerOptions = {
  threshold: 0.05,
  rootMargin: '0px 0px 0px 0px'
};
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
// On page load: strip src so browser doesn't fetch anything,
// and show a poster placeholder instead.
document.querySelectorAll('.project-video').forEach(video => {
  const source = video.querySelector('source');
  if (!source) return;

  // Stash the real src, remove it so no network request fires
  source.dataset.src = source.src;
  source.removeAttribute('src');

  // Pause & show poster state (dark card bg acts as fallback poster)
  video.load();

  // Add a CSS class so we can style the "not yet loaded" state
  video.classList.add('video-pending');
});

// IntersectionObserver for videos — loads when card is ~200px from viewport
const videoObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;

    const video = entry.target;
    const source = video.querySelector('source');
    if (!source || !source.dataset.src) return;

    // Restore the src and let the browser load it
    source.src = source.dataset.src;
    delete source.dataset.src;

    video.load();
    video.classList.remove('video-pending');
    video.classList.add('video-loading');

    // Once enough data is buffered, play and mark as ready
    video.addEventListener('canplay', () => {
      video.classList.remove('video-loading');
      video.classList.add('video-ready');
      video.play().catch(() => {}); // silently handle autoplay blocks
    }, { once: true });

    videoObserver.unobserve(video);
  });
}, {
  rootMargin: '0px 0px 200px 0px', // start loading 200px before entering view
  threshold: 0
});

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
      if (filter === 'all' || card.dataset.category === filter) {
        card.style.display = '';
      } else {
        card.style.display = 'none';
      }
    });
  });
});


// ===== SMOOTH SCROLLING FOR NAVBAR LINKS =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      const navHeight = document.querySelector('.navbar').offsetHeight;
      const targetPosition = target.offsetTop - navHeight;
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }
  });
});


// ===== CONTACT FORM (EmailJS) =====
emailjs.init('ZMSS1LVAAfJWzhQQR');

const contactForm = document.getElementById('contactForm');
const formMessage = document.getElementById('formMessage');

contactForm.addEventListener('submit', function(e) {
  e.preventDefault();

  const submitBtn = contactForm.querySelector('button[type="submit"]');
  const originalText = submitBtn.textContent;
  submitBtn.textContent = 'Sending...';
  submitBtn.disabled = true;

  const templateParams = {
    from_name: document.getElementById('name').value,
    from_email: document.getElementById('email').value,
    message: document.getElementById('message').value
  };

  emailjs.send('service_c4zldhl', 'template_khkbo9r', templateParams)
    .then(() => {
      formMessage.textContent = '✅ Message sent successfully!';
      formMessage.style.color = 'white';
      formMessage.style.backgroundColor = 'rgba(34, 197, 94, 0.3)';
      formMessage.style.padding = '0.75rem';
      formMessage.style.borderRadius = '0.5rem';
      formMessage.style.display = 'block';
      contactForm.reset();

      submitBtn.textContent = originalText;
      submitBtn.disabled = false;

      setTimeout(() => {
        formMessage.style.display = 'none';
      }, 5000);
    })
    .catch((error) => {
      formMessage.textContent = '❌ Failed to send message. Please try again later.';
      formMessage.style.color = 'white';
      formMessage.style.backgroundColor = 'rgba(239, 68, 68, 0.3)';
      formMessage.style.padding = '0.75rem';
      formMessage.style.borderRadius = '0.5rem';
      formMessage.style.display = 'block';

      submitBtn.textContent = originalText;
      submitBtn.disabled = false;

      console.error('EmailJS Error:', error);
    });
});