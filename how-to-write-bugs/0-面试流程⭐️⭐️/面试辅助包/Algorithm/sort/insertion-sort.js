/**
 * insertionSort - 插入排序
 * Sorts an array of numbers, using the insertion sort algorithm.
 * 1. Use Array.prototype.reduce() to iterate over all the elements in the given array.
 * 2. If the length of the accumulator is 0, add the current element to it.
 * 3. Use Array.prototype.some() to iterate over the results in the accumulator util the correct position is found.
 * 4. Use Array.prototype.splice() to insert the current element into the accumulator.
 */
const insertionSort = arr => {
    return arr.reduce((acc, x) => {
        if (!acc.length) return [x]
        acc.some((y, i) => {
            if (x <= y) {
                acc.splice(i, 0, x)
                return true
            }
            if (x > y && i === acc.length - 1) {
                acc.splice(i + 1, 0, x)
                return false
            }
            return false
        })
        return acc
    }, [])
}

console.log(insertionSort([6, 3, 4, 1]))



/**
 * 手抓牌
 * 先从牌堆拿一张牌
 * 在从牌堆拿一张牌与手里的牌比较，大的放后面
 * 重复上述操作
 */
const insertSort = arr => {
  let res = [arr[0]]
  for (let i = 1; i < arr.length; i++) {
    const target = arr[i]
    for (let j = res.length - 1; j >= 0; j--) {
      if (target > res[j]) {
        res.splice(j+1, 0 , target)
        break
      }
      if (j === 0) {
        res.unshift(target)
      }
    }
  }
  return res
}

console.log(insertSort([6, 3, 4, 1]))
