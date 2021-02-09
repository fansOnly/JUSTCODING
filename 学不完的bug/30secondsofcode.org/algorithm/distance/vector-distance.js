/**
 * vectorDistance 向量距离
 * Calculates the distance between two vectors.
 * 1. Use Math.pow(), Array.prototype.reduce() and Math.sqrt() to calculate the Euclidean distance between two vectors.
 */
const vectorDistance = (x, y) => {
    return Math.sqrt(x.reduce((acc, cur, i) => acc + Math.pow(cur - y[i], 2), 0))
}

console.log(vectorDistance([10, 0, 5], [20, 0, 10])) // 11.180339887498949
