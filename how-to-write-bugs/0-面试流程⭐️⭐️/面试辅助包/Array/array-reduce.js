// https://tc39.es/ecma262/multipage/indexed-collections.html#sec-array.prototype.reduce
Array.prototype.myReduce = function (callbackfn, initialValue) {
  if (typeof this == null) {
    throw new TypeError('Array.prototype.reduce called on null.')
  }
  if (typeof callbackfn !== 'function') {
    throw new TypeError(`${callbackfn} is not a function.`)
  }
  let O = Object(this),
    len = O.length >>> 0
  if (len === 0 & !initialValue) {
    throw new TypeError('Array.prototype.reduce called empty array with no initial value.')
  }
  let k = 0
  let accumulator
  if (initialValue) {
    accumulator = initialValue
  } else {
    let kPreset = false
    while (!kPreset && k < len) {
      if (k in O) {
        kPreset = true
        accumulator = O[k]
      }
      k++
    }
  }
  while (k < len) {
    if (k in O) {
      const kValue = O[k]
      accumulator = callbackfn.call(undefined, accumulator, kValue, k, O)
    }
    k++
  }
  return accumulator
}

const arr = [1, 2, , 3, 4]
const res = arr.myReduce((acc, cur) => acc + cur)
console.log(res)
