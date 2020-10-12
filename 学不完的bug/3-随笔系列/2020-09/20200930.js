function fn(flag) {
    if (flag) {
        function getValue() {
            return 'a'
        }
    } else {
        function getValue() {
            return 'b'
        }
    }
    return getValue()
}

console.log(fn(true)) // a
console.log(fn(false)) // b



// ******************************************************************************
function fn2(start, end) {
    console.log(start++) // 100
    const timer = setInterval(() => {
        if (start < end) {
            console.log(start++) // 101, 102, 103, 104
        } else {
            clearInterval(timer)
        }
    }, 100)
    return {
        cancel() {
            clearInterval(timer)
        }
    }
}


var res = fn2(100, 110)

setTimeout(() => {
    res.cancel()
}, 500);


// ******************************************************************************
function fizzBuzz(num) {
    if (num === '' || typeof num !== 'number') return false
    if (num % 15 === 0) {
        return 'fizzBuzz'
    } else if (num % 3 === 0) {
        return 'fizz'
    } else if (num % 5 === 0) {
        return 'buzz'
    } else {
        return num
    }
}

console.log(fizzBuzz(30))  // fizzBuzz
console.log(fizzBuzz(9)) // fizz
console.log(fizzBuzz(10)) // buzz
console.log(fizzBuzz(113)) // 113



// ******************************************************************************
function fn3(str) {
    return function(obj) {
        return str + ', ' + obj
    }
} 

console.log(fn3('hello')('world')) // hello, world



// ******************************************************************************
function makeClosures(arr, fn) {
    let result = []
    arr.map(v => {
        result.push(() => {return fn(v)})
    })
    return result
}

console.log(makeClosures([1, 2, 3], function (x) { return x * x })) // [function, function, function]


// ******************************************************************************
const sum = (a = 0, b = 0, c = 0) => {
    return a + b + c
}

function partial(fn, str1, str2) {
    return function(str3) {
        return fn(str1, str2, str3)
    }
}

console.log(partial(sum, 1, 2)(3)) // 6
console.log(sum(1,2,3)) // 6


// ******************************************************************************
function useArguments() {
    let sum = 0
    for (let i = 0; i < arguments.length; i++){
        sum += arguments[i]
    }
    return sum
}

console.log(useArguments(1,2,3,4)) // 10

function useArguments2() {
    return Array.prototype.reduce.call(arguments, (sum, val) => sum + val, 0)
}

console.log(useArguments2(1,2,3,4)) // 10



// ******************************************************************************
function callIt() {
    const fn = Array.prototype.shift.call(arguments)
    return fn.apply(this, [].slice.call(arguments, 1))
}

console.log(callIt(sum, 1, 2)) // 2



// ******************************************************************************
function curryIt(fn) {
    var args = [].slice.call(arguments, 1)
    return function(...args2) {
        const newArgs = [...args, ...args2]
        if (fn.length > newArgs.length) {
            return curryIt.call(this, fn, ...newArgs)
        } else {
            return fn.apply(this, newArgs)
        }
    }
}

function add(a, b,c) {
    return a + b+ c
}

console.log(curryIt(add)(1)(2)(3)) // 6



// ******************************************************************************
function createModule(str1, str2) {
    return {
        greeting: str1,
        name: str2,
        sayIt() {
            return this.greeting + ',' + this.name
        }
    }
}


// ******************************************************************************
function transforNum(num, bit) {
    const res = num.toString(2)
    return res[res.length - bit]
}

console.log(transforNum(128, 8)) // 1



// ******************************************************************************
function multiply(a, b) {
    return (a * b * 1e10) / 1e10
}

function multiply2(a, b) {
    const str1 = a.toString()
    const str2 = b.toString()
    const len1 = str1.indexOf('.') > 0 ? (str1.length - str1.indexOf('.') - 1) : 0
    const len2 = str2.indexOf('.') > 0 ? (str2.length - str2.indexOf('.') - 1) : 0
    const len = Math.max(len1, len2)
    return (a * b).toFixed(len)
}

console.log(3 * 0.0001) // 0.00030000000000000003
console.log(multiply(3, 0.0001)) // 0.00030000000000000003
console.log(multiply2(3, 0.0001)) // 0.0003


console.log(parseInt('111sss')) // 111
console.log(parseInt('a1111')) // NaN
console.log(Number('1111aaa')) // NaN



// ******************************************************************************
var C = function() {
    this.foo = 'bar'
    this.baz = 'bim'
}
C.prototype.bop = 'bip'

function iterate(obj) {
    let res = []
    for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
            res.push(`${key}: ${obj[key]}`)
        }
    }
    return res
}
console.log(iterate(new C())) // [ 'foo: bar', 'baz: bim' ]


function iterate2(obj) {
    return Object.getOwnPropertyNames(obj).reduce((acc, cur) => [...acc, `${cur}: ${obj[cur]}`], [])
}
console.log(iterate2(new C()))  // [ 'foo: bar', 'baz: bim' ]



// ******************************************************************************
function containsNumber(str) {
    return /\d/g.test(str)
}

console.log(containsNumber('ab1ca')) // true


// ******************************************************************************
function containsRepeatLetter(str) {
    return /([a-zA-Z])\1/.test(str)
}

console.log(containsRepeatLetter('rattler')) // true



// ******************************************************************************
function endsWithVowel(str) {
    return /[a,e,i,o,u]$/i.test(str)
}

console.log(endsWithVowel('gorilla')) // true



// ******************************************************************************
function captureThreeNumbers(str) {
    const arr = str.match(/\d{3}/)
    return arr ? arr[0] : false
}

console.log(captureThreeNumbers('a132s415')) // 132



// ******************************************************************************
function matchesPattern(str) {
    return /^(\w{3}\-){2}\w{4}$/.test(str)
    // return /^\w{3}\-\w{3}\-\w{4}$/.test(str)
}

console.log(matchesPattern('111-222-2333'))  // true



// ******************************************************************************
// 判断是否符合 USD 格式
function isUSD(str) {
    return /^\$(\d{1,3})(\,\d{3})+(\.\w{2})?$/.test(str)
}

console.log(isUSD('$201,933,209.02')) // true
