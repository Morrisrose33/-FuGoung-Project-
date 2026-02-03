const characterLines = [
  "我感受到了，那份沉重並不容易。",
  "在這裡你不需要變強，就這樣待著也可以。",
  "這不是你的錯，辛苦了。",
  "這份痛楚，我會在這裡陪你一起看著它。",
  "沒事的，已經沒事了。",
];

const input = document.getElementById("pain-input");
const replyEl = document.getElementById("character-reply");
const listEl = document.getElementById("history-list");

function typeWriter(text, element) {
  element.textContent = "";
  let i = 0;
  function type() {
    if (i < text.length) {
      element.textContent += text.charAt(i);
      i++;
      setTimeout(type, 100); // 打字機速度
    }
  }
  type();
}

function loadHistory() {
  const history = JSON.parse(localStorage.getItem("akazaHistory") || "[]");
  listEl.innerHTML = history
    .map((item) => `<div class="history-item">「${item}」</div>`)
    .join("");
}

input.addEventListener("keypress", (e) => {
  if (e.key === "Enter" && input.value.trim() !== "") {
    const userText = input.value;
    const reply =
      characterLines[Math.floor(Math.random() * characterLines.length)];

    typeWriter(reply, replyEl);

    // 儲存至 localStorage
    const history = JSON.parse(localStorage.getItem("akazaHistory") || "[]");
    history.unshift(userText);
    localStorage.setItem("akazaHistory", JSON.stringify(history.slice(0, 10)));

    input.value = "";
    setTimeout(loadHistory, 1000);
  }
});

loadHistory();
