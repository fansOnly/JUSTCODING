/**
 * euclideanDistance 欧氏距离
 * Calculates the distance between two points in any number of dimensions(尺寸).
 * 1. Use Object.prototype.keys() and Array.prototype.map() to map each coordinate to its difference between the two points.
 * 2. Use Math.hypot() to calculate the Euclidean distance between the two points.
 */
const euclideanDistance = (a, b) => {
    return Math.hypot(...Object.keys(a).map(k => b[k] - a[k]))
}

console.log(euclideanDistance([1, 1], [2, 3])) // ~2.2361
console.log(euclideanDistance([1, 1, 1], [2, 3, 2])) // ~2.4495
