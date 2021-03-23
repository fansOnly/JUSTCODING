
/**
 * 利用Proxy设置过期不可访问
 * @param {*} target 
 * @param {*} ttl 
 */
const ephemeral = (target, ttl = 10) => {
    const CREATED_AT = Date.now()
    const expired = () => Date.now() - CREATED_AT > ttl * 1000
    return new Proxy(target, {
        get(obj, prop) {
            return expired() ? undefined : Reflect.get(obj, prop)
        }
    })
}

const bankCount = {
    name: 'lili',
    balance: 100000
}

const bankUser = ephemeral(bankCount, 5)

console.log(bankUser.balance) // 100000

setTimeout(() => {
    console.log(bankUser.balance) // undefined
}, 5 * 1000);



const range = (min, max) => {
    return new Proxy(Object.create(null), {
        has(_, prop) {
            return +prop >= min && +prop <= max
        }
    })
}

const X = 10.5
const nums = [1,5,X,20,50]
const res = nums.filter(n => n in range(1, 10))
console.log(res) // [1, 5]



// ====================================================================================================================
// ====================================================函数式编程=======================================================
// ====================================================================================================================


// 函数组合
function compose(f, g) {
    return function() {
        return f.call(this, g.apply(this, arguments))
    }
}

function toLocaleUpperCase(str) {
    return str.toLocaleUpperCase()
}

function toSign(str) {
    return str + ' !'
}

const transforStr = compose(toLocaleUpperCase, toSign)
console.log(transforStr('hello')) // HELLO !




// 柯里化
function curry(fn, ...args) {
    const { length } = fn
    return function(...rest) {
        const allArgs = [...args, ...rest]
        return allArgs.length < length ? curry.call(null, fn, ...allArgs) : fn.apply(this, allArgs)
    }
}

function add(a, b, c, d) {
    return a + b+ c+ d
}

const sum = curry(add)

console.log(sum(1)(2)(3)(4)) // 10



// 便函数
function isTypeX(type) {
    return function (obj) {
        return Object.prototype.toString.call(obj) === `[object ${type}]`
    }
}

const isObject = isTypeX('Object')
const isArray = isTypeX('Array')

console.log(isObject({})) // true
console.log(isArray([])) // truej


// 高阶函数
// function withBackgroundRedColor(wrapedComponent) {
//     return class extends Component {
//         render() {
//             return (<div style="{backgroundColor: 'red'}">
//                 <wrapedComponent {...this.props} />
//             </div>)
//         }
//     }
// }

/**
 * 斐波那契数列 - 普通递归，会爆栈
 * @param {*} n 
 */
function fibonacci(n) {
    if (n === 0) return 0
    if (n === 1) return 1
    return fibonacci(n - 1) + fibonacci(n - 2)
}
// console.log(fibonacci(10)) // 55

/**
 * 斐波那契 - 尾递归优化
 * @param {*} n 
 * @param {*} val 
 * @param {*} pre 
 */
function fibonacci2(n, val = 0, prev = 1) {
    if (n === 0) return val
    return fibonacci2(n - 1, prev, val + prev)
}

// console.log(fibonacci2(10)) // 55
