const p = Promise.resolve(10)

let a = 0

p.then(() => {
    a = 10
    // return new Error('eeee')
    throw new Error('eeee')
}).catch((err) => {
    a = 20
}).finally(() => {
    a = a || 30
    console.log(a)
})



{
function post (flag) {
    return new Promise((resolve, reject) => {
        if (flag == 1) {
            resolve('success')
        } else {
            reject('error')
        }
    })
}

function fn (flag) {
    return new Promise((resolve, reject) => {
        post(flag).then(resolve).catch(reject)
    })
}

(async () => {
    const res = await fn(1)
    console.log('res: ', res);
})()
}
