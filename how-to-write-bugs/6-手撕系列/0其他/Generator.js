/**
 * 生成器 - 迭代器的具体实现方式
 * 生成器函数提供了一个强大的选择：它允许你定义一个包含自有迭代算法的函数，同时它可以自动维护自己的状态。
 * 生成器函数使用 function*语法编写。
 * 最初调用时，生成器函数不执行任何代码，而是返回一种称为Generator的迭代器。
 * 通过调用生成器的下一个方法消耗值时，Generator函数将执行，直到遇到yield关键字。
 */
function* generateArr (start = 0, max, step = 1) {
    for (let i = start; i < max; i += step) {
        yield i;
    }
}

const f1 = generateArr(0, 5, 2)

console.log(f1.next())
console.log(f1.next())
console.log(f1.next())
console.log(f1.next())


/**
 * 高级生成器
 * ex. 斐波那契数列生成器
 */
function* fibonacci() {
    let fn1 = 0, fn2 = 1
    while(true) {
        let current = fn1
        fn1 = fn2
        fn2 = current + fn1
        var reset = yield current
        if (reset) {
            fn1 = 0
            fn2 = 1
        }
    }
}

const sequeue = fibonacci()
console.log(sequeue.next().value)
console.log(sequeue.next().value)
console.log(sequeue.next().value)
console.log(sequeue.next().value)
console.log(sequeue.next().value)
console.log(sequeue.next().value)
console.log(sequeue.next().value)
console.log(sequeue.next(true).value)
