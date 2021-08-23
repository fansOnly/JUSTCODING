/**
 * 扁平化数组
 */
const flat = (arr, depth = 1) => {
  if (depth === 0) return arr
  return arr.reduce((a, b) => a.concat(Array.isArray(b) ? flat(b, depth - 1) : b), [])
}

var arr = [1,2,3,[4,5,[6,7,[8,[9,[0]]]]]]
console.log(flat(arr, 3))



/**
 * 去首尾空格
 */
const trim = (str = '') => {
  return str.replace(/^\s+|\s+$/g, '')
}

console.log(trim(' 1 234 '), trim(' 1 234 ').length)


/**
 * 深比较
 */
const isEqual = (a, b) => {
  if (a === b) return true
  if (typeof a === 'object' && typeof b === 'object') {
    if (Array.isArray(a) && Array.isArray(b)) {
      return a.length === b.length && a.every((k, i) => {
        return isEqual(k, b[i])
      })
    } else if (a instanceof Date && b instanceof Date) {
      return a.getTime() === b.getTime()
    } else if (!Array.isArray(a) && !Array.isArray(b)) {
      const akeys = Object.keys(a), bkeys = Object.keys(b)
      return akeys.length == bkeys.length && akeys.every(k => {
        return isEqual(a[k], b[k])
      })
    } else {
      return false
    }
  } else if (typeof a !== 'object' && typeof b !== 'object') {
    return String(a) === String(b)
  } else {
    return false
  }
}

var o1 = {
  a: 1,
  b: 2,
  c: ['a', 'b']
}
var o2 = {
  a: 1,
  b: 2,
  c: ['a', 'b']
}

console.log(isEqual(o1, o2))


/**
 * 管道函数
 */
const compose = (...fns) => fns.reduce((f, g) => (...args) => f(g(...args)))

const f1 = (a, b) => a + b
const f2 = x => x * x


const f4 = compose(f2, f1)
console.log(f4(1, 2))


/**
 * 直执行一次
 */
const once = fn => {
  let cache
  return function(...args) {
    return cache || (cache = fn(...args))
  }
}

const add = (a, b) => {
  console.log(1)
  return a + b
}

const f5 = once(add)
console.log(f5(1, 2))
console.log(f5(1, 2))


/**
 * 模板渲染
//  */
// const render = (template, data) => {
//   const reg = /\{\{(\w+)\}\}/
//   if (reg.test(template)) {
//     console.log(1)
//   }
//   return template
// }

// const template = '{{ user["name"] }}，今天你又学习了吗 - 用户ID: {{ user.id }}';

// const data = {
//   user: {
//     id: 10086,
//     name: '山月',
//   }
// };

// //=> "山月，今天你又学习了吗 - 用户ID: 10086"
// console.log(render(template, data))

/**
 * 数字千位分隔符
 */
const tothousand = num => {
  return String(num).replace(/(?!^)(?=(\d{3})+$)/g, ',')
}

console.log(tothousand(123456789))
