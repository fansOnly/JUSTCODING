// https://tc39.es/ecma262/multipage/indexed-collections.html#sec-array.prototype.find
Array.prototype.myFind = function (callbackfn, thisArg) {
  if (typeof this == null) {
    throw new TypeError('Array.prototype.find called on null.')
  }
  if (typeof callbackfn !== 'function') {
    throw new TypeError(`${callbackfn} is not a function.`)
  }
  let O = Object(this),
    len = O.length >>> 0
  let k = 0
  while (k < len) {
    const kValue = O[k]
    const testResult = callbackfn.call(thisArg, kValue, k, O)
    if (testResult) {
      return kValue
    }
    k++
  }
  return undefined
}

const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9]
const res = arr.myFind(v => v > 50)
console.log(res)
