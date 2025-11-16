

// ===== SCROLL ANIMATIONS =====
const observerOptions = {
  threshold: 0.2,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// Observe all animated elements
document.querySelectorAll('.fade-in, .slide-left, .slide-right').forEach(el => {
  observer.observe(el);
});

// ===== PROJECT FILTERING =====
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    // Update active button
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    // Filter projects
    const filter = btn.dataset.filter;
    projectCards.forEach(card => {
      if (filter === 'all' || card.dataset.category === filter) {
        card.style.display = 'block';
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
// Initialize EmailJS
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
      
      // Reset button
      submitBtn.textContent = originalText;
      submitBtn.disabled = false;
      
      // Hide message after 5 seconds
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
      
      // Reset button
      submitBtn.textContent = originalText;
      submitBtn.disabled = false;
      
      console.error('EmailJS Error:', error);
    });
});