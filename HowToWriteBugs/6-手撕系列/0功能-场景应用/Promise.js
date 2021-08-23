/*
 * @Author: fansonly
 * @Date: 2021-02-01 20:45:29
 * @Description:
 * @LastEditTime: 2021-08-02 11:03:19
 */
class Promise {
    constructor(executor) {
        this.state = 'pending'
        this.value = ''
        this.reason = ''
        this.onFulfilledCallbacks = []
        this.onRejectedCallbacks = []

        const resolve = value => {
            if (this.state === 'pending') {
                this.state = 'fulfilled'
                this.value = value
                this.onFulfilledCallbacks.forEach(cb => cb())
            }
        }
        const reject = reason => {
            if (this.state === 'pending') {
                this.state = 'rejected'
                this.reason = reason
                this.onRejectedCallbacks.forEach(cb => cb())
            }
        }

        try {
            executor(resolve, reject)
        } catch (error) {
            reject(error)
        }
    }

    /**
     * 1. 对于链式调用，then应该返回一个 promise，将这个 promise 传递到下一 then 中
     * 2. 如果返回一个普通值，将这个值直接传给下一个then
     * 3. 如果 onFulfilled 不是函数，忽略onFulfilled，直接返回value
     * 4. 如果 onRejected 不是函数，忽略onRejected，直接抛出错误
     * 5. onFulfilled/onRejected 不能同步执行，通过 setTimeout 模拟实现
     */
    then(onFulfilled, onRejected) {
        onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : value => value
        onRejected = typeof onRejected === 'function' ? onRejected : err => { throw err }
        let promise2 = new Promise((resolve, reject) => {
            if (this.state === 'fulfilled') {
                setTimeout(() => {
                    try {
                        const x = onFulfilled(this.value)
                        resolvePromise(promise2, x, resolve, reject)
                    } catch (error) {
                        reject(error)
                    }
                }, 0);
            }
            if (this.state === 'rejected') {
                setTimeout(() => {
                    try {
                        const x = onRejected(this.reason)
                        resolvePromise(promise2, x, resolve, reject)
                    } catch (error) {
                        reject(error)
                    }
                }, 0);
            }
            if (this.state === 'pending') {
                this.onFulfilledCallbacks.push(() => {
                    setTimeout(() => {
                        try {
                            const x = onFulfilled(this.value)
                            resolvePromise(promise2, x, resolve, reject)
                        } catch (error) {
                            reject(error)
                        }
                    }, 0);
                })
                this.onRejectedCallbacks.push(() => {
                    setTimeout(() => {
                        try {
                            const x = onRejected(this.reason)
                            resolvePromise(promise2, x, resolve, reject)
                        } catch (error) {
                            reject(error)
                        }
                    }, 0);
                })
            }
        })
        return promise2
    }
    catch(onRejected) {
        return this.then(null, onRejected)
    }
    finally(onFinally) {
        this.then(() => {
            onFinally()
        }, () => {
            onFinally()
        })
        return this
    }
}

/**
 * 1. x !== promise2
 * 2. 普通值直接 resolve
 * 3. 对象或者函数，let then = x.then
 * 4. 保证回调直执行一次，成功的回调继续递归调用，失败的回调抛出错误
 */
function resolvePromise(promise2, x, resolve, reject) {
    if (x === promise2) {
        return reject(new TypeError('Chaining cycle detected for promise.'))
    }
    let called
    if (x !== null && (typeof x === 'object' || typeof x === 'function')) {
        try {
            let then = x.then
            if (typeof then === 'function') {
                then.call(x, y => {
                    if (called) return
                    called = true
                    resolvePromise(promise2, y, resole, reject)
                }, err => {
                    if (called) return
                    called = true
                    reject(err)
                })
            } else {
                resolve(x)
            }
        } catch (error) {
            if (called) return
            called = true
            reject(error)
        }
    } else {
        resolve(x)
    }
}

Promise.resolve = function(val) {
    return new Promise((resolve) => {
        resolve(val)
    })
}

Promise.reject = function(err) {
    return new Promise((resolve, reject) => {
        reject(err)
    })
}

Promise.race = function(promises) {
    return new Promise((resolve, reject) => {
        for (let i = 0; i < promises.length; i++) {
            promises[i].then(resolve, reject)
        }
    })
}

Promise.all = function(promises) {
    let arr = [], count = 0
    return new Promise((resolve, reject) => {
        for (let i = 0; i < promises.length; i++) {
            promises[i].then(data => {
                arr[i] = data
                count++
                if (count === promises.length) {
                    resolve(arr)
                }
            }, reject)
        }
    })
}

Promise.any = function(promises) {
    let arr = [], count = 0
    return new Promise((resolve, reject) => {
        for (let i = 0; i < promises.length; i++) {
            promises[i].then(resolve, err => {
                arr[i] = err
                count++
                if (count === promises.length) {
                    reject(arr)
                }
            })
        }
    })
}

Promise.allSettled = function(promises) {
    let arr = [], count = 0
    return new Promise((resolve, reject) => {
        for (let i = 0; i < promises.length; i++) {
            promises[i].then(data => {
                arr[i] = { status: 'fulfilled', value: data }
                count++
                if (count === promises.length) {
                    return resolve(arr)
                }
            }, err => {
                arr[i] = { status: 'rejected', reason: err }
                count++
                if (count === promises.length) {
                    return resolve(arr)
                }
            })
        }
    })
}


const p1 = Promise.resolve(1)
const p2 = new Promise((resolve, reject) => resolve(2))
const p3 = new Promise((resolve, reject) => reject(3))
const p4 = new Promise((resolve, reject) => resolve(4))
const p5 = Promise.reject(5)

p1.then(res => {
    console.log('p1 resolve', res)
}).finally(() => {
    console.log('resolve finally')
})

p3.then(res => {
    console.log('p3 resolve', res)
}).catch(err => {
    console.log('p3 reject', err)
}).finally(() => {
    console.log('reject finally')
})


const pAll = Promise.all([p1, p2, p3, p4])
pAll.then(res => {
    console.log('pAll resolve', res)
}).catch(err => {
    console.log('pAll reject', err)
})

const pRace = Promise.race([p1, p2, p3, p4])
pRace.then(res => {
    console.log('pRace resolve', res)
}).catch(err => {
    console.log('pRace reject', err)
})

const pAny = Promise.any([p3, p5])
pAny.then(res => {
    console.log('pAny resolve', res)
}).catch(err => {
    console.log('pAny reject', err)
})

const pAllSettled = Promise.allSettled([p1, p2, p3, p4])
pAllSettled.then(res => {
    console.log('pAllSettled resolve', res)
}).catch(err => {
    console.log('pAllSettled reject', err)
})

