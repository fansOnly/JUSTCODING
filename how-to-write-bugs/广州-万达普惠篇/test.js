
// 防抖- 一定时间内的多次操作只会执行最后一次行为触发, 只执行一次
function debounce(fn, wait = 500) {
    let timeout = null;
    return function() {
        let context = this
        let args = arguments
        if (timeout) clearTimeout(timeout);
        timeout = setTimeout(() => {
            fn.apply(context, args);
        }, wait)
    }
}



// 节流 - 一定的时间内的多次操作只会按照规定的频率执行, 会执行多次
function throttle(fn, wait = 500) {
    let timeout = null;
    return function() {
        let context = this;
        let args = arguments;
        if (!timeout) {
            timeout = setTimeout(() => {
                timeout = null;
                fn.apply(context, args);
            }, wait);
        }
    }
}