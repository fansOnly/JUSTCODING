/**
 * 模拟 settimeout
 */
function settimeoutLike(cb, delay = 0) {
  const start = +new Date();
  loop();

  function loop() {
    const now = +new Date()
    if (now - start >= delay) {
      typeof cb === 'function' && cb();
      return;
    }
    window.requestAnimationFrame(loop);
  }
}

function log() {
  console.log('hhhhhhh')
}

settimeoutLike(log, 2000)