/* =========================================================
   projects.js — renders data/projects.json into #projects-grid
   ========================================================= */

(async function renderProjects() {
  const grid = document.getElementById("projects-grid");
  if (!grid) return;
  try {
    const res = await fetch("data/projects.json");
    const projects = await res.json();
    grid.innerHTML = projects.map(p => `
      <a class="project-card reveal" href="${p.link}" target="_blank" rel="noopener">
        <h3>${p.title}</h3>
        <p>${p.blurb}</p>
        <div class="tags">
          ${(p.tags || []).map(t => `<span class="tag">${t}</span>`).join("")}
        </div>
      </a>
    `).join("");

    // Re-run reveal observer if main.js already initialised
    document.querySelectorAll("#projects-grid .reveal").forEach(el => {
      if (!("IntersectionObserver" in window)) { el.classList.add("is-visible"); return; }
      new IntersectionObserver((entries, obs) => {
        entries.forEach(e => {
          if (e.isIntersecting) { e.target.classList.add("is-visible"); obs.unobserve(e.target); }
        });
      }, { threshold: 0.12 }).observe(el);
    });
  } catch (err) {
    console.error("[projects]", err);
    grid.innerHTML = `<p style="color: var(--muted);">Projects list unavailable.</p>`;
  }
})();
