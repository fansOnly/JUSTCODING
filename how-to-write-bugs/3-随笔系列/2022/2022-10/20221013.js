/**
 * 函数的长度 - 函数的正式参数个数，不包含可选参数
 */
function foo(a, b = 1, c) {
  console.log(foo.length) // 1
  console.log(arguments.length) // 3
}

foo(1, 2, 3)

var str1 = 'Hello'
var str2 = String('hello')
var str3 = new String('hello')

console.log(str1 instanceof String)
console.log(str2 instanceof String)
console.log(str3 instanceof String)


/**
 * 数组扁平化
 */
function flatten(arr, depth = 1) {
  let res = []
  for (let i = 0; i < arr.length; i++) {
    if (Array.isArray(arr[i]) && depth > 0) {
      res = res.concat(flatten(arr[i], depth - 1))
    } else {
      res.push(arr[i])
    }
  }
  return res
}

function flatten2(source, depth = 1, output = []) {
  for (const item of source) {
    if (Array.isArray(item) && depth > 0) {
      flatten2(item, depth - 1, output)
    } else {
      output.push(item)
    }
  }
  return output
}

function flatten3(arr, depth) {
  return arr.reduce((acc, cur) => Array.isArray(cur) && depth > 0 ? acc.concat(flatten3(cur, depth - 1)) : [...acc, cur], [])
}

const arr = [1, 2, [3, [5, [6, [7]]]], 8, 9]

console.log(flatten(arr, 2))
console.log(flatten2(arr, 3))
console.log(flatten3(arr, 2))


