/* ===== IST CLOCK ===== */
function updateClock() {
  const now = new Date();
  const options = {
    timeZone: "Asia/Kolkata",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric"
  };
  document.getElementById("clock").textContent =
    now.toLocaleString("en-IN", options);
}
setInterval(updateClock, 1000);
updateClock();

/* ===== TYPING WORD ROTATION ===== */
const words = [
  { text: "Data Science", class: "word-ds" },
  { text: "Cheminformatics", class: "word-chem" },
  { text: "Machine Learning", class: "word-ml" },
  { text: "Manchester United", class: "word-mu" },
  { text: "Quizzing", class: "word-quiz" }
];

let index = 0;
const typed = document.getElementById("typed");

setInterval(() => {
  typed.style.opacity = 0;

  setTimeout(() => {
    index = (index + 1) % words.length;
    typed.textContent = words[index].text;
    typed.className = words[index].class;
    typed.style.opacity = 1;
  }, 500);
}, 2500);

/* ===== THEME TOGGLE (future-ready) ===== */
document.getElementById("theme-toggle").addEventListener("click", () => {
  document.body.classList.toggle("light");
});

