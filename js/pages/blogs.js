/* =========================================================
   blogs.js — filter tabs for the tech resource grid
   ========================================================= */

(function initBlogFilters() {
  const tabs  = document.querySelectorAll(".filter-tab");
  const cards = document.querySelectorAll(".resource-card[data-type]");
  if (!tabs.length) return;

  tabs.forEach(tab => {
    tab.addEventListener("click", () => {
      tabs.forEach(t => t.classList.remove("active"));
      tab.classList.add("active");
      const filter = tab.dataset.filter;
      cards.forEach(card => {
        card.classList.toggle("hidden", !(filter === "all" || card.dataset.type === filter));
      });
    });
  });
})();
