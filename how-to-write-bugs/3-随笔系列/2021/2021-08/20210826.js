/*
 * @Author: fansonly
 * @Date: 2021-08-26 09:40:17
 * @Description:
 * @LastEditTime: 2021-08-26 09:43:03
 */
const objectIs = (x, y) => {
  if (x === y) {
    return x !== 0 || y !== 0 || 1 / x === 1 / y
  } else {
    return x !== x && y !== y
  }
}

console.log(objectIs(NaN, NaN))
console.log(objectIs(+0, -0))
console.log(objectIs(+0, +0))
console.log(Object.is(+0, -0))
console.log(Object.is(+0, +0))
console.log(Object.is(NaN, NaN))
