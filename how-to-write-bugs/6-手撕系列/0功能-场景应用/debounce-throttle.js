/**
 * 防抖
 * 一定时间内只执行一次，再次触发会重新计时
 */
function debounce(fn, delay) {
    let timer = null
    return function() {
        if (timer) clearTimeout(timer)
        timer = setTimeout(() => {
            fn.call(this, arguments)
        }, delay)
    }
}


/**
 * 节流
 * 固定频率触发
 */
function throttle(fn, interval) {
    const last = 0
    return function() {
        const now = +new Date()
        if (now - last > interval) {
            fn.call(this, arguments)
            last = now
        }
    }
}

function throttle2(fn, interval) {
    let timer = null
    return function() {
        if (!timer) {
            timer = setTimeout(() => {
                fn.call(this, arguments)
                timer = null
            }, interval)
        }
    }
}
