/**
 * Promise
 * 创建一个新的 Promise 对象。
 * 该构造函数主要用于包装还没有添加 promise 支持的函数
 * // TODO
 */






/**
 * Promise.all
 * 这个方法返回一个新的promise对象，该promise对象在iterable参数对象里所有的promise对象都成功的时候才会触发成功，
 * 一旦有任何一个iterable里面的promise对象失败则立即触发该promise对象的失败。
 * 这个新的promise对象在触发成功状态以后，会把一个包含iterable里所有promise返回值的数组作为成功回调的返回值，顺序跟iterable的顺序保持一致；
 * 如果这个新的promise对象触发了失败状态，它会把iterable里第一个触发失败的promise对象的错误信息作为它的失败错误信息
 */
Promise.all = function (promiseArr) {
    return new Promise((resolve, reject) => {
        let result = []
        let count = 0
        const { length } = promiseArr
        for (let i = 0; i < length; i++) {
            promiseArr[i].then(res => {
                result[i] = res
                count++
                if (count === length) {
                    resolve(result)
                }
            }).catch(err => {
                reject(err)
            })
        }
    })
}


/**
 * Promise.race
 * 当iterable参数里的任意一个子promise被成功或失败后，
 * 父promise马上也会用子promise的成功返回值或失败详情作为参数调用父promise绑定的相应句柄，
 * 并返回该promise对象
 */
Promise.race = function (promiseArr) {
    return new Promise((resolve, reject) => {
        promiseArr.forEach(p => {
            Promise.resolve(p).then(
                val => resolve(val),
                err => reject(err)
            )
        })
    })
}


/**
 * Promise 并行限制
 * // TODO
 */
