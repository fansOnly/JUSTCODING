// 1 String.prototype.matchAll
// 返回更详细的匹配信息
// const text = 'From 2020.01.09 tp 2020.07.09'
// const regexp = /(?<year>\d{4}).(?<month>\d{2}).(?<day>\d${2})/gu
// const res = text.match(regexp)
// console.log(res)
// const res2 = Array.from(text.matchAll(regexp))
// console.log(res2)



// 2 动态 import
// 返回一个promise函数
// import('xx.js').then(module => {
//     module.default()
// })

// async(() => {
//     const module = await import('xx.js')
//     console.log(module)
// })



// 3 BigInt 任意精度整数
// 1 通过 BigInt 定义 BigInt(10) => 10n
// 2 在数值后加n => 10n 
const Max = Number.MAX_SAFE_INTEGER
console.log(Max) // 9007199254740991

const Max2 = Max + 10 - 10
console.log(Max2) // 9007199254740990  精度丢失

const Max3 = BigInt(Max) + 10n - 10n
console.log(Max3) // 9007199254740991n



// 4 Promise.allSettled
// 处理所有的promise都settled的情况, 无论结果是fulfilled或者rejected




// 5 globalThis
// 全局的this对象



// 6 for-in机制



// 7 可选链 对象属性的长链式访问
// data && data.a && data.a.b
// data?.a?.b





// 8 空值合并运算符
// 只有左边的值严格等于 null 和 undefined 时起作用
// console.log("" || 'default') // default
// console.log("" ?? 'default') // ""




// 9 import.meta
// 为当前运行的模块添加一个特定的host元数据对象



// 10 export * as ns from "xx.js"
// 允许开发者以新名称导出另一模块的命名空间外部对象
