/**
 * 防抖函数
 * 触发后 n 秒内只执行一次，再次触发，会重新计算时间
 * 适用于输入框输入，表单验证，窗口缩放等场景
 */
function debounce(fn, wait = 500, immediate = false) {
    let timer = null
    return function() {
        if (timer) clearTimeout(timer)
        if (immediate) {
            fn.apply(this, arguments)
        }
        timer = setTimeout(() => {
            fn.apply(this, arguments)
        }, wait);
    }
}




/**
 * 节流函数
 * 触发后 n 秒内只会执行一次
 * 适用于按钮不断点击，拖拽事件，鼠标移动事件(mousemove)浏览器的滚动事件等场景
 */
function throtte(fn, wait = 500) {
    let timer = null
    return function() {
        if (!timer) {
            timer = setTimeout(() => {
                fn.apply(this, arguments)
                timer = null
            }, wait);
        }
    }
}


function throtte2(fn, wait = 500) {
    let timer = null
    let last = null
    return function() {
        const now = +new Date()
        if (!last) last = now
        if (now - last >= wait) {
            fn.apply(this, arguments)
            last = now
        } else {
            clearTimeout(timer)
            timer = setTimeout(() => {
                fn.apply(this, arguments)
            }, wait);
        }
    }
}
