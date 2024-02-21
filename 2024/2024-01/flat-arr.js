/**
 * 函数扁平化
 */
// regexp
const flatArr = (arr =[]) => JSON.parse('[' + JSON.stringify(arr).replace(/\[|\]/g, '') + ']')

// reduce
const flatArr2 = (arr = [], depth = 1) => arr.reduce((acc, cur) => acc.concat(Array.isArray(cur) && depth > 1 ? flatArr2(cur, --depth) : cur), [])

// for
const flatArr3 = (arr = [], depth = 1) => {
  let res = []
  for (let i = 0; i < arr.length; i++) {
    if (Array.isArray(arr[i]) && depth > 0) {
      res = res.concat(flatArr3(arr[i], --depth))
    } else {
      res.push(arr[i])
    }
  }
  return res;
}

const arr = [1, [2, [3, [4, 5]]], 6];

// console.log(flatArr(arr))

// console.log(flatArr2(arr, 1))

// console.log(arr.flat(1))

console.log(flatArr3(arr, 1))