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

    try {
        executor(resolve, reject);
    } catch (error) {
        reject(error);
    }
}

Promise.prototype.then = function (onFulfilled, onRejected) {
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

Promise.prototype.catch = function (onRejected) {
    return this.then(null, onRejected)
}

Promise.prototype.finally = function (onFinally) {
    this.then(() => {
        onFinally()
    }, () => {
        onFinally()
    })
    return this;
}

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

Promise.resolve = function (val) {
    return new Promise(resolve => {
        resolve(val);
    })
}

Promise.reject = function (val) {
    return new Promise((resolve, reject) => {
        reject(val);
    })
}

Promise.race = function (promises = []) {
    return new Promise((resolve, reject) => {
        for (let i = 0; i < promises.length; i++) {
            promises[i].then(resolve, reject);
        }
    })
}

Promise.all = function (promises = []) {
    return new Promise((resolve, reject) => {
        let result = [];
        for (let i = 0; i < promises.length; i++) {
            promises[i].then(data => {
                result.push(data);
                if (result.length == promises.length) {
                    resolve(result);
                }
            }, reject);
        }
    })
}

Promise.defer = Promise.defered = function() {
    let dfd = {}
    dfd.promise = new Promise((resolve, reject) => {
        dfd.resolve = resolve;
        dfd.reject = reject;
    })
    return dfd;
}


Promise.all = function(promises){
    let arr = [];
    let i = 0;
    function processData(index,data){
      arr[index] = data;
      i++;
      if(i == promises.length){
        resolve(arr);
      };
    };
    return new Promise((resolve,reject)=>{
      for(let i=0;i<promises.length;i++){
        promises[i].then(data=>{
          processData(i,data);
        },reject);
      };
    });
  }

const prom1 = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve(1)
    }, 0)
})

console.log(prom1)

prom1.then(res => {
    console.log(res)  // 1
    return new Promise(resolve => resolve(3))
})
    .then()
    .then(res2 => {
        console.log(res2) // 3
    })
    .then(res3 => {
        console.log(res3) // undefined
        return prom1
    })
    .then(res4 => {
        console.log(res4) // 1
    })

// promise.resolve
Promise.resolve(11)
    .then(res => {
        console.log(res)  // 11
    })

// promise.reject
Promise.reject(22)
    .then(res => {
        console.log(res)
    }, reason => {
        console.log(reason) // 22
    })

// promise.race
const ps1 = new Promise(resolve => {
    setTimeout(resolve, 500, 'ps1')
})

const ps2 = new Promise((resolve, reject) => {
    setTimeout(resolve, 100, 'ps2')
})

const ps3 = new Promise((resolve, reject) => {
    reject('reject ps3');
})

Promise.race([ps1, ps2]).then(res => {
    console.log(res) // ps2
})

Promise.race([ps3, ps2, ps1]).then(res => {
    console.log(res)
}, reason => {
    console.log(reason) // reject ps3
})

// promise.all
const pp1 = Promise.resolve('pp1');
const pp2 = 'pp2';
const pp3 = new Promise((resolve, reject) => {
    setTimeout(resolve, 500, 'pp3')
})
const pp4 = Promise.reject(new Error('pp4'));

Promise.all([pp1, pp2, pp3]).then(res => {
    console.log(res)
}, reason => {
    console.log(reason)
})



module.exports = Promise;