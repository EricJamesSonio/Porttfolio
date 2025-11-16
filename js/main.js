// ========================
// MAIN.JS
// Smooth Dark Mode + Scroll Animations
// ========================

document.addEventListener("DOMContentLoaded", () => {
  const themeToggle = document.getElementById("themeToggle");

  // ===== DARK MODE SETUP =====
  // Apply dark mode before transitions to prevent flash
  if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark");
  }

  // Enable smooth transitions AFTER initial load
  document.body.classList.add("transition-enabled");

  // Update theme toggle icon
  if (themeToggle) {
    themeToggle.textContent = document.body.classList.contains("dark") ? "☀️" : "🌙";

    // Toggle dark mode on click
    themeToggle.addEventListener("click", () => {
      document.body.classList.toggle("dark");

      // Update button icon
      themeToggle.textContent = document.body.classList.contains("dark") ? "☀️" : "🌙";

      // Save preference to localStorage
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
