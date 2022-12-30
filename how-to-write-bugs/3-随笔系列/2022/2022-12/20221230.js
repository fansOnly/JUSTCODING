// var foo = function (...args) {
//   // 要求实现函数体
//   const target = (...args2) => foo(...args, ...args2)
//   target.getValue = () => args.reduce((acc, cur) => acc + cur, 0)
//   return target
// }
// var f1 = foo(1, 2, 3)
// console.log(f1.getValue()) // 6 输出是参数的和 
// var f2 = foo(1)(2, 3)
// console.log(f2.getValue()) // 6 
// var f3 = foo(1)(2)(3)(4)
// console.log(f3.getValue()) // 10


// const rgb2hex = val => {
//   const reg = /\d+/g
//   const matched = val.match(reg)
//   return matched.reduce((acc, cur) => `${acc}${Number(cur).toString(16)}`, '#')
// }

// console.log(rgb2hex('rgb(30,30,30)'))


// async function asyncPool(limit, arr, iteratorFn) {
//   let result = []
//   let executing = []

//   for (const item of arr) {
//     const p = Promise.resolve().then(() => iteratorFn(item, arr))
//     result.push(p)

//     if (result.length > limit) {
//       const e = p.then(() => executing.splice(executing.indexOf(e)), 1)
//       executing.push(e)
//       if (executing.length > limit) {
//         await Promise.race(executing)
//       }
//     }
//   }
//   return Promise.all(result)
// }

// const timeout = delay => new Promise(resolve => setTimeout(() => {
//   resolve(delay)
//   console.log('delay: ', delay)
// }, delay))

// asyncPool(2, [2000, 1000, 3000, 2500], timeout)


// function Foo() {
//   getName = function () { console.log(1) }
//   return this
// }
// Foo.getName = function () { console.log(2) }
// Foo.prototype.getName = function () { console.log(3) }
// var getName = function () { console.log(4) }
// function getName() { console.log(5) }

// //请写出以下输出结果：
// Foo.getName()
// getName()
// Foo().getName()
// getName()
// new Foo.getName()
// new Foo().getName()
// new new Foo().getName()



const useDataMask = (value, start = 0, end = 0, space = false) => {
  let data = String(value)
  if (!data) return ''
  const len = data.length
  if (start > len) return ''
  if (end > len) {
    end = len
  } else if (end < 0) {
    end = Math.max(len + end, 0)
  }
  if (start < 0) {
    start = Math.max(len + start, 0)
  }
  const reg = new RegExp('(\\d{' + start + '})\\d*(\\d{' + (len - end) + '})')
  return data.replace(reg, (_, $1, $2) => {
    return $1 + '*'.repeat(end - start).replace(/\B(?=(\*{4})+$)/g, space ? ' ' : '') + (space ?
      ' ' : '') + $2
  })
}

console.log(useDataMask('13355558888', 3, -3))
console.log(useDataMask('621400000000008588', 3, -3, true))
