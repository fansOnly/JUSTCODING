/**
 * 偏函数
 * 固定一个函数的一些参数，返回一个更简单的函数
 */
function partial(fn, ...args) {
    return function() {
        return fn.apply(this, [...args, ...arguments])
    }
}

// ex.1
const sum = (a, b, c) => a * (b + c)
const partialSum = partial(sum, 10)
console.log(partialSum(1, 2)) // 10 * (1 + 2) = 30

// ex.2
const user = {
    name: 'Lily',
    say(time, word) {
        return `[${time}:] ${word}, this is ${this.name}`
    }
}

user.say = partial(user.say, new Date())
console.log(user.say('Hello'))


/**
 * 柯里化
 * 将一个接收多个参数的函数转化为接收接受单个参数的函数的技术
 */
function curry(fn, ...args) {
    return function() {
        const allArgs = Array.prototype.concat.call(args, ...arguments)
        if (allArgs.length >= fn.length) {
            return fn.call(this, ...allArgs)
        } else {
            return curry.call(null, fn, ...allArgs)
        }
    }
}

const sum2 = (a, b, c) => a + b + c

const currySum = curry(sum2, 1)
console.log(currySum(2)(3)) // 6

const currySum2 = curry(sum2, 1, 2)
console.log(currySum2(3)) // 6

const currySum3 = curry(sum2, 1, 2, 3)
console.log(currySum3(4)) // 6
