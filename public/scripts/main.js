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


// ===== CONTACT FORM (EmailJS) =====
// Wait for the DOM + EmailJS to be fully ready before wiring up the form
function initContactForm() {
  if (typeof emailjs === 'undefined') {
    // EmailJS CDN not loaded yet — retry in 100ms
    setTimeout(initContactForm, 100);
    return;
  }

  emailjs.init('ZMSS1LVAAfJWzhQQR');

  const contactForm = document.getElementById('contactForm');
  const formMessage = document.getElementById('formMessage');

  if (!contactForm) return;

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
        setTimeout(() => { formMessage.style.display = 'none'; }, 5000);
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
}

// Kick off after DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initContactForm);
} else {
  initContactForm();
}