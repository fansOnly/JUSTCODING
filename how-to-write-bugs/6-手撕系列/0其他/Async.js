/**
 * async 即是 Generator 的语法糖
 */
function spawn(genF) {
    return new Promise((resolve, reject) => {
        const gen = genF()
        function step(nextF) {
            console.log('nextF: ', nextF);
            let next
            try {
                next = nextF()
            } catch (error) {
                reject(error)
            }
            if (next.done) {
                return resolve(next.value)
            }
            Promise.resolve(next.value).then(v => {
                step(function() { return gen.next(v) })
            }, e => {
                step(function() { return gen.throw(e) })
            })
        }
        step(function() { return gen.next(undefined) })
    })
}
