const socialData = {
  first_chat: {
    label: "第一次聊天",
    gentle: [
      "嗨，注意到你也喜歡...，想說來打個招呼。",
      "你好，剛才聽你提到...覺得很有趣，想多了解一點。",
    ],
    humorous: [
      "我剛才在心裡練不介意的話，想跟習了五次怎麼跟你打招呼，這是第六次，哈囉！",
      "如果我說我是來跟你討論天氣的，你會覺得我很老派嗎？",
    ],
    boundary: [
      "你好，如果你簡單聊聊剛才的主題。",
      "嗨，現在方便稍微聊一下嗎？",
    ],
  },
  cold_reply: {
    label: "對方冷回",
    gentle: [
      "看來你現在可能有點累，那我們下次再聊，好好休息喔。",
      "沒關係，每個人都有想安靜的時候，祝你有個美好的一天。",
    ],
    humorous: [
      "我的話題看來遇到寒流了！那我先退回溫暖的被窩囉。",
      "看來我的幽默感今天休假了，我們先暫停在這裡吧！",
    ],
    boundary: [
      "感覺你現在不太方便說話，那我就先不打擾了。",
      "好的，等你有空或想聊的時候再找我。",
    ],
  },
};

let currentContext = "first_chat";

function updateReplies() {
  const data = socialData[currentContext];
  document.getElementById("gentle-text").textContent =
    data.gentle[Math.floor(Math.random() * data.gentle.length)];
  document.getElementById("humorous-text").textContent =
    data.humorous[Math.floor(Math.random() * data.humorous.length)];
}

// 動態生成分頁標籤
const tabContainer = document.getElementById("context-tabs");
Object.keys(socialData).forEach((key) => {
  const btn = document.createElement("button");
  btn.className = "tab-btn";
  btn.textContent = socialData[key].label;
  btn.onclick = () => {
    document
      .querySelectorAll(".tab-btn")
      .forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    currentContext = key;
    updateReplies();
  };
  tabContainer.appendChild(btn);
});

document.getElementById("refresh-btn").onclick = updateReplies;
document.getElementById("save-btn").onclick = () => {
  const favorites = JSON.parse(localStorage.getItem("favReplies") || "[]");
  favorites.push({
    context: currentContext,
    gentle: document.getElementById("gentle-text").textContent,
  });
  localStorage.setItem("favReplies", JSON.stringify(favorites));
  alert("已收藏到 localStorage！"); // 呼應技術重點 [cite: 34]
};
