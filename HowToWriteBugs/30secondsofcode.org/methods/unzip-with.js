/**
 * Creates an array of elements, ungrouping the elements in an array produced by zip and apllying provided function.
 * 1. Use Math.max() and Function.prototype.apply() to get the longest subarray in the array, Array.prototype.map() to make each element in an array.
 * 2. Use Array.prototype.reduce() and Array.prototype.forEach() to map grouped values to individual array.
 * 3. Use Array.prototype.map() and the spread operator (...) to apply fn to each individual group of elements.
 */
const unzipWith = (arr, fn) => {
    return arr.reduce((acc, cur) => 
    (cur.forEach((v, i) => acc[i].push(v)), acc),
    Array.from({
        length: Math.max(...arr.map(v => v.length))
    }).map(() => []))
    .map(v => fn(...v))
}

const res = unzipWith(
[
    [1, 10, 100],
    [2, 20, 200, 300],
    [3],
    ['', null, 's']
],
(...args) => args.reduce((acc, v) => acc + v, 0)
);
console.log(res)
