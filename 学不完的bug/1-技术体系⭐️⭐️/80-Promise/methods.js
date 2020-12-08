/**
 * 所有的 promise 实例都resovle则返回存储所有resolve结果的数组，只要有一个reject则整个返回这个reject的结果
 */
Promise.prototype.all = function (promises) {
    return new Promise((resolve, reject) => {
        const { length } = promises
        let count = 0, values = []
        promises.forEach((p, i) => {
            p.then(val => {
                values[i] = val
                count++
                if (count === length) {
                    resolve(values)
                }
            }, reject)
        })
    })
}

/**
 * 返回第一个 promise 实例的执行结果
 */
Promise.prototype.race = function (promises) {
    return new Promise((resolve, reject) => {
        promises.forEach(p => {
            p.then(resolve, reject)
        })
    })
}

const p1 = Promise.resolve(1)
const p2 = Promise.resolve(2)
const p3 = Promise.reject(3)

Promise.all([p1, p2, p3]).then(res => {
    console.log(res)
}).catch(err => {
    console.log(err) // 3
})

Promise.race([p1, p2, p3]).then(res => {
    console.log(res) // 1
}).catch(err => {
    console.log(err)
})
