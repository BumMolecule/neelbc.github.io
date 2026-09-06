/* =========================================================
   buzzing.js — multi-deck Google Slides gallery
   Reads data/slides.json, renders sidebar + single viewer.
   ========================================================= */

(async function renderBuzzing() {
  const list   = document.getElementById("deck-list");
  const viewer = document.getElementById("deck-viewer");
  if (!list || !viewer) return;

  let decks = [];
  try {
    const res = await fetch("data/slides.json");
    decks = await res.json();
  } catch (err) {
    console.error("[buzzing]", err);
    viewer.innerHTML = `<p style="color: var(--muted);">Could not load slides.</p>`;
    return;
  }

  if (!decks.length) {
    viewer.innerHTML = `<p style="color: var(--muted);">No decks yet. Add entries to <code>data/slides.json</code>.</p>`;
    return;
  }

  function show(i) {
    const d = decks[i];
    list.querySelectorAll(".deck-item").forEach((el, idx) =>
      el.classList.toggle("active", idx === i));
    viewer.innerHTML = `
      <h3>${d.title}</h3>
      <p class="deck-desc">${d.description || ""}</p>
      <div class="deck-frame">
        <iframe
          src="${d.embedUrl}"
          allowfullscreen
          mozallowfullscreen
          webkitallowfullscreen
          loading="lazy"></iframe>
      </div>
      <div class="deck-actions">
        <a href="${d.embedUrl}" target="_blank" rel="noopener">Open in new tab ↗</a>
      </div>
    `;
  }

  list.innerHTML = decks.map((d, i) => `
    <li class="deck-item"><button type="button" data-i="${i}">${d.title}</button></li>
  `).join("");

  list.addEventListener("click", (e) => {
    const btn = e.target.closest("button[data-i]");
    if (btn) show(Number(btn.dataset.i));
  });

  show(0);
})();
