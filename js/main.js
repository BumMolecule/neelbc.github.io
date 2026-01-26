console.log("Website loaded");
const texts = [
  "data science",
  "machine learning",
  "cheminformatics",
  "scientific modeling",
  "AI-driven discovery"
];

let count = 0;
let index = 0;

(function type() {
  if (count === texts.length) count = 0;

  let currentText = texts[count];
  let letter = currentText.slice(0, ++index);

  document.getElementById("typed").textContent = letter;

  if (letter.length === currentText.length) {
    setTimeout(() => {
      index = 0;
      count++;
    }, 1500);
  }

  setTimeout(type, 100);
})();
const toggle = document.getElementById("theme-toggle");

toggle.onclick = () => {
  document.body.classList.toggle("light");
  toggle.textContent =
    document.body.classList.contains("light") ? "💡" : "🌙";
};
