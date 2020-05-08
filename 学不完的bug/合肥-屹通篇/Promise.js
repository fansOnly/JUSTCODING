// 手写 promise

function Promise(executor) {
    this.state = 'pedding';
    this.value = null;
    this.reason = null;
    this.handled = false;
    this.onFulfilledFn = [];  // 成功的回调
    this.onRejectedFn = [];  // 失败的回调

    const resolve = value => {
        if (this.state === 'pedding') {
            this.value = value;
            this.onFulfilledFn.forEach(fn => fn());
            this.state = 'fulfilled';
        }
    }

    const reject = reason => {
        if (this.state === 'pedding') {
            this.reason = reason;
            this.onRejectedFn.forEach(fn => fn());
            this.state = 'rejected';
        }
    }

    function all() {}

    try {
        executor(resolve, reject);
    } catch (error) {
        reject(error);
    }
}

Promise.prototype.then = function(onFulfilled, onRejected) {
    // 对于空的then返回做处理
    onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : val => val;
    onRejected = typeof onRejected === 'function' ? onRejected : err => { throw err };
    let promise2 = new Promise((resolve, reject) => {
        if (this.state === 'fulfilled') {
            setTimeout(() => {
                try {
                    let x = onFulfilled(this.value);
                    resolvePromise(promise2, x, resolve, reject);
                } catch (e) {
                    reject(e);
                }
            }, 0);
        }
        if (this.state === 'rejected') {
            setTimeout(() => {
                try {
                    let x = onRejected(this.reason);
                    resolvePromise(promise2, x, resolve, reject);
                } catch (e) {
                    reject(e);
                }
            }, 0);
        }
        if (this.state === 'pedding') {
            if (typeof onFulfilled === 'function') {
                this.onFulfilledFn.push(() => {
                    setTimeout(() => {
                        try {
                            let x = onFulfilled(this.value);
                            resolvePromise(promise2, x, resolve, reject);
                        } catch (e) {
                            reject(e);
                        }
                    }, 0);
                })
            }
            if (typeof onRejected === 'function') {
                this.onRejectedFn.push(() => {
                    setTimeout(() => {
                        try {
                            let x = onRejected(this.reason);
                            resolvePromise(promise2, x, resolve, reject);
                        } catch (e) {
                            reject(e);
                        }
                    }, 0);
                });
            }
        }
    })
    return promise2;
}

Promise.prototype.catch = function(onRejected) {}

Promise.prototype.finally = function(onFinally) {}

// 链式调用
// 1. 每个then方法都返回一个新的Promise对象（原理的核心）
// 2. 如果then方法中显示地返回了一个Promise对象就以此对象为准，返回它的结果
// 3. 如果then方法中返回的是一个普通值（如Number、String等）就使用此值包装成一个新的Promise对象返回。
// 4. 如果then方法中没有return语句，就视为返回一个用Undefined包装的Promise对象
// 5. 若then方法中出现异常，则调用失败态方法（reject）跳转到下一个then的onRejected
// 6. 如果then方法没有传入任何回调，则继续向下传递（值的传递特性）。

/**
 * 解析then返回的值与新的Promise对象
 * @param {Object} promise2 新的Promise对象
 * @param {*} x then的返回值
 * @param {Function} resolve resolve(promise2)
 * @param {Function} reject reject(promise2)
 */
function resolvePromise(promise2, x, resolve, reject) {
    if (promise2 === x) {
        reject(new TypeError('死循环...'))
    }
    if (x !== null && (typeof x === 'function' || typeof x === 'object')) {
        try {
            let then = x.then;
            if (typeof then === 'function') {
                then.call(x, y => {
                    // 递归调用y, 若为Promise则继续循环
                    resolvePromise(promise2, y, resolve, reject);
                }, e => {
                    reject(e)
                })
            } else {
                resolve(x)
            }
        } catch (e) {
            reject(e)
        }
    } else {
        resolve(x);
    }
}


const prom1 = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve(1)
    }, 0)
})

console.log(prom1)

prom1.then(res => {
    console.log(res)
    return new Promise(resolve => resolve(3))
})
.then()
.then(res2 =>{
    console.log(res2)
})
.then(res3 => {
    console.log(res3)
    return prom1
})
.then(res4 => {
    console.log(res4)
})