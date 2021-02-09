/**
 * pipeAsyncFunctions
 * Performs left-to-right function composition for asynchronous functions.
 * 1. Use Array.prototype.reduce() and the spread operator to perform function composition using Promise.prototype.then()
 * 2. The function can return a combination of normal values, Promises or be async, returning through await.
 * 3. All functions must accept a single argument.
 */
const pipeAsyncFunctions = (...fns) => arg => fns.reduce((p, fn) => p.then(fn), Promise.resolve(arg))

const sum = pipeAsyncFunctions(
    x => x + 1,
    x => new Promise(resolve => setTimeout(() => resolve(x + 2), 1000)),
    x => x + 3,
    async x => (await x) + 4
)
sum(5).then(res => {
    console.log(res) // 15
})

// (async() => {
//     console.log(await sum(5)); // 15 (after one second)
// })()

const res = (async () => {
    const d = await sum(5)
    console.log(d) // 15
})()
// res()
