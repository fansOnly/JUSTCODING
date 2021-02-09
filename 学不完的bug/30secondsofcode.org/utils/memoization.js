/**
 * javascript-memoization
 */
class MyObject {
    constructor(data) {
        this.data = data
        this.data[this.data.length - 2] = {
            value: 'not empty'
        }
    }
    firstNotEmpty() {
        return this.data.find(v => !!v.value)
    }
    firstNotEmptyItem() {
        if (!this.firstNotEmpty) {
            return this.data.find(v => !!v.value)
        }
        return this.firstNotEmpty
    }
}

const myobj = new MyObject(Array(2000).fill({value: null}))

let start = +new Date()
for (let i = 0; i < 100; i++) {
    myobj.firstNotEmpty()
    // myobj.firstNotEmptyItem()
}
let end = +new Date()
console.log(end - start)


/**
 * Proxy
 */
const memorize = fn => new Proxy(fn, {
    cache: new Map(),
    apply(target, thisArg, args) {
        const cacheKey = args.toString()
        return this.cache.get(cacheKey) || (this.cache.set(cacheKey, target.apply(thisArg, args)))
    }
})

const fibonacci = n => n <= 1 ? n : fibonacci(n-1) + fibonacci(n-2)
const memorizeFibonacci = memorize(fibonacci)

start = +new Date()
for (let i = 0; i < 100; i++) {
    // fibonacci(30)
    memorizeFibonacci(30)
}
end = +new Date()
console.log(end - start)
