// 1) 進場淡入：IntersectionObserver
const revealEls = document.querySelectorAll(".reveal");

const io = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) e.target.classList.add("is-visible");
    });
  },
  { threshold: 0.15 }
);

revealEls.forEach((el) => io.observe(el));

// 2) 「再給我一句」：換一句溫柔句子（可擴充）
const lines = [
  "你已經做得夠好了，先停一下也沒關係。",
  "就算今天很亂，你也仍然值得被好好對待。",
  "不用急著解決，先讓自己被接住。",
  "把肩膀放下來一點點就好。",
  "你不需要贏，你只需要回到自己。"
];

const newLineBtn = document.getElementById("new-line-btn");
const calmCardText = document.querySelector("#calm-card .feature-text");

if (newLineBtn && calmCardText) {
  newLineBtn.addEventListener("click", () => {
    const pick = lines[Math.floor(Math.random() * lines.length)];
    calmCardText.textContent = pick;
  });
}

// 3) 「專屬梳理空間」：展開/收合
const toggleBtn = document.getElementById("toggle-space-btn");
const moreBlock = document.getElementById("space-more");

if (toggleBtn && moreBlock) {
  toggleBtn.addEventListener("click", () => {
    const expanded = toggleBtn.getAttribute("aria-expanded") === "true";
    toggleBtn.setAttribute("aria-expanded", String(!expanded));
    toggleBtn.textContent = expanded ? "展開" : "收合";
    moreBlock.hidden = expanded;
  });
}
