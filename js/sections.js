(function() {
  const content = document.getElementById('content');

  // Sections mapping
  const sections = {
    about: 'sections/about.html',
    tech: 'sections/tech.html',
    projects: 'sections/projects.html',
    contact: 'sections/contact.html'
  };

  // Load a CSS file dynamically
  function loadSectionCSS(cssPath) {
    // Remove previous section CSS
    document.querySelectorAll('link[data-section]').forEach(link => link.remove());

    // Add new CSS
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = cssPath;
    link.setAttribute('data-section', 'true');
    document.head.appendChild(link);
  }

  // Load a section dynamically
  async function loadSection(sectionId) {
    if (!sections[sectionId]) return;

    try {
      // Load section HTML
      const response = await fetch(sections[sectionId]);
      const html = await response.text();
      content.innerHTML = html;

      // Load section CSS dynamically
      loadSectionCSS(`css/${sectionId}.css`);

      // Re-initialize animations after loading new content
      if (window.initScrollAnimations) window.initScrollAnimations();

      // Initialize projects if on projects section
      if (sectionId === 'projects' && window.initProjects) window.initProjects();
    } catch (err) {
      console.error(`Failed to load section "${sectionId}":`, err);
      content.innerHTML = '<p class="text-red">Failed to load content.</p>';
    }
  }

  // Navbar links for dynamic loading
  const navLinks = document.querySelectorAll('.nav-link');
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const target = link.getAttribute('href').replace('#', '');
      loadSection(target);
    });
  });

  // Load default section on page load
  window.addEventListener('DOMContentLoaded', () => loadSection('about'));

  // Expose loadSection globally if needed elsewhere
  window.loadSection = loadSection;
})();
