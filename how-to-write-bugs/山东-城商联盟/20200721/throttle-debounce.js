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




export const desensitizeName = (value, char = '*') => {
    return String(value).replace(/^([\u4e00-\u9fa5])([\u4e00-\u9fa5]*)([\u4e00-\u9fa5])$/, function (_, p1, p2, p3) {
        console.log('_', _);
        console.log('p1', p1);
        console.log('p2', p2);
        console.log('p3', p3);
      return p2 ? p1 + char.repeat(p2.length) + p3 : '*' + p3
    })
  }



  console.log(desensitizeName('测试'))
