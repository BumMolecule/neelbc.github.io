/* =========================================================
   main.js — site-wide behaviour
   Runs after include.js has injected partials (see initSite).
   ========================================================= */

function startClock() {
  const el = document.getElementById("clock");
  if (!el) return;
  const opts = {
    timeZone: "Asia/Kolkata",
    hour: "2-digit", minute: "2-digit", second: "2-digit",
    weekday: "short", year: "numeric", month: "short", day: "numeric"
  };
  const tick = () => { el.textContent = new Date().toLocaleString("en-IN", opts); };
  tick();
  setInterval(tick, 1000);
}

function startTyping() {
  const typed = document.getElementById("typed");
  if (!typed) return;
  const words = [
    { text: "Data Science",       class: "word-ds" },
    { text: "Cheminformatics",    class: "word-chem" },
    { text: "Machine Learning",   class: "word-ml" },
    { text: "Manchester United",  class: "word-mu" },
    { text: "Quizzing",           class: "word-quiz" }
  ];
  let i = 0;
  setInterval(() => {
    typed.style.opacity = 0;
    setTimeout(() => {
      i = (i + 1) % words.length;
      typed.textContent = words[i].text;
      typed.className = words[i].class;
      typed.style.opacity = 1;
    }, 500);
  }, 2500);
}

function initTheme() {
  const KEY = "nb-theme";
  const saved = localStorage.getItem(KEY);
  const prefersLight = window.matchMedia("(prefers-color-scheme: light)").matches;
  const isLight = saved === "light" || (!saved && prefersLight);
  if (isLight) document.body.classList.add("light");

  const btn = document.getElementById("theme-toggle");
  if (!btn) return;

  function syncIcon() {
    btn.textContent = document.body.classList.contains("light") ? "☀️" : "💡";
  }
  syncIcon();

  btn.addEventListener("click", () => {
    const goingLight = !document.body.classList.contains("light");
    btn.classList.remove("shatter", "flicker");
    void btn.offsetWidth;
    btn.classList.add(goingLight ? "shatter" : "flicker");
    document.body.classList.toggle("light");
    syncIcon();
    localStorage.setItem(KEY, goingLight ? "light" : "dark");
  });
}

function markActiveNav() {
  const path = (location.pathname.split("/").pop() || "index.html").toLowerCase();
  const map = {
    "": "home", "index.html": "home",
    "blogs.html": "blogs",
    "buzzing.html": "buzzing",
    "contact.html": "contact"
  };
  const key = map[path];
  if (!key) return;
  const link = document.querySelector(`nav a[data-nav="${key}"]`);
  if (link) link.classList.add("active");
}

function fillYear() {
  const y = document.getElementById("year");
  if (y) y.textContent = new Date().getFullYear();
}

function initReveal() {
  const items = document.querySelectorAll(".reveal");
  if (!items.length || !("IntersectionObserver" in window)) {
    items.forEach(el => el.classList.add("is-visible"));
    return;
  }
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add("is-visible");
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.12 });
  items.forEach(el => io.observe(el));
}

// Called by include.js once partials are in the DOM.
window.initSite = function initSite() {
  startClock();
  startTyping();
  initTheme();
  markActiveNav();
  fillYear();
  initReveal();
};
