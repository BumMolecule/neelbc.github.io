/* =========================================================
   include.js — fetches partials into [data-include] slots.
   After all partials load, calls window.initSite() and
   dispatches "partials:loaded" on document.
   ========================================================= */

(async function includePartials() {
  const slots = document.querySelectorAll("[data-include]");
  await Promise.all([...slots].map(async (slot) => {
    const url = slot.getAttribute("data-include");
    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error(`${res.status} ${url}`);
      slot.outerHTML = await res.text();
    } catch (err) {
      console.error("[include]", err);
      slot.innerHTML = `<!-- failed to load ${url} -->`;
    }
  }));

  if (typeof window.initSite === "function") window.initSite();
  document.dispatchEvent(new CustomEvent("partials:loaded"));
})();
