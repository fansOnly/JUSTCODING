/**
 * Object.is
 * 解决 +0 和 -0 相等的问题
 * 解决 NaN 不等于自身的问题
 */
const ObjectIs = (x, y) => {
    if (x === y) {
        return x !== 0 || y !== 0 || 1 / x === 1 / y
    } else {
        return x !== x && y !== y
    }
}

console.log(objectIs(NaN, NaN))
console.log(objectIs(+0, -0))
