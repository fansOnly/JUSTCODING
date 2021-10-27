/**
 * distance
 * Calculate the distance between two points.
 * 1. Use the Math.hypot() to calculate the Euclidean distance between two points.
 */
const distance = (x0, y0, x1, y1) => Math.hypot(x1 - x0, y1 - y0)

console.log(distance(1, 1, 2, 3)) // ~2.236
