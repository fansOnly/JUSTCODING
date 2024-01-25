/**
 * 修正 settimeout 的时间差
 */
function setInterval(cb, delay = 0) {
  let count = 1
  const start = +new Date()

  function loop() {
    const real = count * delay
    const ideal = +new Date() - start
    count++

    const diff = ideal - real

    typeof cb === 'function' && cb();
    window.setTimeout(loop, delay - diff);
  }
  window.setTimeout(loop, delay);
}

function log() {
  console.log('hhhhh')
}
setInterval(log, 500)