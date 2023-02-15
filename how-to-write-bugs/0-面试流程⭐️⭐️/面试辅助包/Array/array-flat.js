const flatArray = (arr, depth = 1) => {
  return arr.flat(depth)
}

const flatArray2 = (arr, depth = 1) => {
  return arr.reduce((acc, cur) => acc.concat(Array.isArray(cur) && depth > 1 ? flatArray2(cur, --depth) : cur), [])
}

const arr = [1, 2, [3, 4, [5, 6, [7, 8, [9, 10]]]]]
console.log(flatArray(arr, 6))
console.log(flatArray2(arr, 6))
