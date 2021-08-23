async function foo() {
    console.log('3 foo')
}
async function bar() {
    console.log('2 bar start')
    await foo()
    console.log('6 bar end')
}
console.log('1 script start')
setTimeout(function () {
    console.log('8 setTimeout')
}, 0)
bar();
new Promise(function (resolve) {
    console.log('4  promise executor')
    resolve();
}).then(function () {
    console.log('7 promise then')
})
console.log('5 script end')
