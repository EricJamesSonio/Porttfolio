// ========================
// MAIN.JS
// Smooth Dark Mode + Scroll Animations
// ========================

document.addEventListener("DOMContentLoaded", () => {
  const themeToggle = document.getElementById("themeToggle");

  // ===== DARK MODE SETUP =====
  if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark");
  }

  document.body.classList.add("transition-enabled");

  if (themeToggle) {
    themeToggle.textContent = document.body.classList.contains("dark") ? "☀️" : "🌙";

    themeToggle.addEventListener("click", () => {
      document.body.classList.toggle("dark");
      themeToggle.textContent = document.body.classList.contains("dark") ? "☀️" : "🌙";
      localStorage.setItem("theme", document.body.classList.contains("dark") ? "dark" : "light");
    });
  }

  // ===== SCROLL ANIMATIONS =====
  const animated = document.querySelectorAll(".fade-in, .slide-left, .slide-right");

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.2 }
  );

  animated.forEach(el => observer.observe(el));
});

// =============================
// FIX NAVBAR OVERLAPPING CONTENT
// =============================

function adjustBodyPadding() {
  const nav = document.querySelector('.navbar');
  if (nav) {
    document.body.style.paddingTop = nav.offsetHeight + "px";
  }
}

window.addEventListener("load", adjustBodyPadding);
window.addEventListener("resize", adjustBodyPadding);
