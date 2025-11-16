// Load projects from JSON + Filter Logic
document.addEventListener("DOMContentLoaded", () => {
  const projectsGrid = document.getElementById("projectsGrid");
  const filterButtons = document.querySelectorAll(".filter-btn");

  let projectsData = [];

  // Fetch JSON
  fetch("../data/projects.json")
    .then(res => res.json())
    .then(data => {
      projectsData = data;
      renderProjects(data);
    })
    .catch(err => console.error("Failed to load projects.json", err));

  // Render Cards
  function renderProjects(list) {
    projectsGrid.innerHTML = "";

    list.forEach(project => {
      const card = document.createElement("div");
      card.classList.add("project-card");

      card.innerHTML = `
        <h3>${project.name}</h3>
        <p>${project.description}</p>
        <div class="project-tags">
          ${project.tags.map(t => `<span class="tag">${t}</span>`).join("")}
        </div>
      `;

      projectsGrid.appendChild(card);
    });
  }

  // Filter Clicks
  filterButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      document.querySelector(".filter-btn.active").classList.remove("active");
      btn.classList.add("active");

      const filter = btn.dataset.filter;

      if (filter === "all") renderProjects(projectsData);
      else {
        const filtered = projectsData.filter(p => p.category === filter);
        renderProjects(filtered);
      }
    });
  });
});
