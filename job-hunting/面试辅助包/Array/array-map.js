// https://tc39.es/ecma262/multipage/indexed-collections.html#sec-array.prototype.map
Array.prototype.myMap = function (callbackfn, thisArg) {
  if (typeof this == null) {
    throw new TypeError('Array.prototype.map called on null.')
  }
  if (typeof callbackfn !== 'function') {
    throw new TypeError(`${callbackfn} is not a function.`)
  }
  let O = Object(this),
    len = O.length >>> 0,
    A = new Array(len)
  let k = 0
  while (k < len) {
    // skip empty value
    if (k in O) {
      const mappedValue = callbackfn.call(thisArg, O[k], k, O)
      A[k] = mappedValue
    }
    k++
  }
  return A
}

const arr = [1, 2, undefined, , 3, '', 4, false, 5]

const res = arr.myMap(item => item * 2)

console.log(res)
