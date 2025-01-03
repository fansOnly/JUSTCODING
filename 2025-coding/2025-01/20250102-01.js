/**
 * 利用 repeat 实现进度条加载效果
 */
function createProgressBar(percent = 0, length = 50) {
  const success = Math.floor((percent / 100) * length);
  const loading = "■".repeat(success) + "□".repeat(length - success);
  console.log(`[${loading}] ${percent}%`);
}

function loading() {
  let i = 0;
  let timer = setInterval(() => {
    i += Math.floor(Math.random() * 10) + 1;
    i = Math.min(i, 100);
    createProgressBar(i);
    if (i >= 100) {
      clearInterval(timer);
    }
  }, 100);
}

loading()