// 1) 進場淡入：IntersectionObserver
const revealEls = document.querySelectorAll(".reveal");

const io = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) e.target.classList.add("is-visible");
    });
  },
  { threshold: 0.15 },
);

revealEls.forEach((el) => io.observe(el));

// 2) 「再給我一句」：換一句溫柔句子（可擴充）
const lines = [
  "你已經做得夠好了，先停一下也沒關係。",
  "就算今天很亂，你也仍然值得被好好對待。",
  "不用急著解決，先讓自己被接住。",
  "把肩膀放下來一點點就好。",
  "你不需要贏，你只需要回到自己。",
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

/* ===========================
   One-page interactions
   1) Scroll Spy (nav highlight)
   2) Cards click -> smooth scroll + highlight
   =========================== */

// 找出所有有 id 的 section（當作 scroll spy 的目標）
const spySections = Array.from(document.querySelectorAll("main section[id]"));

// 找出所有指向 # 的 nav 連結
const navLinks = Array.from(document.querySelectorAll(".navlist a[href^='#']"));

function setActiveNav(id) {
  navLinks.forEach((a) => {
    const isActive = a.getAttribute("href") === `#${id}`;
    if (isActive) {
      a.setAttribute("aria-current", "page");
      a.classList.add("is-active");
    } else {
      a.removeAttribute("aria-current");
      a.classList.remove("is-active");
    }
  });
}

// Scroll Spy：用 IntersectionObserver 偵測「現在最主要的 section」
if (spySections.length && navLinks.length) {
  const spyObserver = new IntersectionObserver(
    (entries) => {
      // 找出目前最「在畫面中」的 section
      const visible = entries
        .filter((e) => e.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

      if (visible?.target?.id) {
        setActiveNav(visible.target.id);
      }
    },
    {
      // 讓 section 進到畫面中間左右更容易被判定為 active
      root: null,
      threshold: [0.15, 0.25, 0.4, 0.6],
      rootMargin: "-35% 0px -55% 0px",
    },
  );

  spySections.forEach((sec) => spyObserver.observe(sec));
}

// Smooth scroll + highlight helper
function scrollToSection(id) {
  const target = document.getElementById(id);
  if (!target) return;

  target.scrollIntoView({ behavior: "smooth", block: "start" });

  // 短暫 highlight 一下，讓人知道「你到這裡了」
  target.classList.remove("section-highlight");
  // 觸發 reflow，確保重複點擊也會重新播放動畫
  void target.offsetWidth;
  target.classList.add("section-highlight");

  // 同步 nav
  setActiveNav(id);
}

// 點 Rooms 的三張卡：如果 href="#xxx" 就滑到 section
document.querySelectorAll(".cards a.card[href^='#']").forEach((card) => {
  card.addEventListener("click", (e) => {
    const href = card.getAttribute("href");
    if (!href) return;
    const id = href.replace("#", "");
    if (!id) return;

    e.preventDefault();
    scrollToSection(id);
  });
});

// 點 nav 也做同樣處理（可選：讓 highlight 更一致）
navLinks.forEach((a) => {
  a.addEventListener("click", (e) => {
    const href = a.getAttribute("href");
    if (!href) return;
    const id = href.replace("#", "");
    if (!id) return;

    // 讓 scroll-behavior: smooth 仍生效，但我們加 highlight + 同步狀態
    e.preventDefault();
    scrollToSection(id);
  });
});

// ===== 星塵軌跡功能 (新增) =====
document.addEventListener("mousemove", (e) => {
  // 建立一個星塵元素
  const star = document.createElement("div");
  star.className = "star-trail";

  // 設定星塵產生的位置 (加上一點點隨機偏移，讓軌跡更自然)
  const x = e.pageX + (Math.random() - 0.5) * 10;
  const y = e.pageY + (Math.random() - 0.5) * 10;

  star.style.left = `${x}px`;
  star.style.top = `${y}px`;

  // 將星塵加入到頁面中
  document.body.appendChild(star);

  // 當動畫結束後，將元素移除以節省效能
  setTimeout(() => {
    star.remove();
  }, 1200);
});
