/**
 * setTimeout 模拟实现 setInterval
 */
function myInterval(fn, time) {
    let timer
    function interval() {
        fn()
        timer = setTimeout(interval, time)
    }
    interval()
    return timer
}
let i = 0
// const n = myInterval(() => console.log(++i), 1000)
