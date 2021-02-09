/**
 * powerset - 幂集
 * Returns the powerset of a given array of numbers.
 * 1. Use Array.prototype.reduce() combined with Array.prototype.map() to iterate over elements and combine into an array contains all combinations.
 */
const powerset = arr => {
    return arr.reduce((acc, cur) => acc.concat(acc.map(v => [cur].concat(v))), [[]])
}

console.log(powerset([1, 2]))
