

const sum = (a, b, c, d) => {
    return a + b + c + d
}

const sum3 = (...args) => {
    return args.reduce((a, b) => a + b, 0)
}

console.log(sum.length, sum3.length)


// es5 柯里化
const curry5 = function(fn, args) {
    args = args || []
    return function() {
        const args2 = Array.prototype.slice.call(arguments)
        const _args = args.concat(args2)
        if (_args.length < fn.length) {
            return curry5.call(this, fn, _args)
        }
        return fn.apply(this, _args)
    }
}

const curry5Sum = curry5(sum)

console.log(curry5Sum(1, 2, 3, 4))

console.log(curry5Sum(1)(2)(3)(4))


// es6 柯里化
const curry = (fn, ...args) => {
    return (...args2) => {
        const _args = [...args, ...args2]
        if (_args.length < fn.length) {
            return curry(fn, ..._args)
        }
        return fn(..._args)
    }
}

const currySum = curry(sum, 10)

console.log(currySum(1,2,3,4))

console.log(currySum(1)(2)(3))

console.log(currySum(1)(2)(3))


// 柯里化 变异版
const sum2 = (a, b, c, d, ...args) => {
    return [a, b, c, d, ...args].reduce((a, b) => a + b, 0)
}

console.log(sum2(1, 2, 3, 4), sum2.length)

console.log(curry(sum2, 1)(2, 3, 4))

console.log(curry(sum2)(1, 2, 3, 4, 5))

console.log(curry(sum2, 10)(1)(2)(3, 4))


console.log(curry5(sum2)(1)(2)(3)(4, 10))