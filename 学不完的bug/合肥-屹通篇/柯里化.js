// 关于柯里化, 你想要的都在这里

// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// 进阶版
const curry = function (fn) {
    const length = fn.length; // 获取参数个数
    const args = Array.prototype.slice.call(arguments, 1);
    return function () {
        const restArgs = Array.prototype.slice.call(arguments);
        const newArgs = args.concat(restArgs);
        if (newArgs.length < length) {
            return curry.call(this, fn, ...newArgs);
        } else {
            return fn.apply(this, newArgs);
        }
    }
}

var abc = (a, b, c, ...args) => {
    return [a, b, c, ...args];
};

console.log(curry(abc)(3)(4,1))  // [ 3, 4, 1 ]
console.log(curry(abc, 3)(1)(2,3,4,5,6))  // [ 3, 1, 2, 3, 4, 5, 6 ]



// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// 参数变异版
const curry2 = function (fn) {
    const length = fn.length;
    const args = Array.prototype.slice.call(arguments, 1);
    return function () {
        const restArgs = Array.prototype.slice.call(arguments);
        const newArgs = args.concat(restArgs);
        if (newArgs.length < length && restArgs.length) {
            return curry2.call(this, fn, ...newArgs);
        } else {
            return fn.apply(this, newArgs);
        }
    }
}

console.log(curry2(abc)(3)())  // [ 3, undefined, undefined ]
console.log(curry(abc, 3)(1)(2,3,4,5,6))  // [ 3, 1, 2, 3, 4, 5, 6 ]



// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// 初级简写版
const curry3 = (fn, ...args) => {
    return (...args2) => {
        return fn.apply(this, [...args, ...args2])
    }
}

console.log(curry3(abc, 1, 2, 3)(2))
console.log(curry3(abc, 1, 2, 3)(2, 5, 6, 7))



// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// 面试版
const curry4 = function(func) {
    const args = [].slice.call(arguments, 1);
    return function _func() {
        if (arguments.length === 0) {
            return func.apply(this, args);
        }
        // [].push.apply(args, arguments);
        args.push(...arguments)
        return _func
    }
}

var add = function() {
    return [].reduce.call(arguments, (a, b) => a + b)
}

console.log(curry4(add, 1)(2)(3)(4,5,6,)()) // 21
