// 防抖 - 规定时间内的多次操作只执行一次
function debounce(fn, wait = 500) {
    let timer = null
    return function () {
        if (timer) clearTimeout(timer)
        timer = setTimeout(() => {
            fn.apply(this, arguments)
        }, wait)
    }
}


// 节流 - 规定时间内的多次操作按照一定的时间间隔执行多次
function throttle(fn, wait = 500) {
    let timer = null
    return function () {
        if (!timer) {
            timer = setTimeout(() => {
                timer = null
                fn.apply(this, arguments)
            }, wait)
        }
    }
}
