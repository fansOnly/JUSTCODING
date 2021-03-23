async function async1() {
    console.log('2 async1 start')
    await async2()
    console.log('6 async2 end')
}
async function async2() {
    console.log('3 async2 start')
}

console.log('1 script start')

setTimeout(() => {
    console.log('8 settimeout')
}, 0);

async1()

new Promise(function (resolve) {
    console.log('4 promise1')
    resolve()
}).then(() => {
    console.log('7 promise2')
})

console.log('5 script end')
