/* =========================
   Home Station – Visit Memory
   ========================= */

(function () {
  const COUNT_KEY = "homeStationVisitCount";
  const DATE_KEY = "homeStationVisitDate";

  const today = new Date().toISOString().slice(0, 10);

  let savedDate = localStorage.getItem(DATE_KEY);
  let count = Number(localStorage.getItem(COUNT_KEY)) || 0;

  // 如果不是今天，重置
  if (savedDate !== today) {
    count = 0;
    localStorage.setItem(DATE_KEY, today);
  }

  // 本次進站 +1
  count += 1;
  localStorage.setItem(COUNT_KEY, count);

  // 等級判斷
  let level = 1;
  let message = "你開始照顧自己。";

  if (count >= 2 && count <= 5) {
    level = 2;
    message = "你正在開始整理自己。";
  } else if (count >= 6) {
    level = 3;
    message = "你已經開始克服一些困難。";
  }

  // 顯示文字
  const countEl = document.getElementById("visit-count");
  const messageEl = document.getElementById("visit-message");

  if (countEl && messageEl) {
    countEl.textContent = `這是你今天第 ${count} 次回來這個頁面`;
    messageEl.textContent = message;
  }
})();
