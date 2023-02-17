//https://tc39.es/ecma262/multipage/indexed-collections.html#sec-array.prototype.filter
Array.prototype.myFilter = function (callbackfn, thisArg) {
  if (typeof this == null) {
    throw new TypeError('Array.prototype.filter called on null.')
  }
  if (typeof callbackfn !== 'function') {
    throw new TypeError(`${callbackfn} is not a function.`)
  }

  let O = Object(this),
    len = O.length >>> 0,
    A = new Array(0)
  let k = 0, to = 0
  while (k < len) {
    if (k in O) {
      const kValue = O[k]
      const selected = callbackfn.call(thisArg, kValue, k, O)
      if (selected) {
        A[to] = kValue
        to++
      }
    }
    k++
  }
  return A
}

const arr = [1, 2, 3, 4, 5, 6]
const res = arr.myFilter(v => v > 3)
console.log(res)
