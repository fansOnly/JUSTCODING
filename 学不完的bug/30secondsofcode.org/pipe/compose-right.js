/**
 * composeRight
 * Performs left-to-right function composition.
 * 1. Use Array.prototype.reduce() to perform left-to-right function composition.
 * 2. The first (leftmost) function can accept one or more arguments; the remaining functions must be unary(一元).
 */
const composeRight = (...fns) => fns.reduce((f, g) => (...args) => g(f(...args)))

const add = (x, y) => x + y
const square = x => x * x
const addAndSquare = composeRight(add, square)

console.log(addAndSquare(1, 2)) // (1 + 2) * (1 + 2)
