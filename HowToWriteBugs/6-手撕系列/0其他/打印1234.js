/**
 * 常规写法, i 为全局变量
 */
for (var i = 1; i < 5; i++) {
    setTimeout(() => {
        console.log(i) // 5 5 5 5 5
    }, i * 1000);
}

/**
 * 使用 let 实现局部变量
 */
for (let i = 1; i < 5; i++) {
    setTimeout(() => {
        console.log(i) // 1 2 3 4
    }, i * 1000);
}

/**
 * 利用闭包
 */
for (var i = 1; i < 5; i++) {
    (function(i) {
        setTimeout(() => {
            console.log(i) // 1 2 3 4
        }, i * 1000);
    })(i)
}

for (var i = 1; i < 5; i++) {
    setTimeout((i) => {
        console.log(i) // 1 2 3 4
    }, i * 1000, i);
}
