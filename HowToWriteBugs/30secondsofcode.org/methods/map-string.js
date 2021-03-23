/**
 * mapString
 * Creates a new string with the results of calling a provided function on every charactor in the given string.
 * 1. Use Array.prototype.split('') and Array.prototype.map() to call the provided function, fn, for each charactor in str.
 * 2. Use Array.prototype.join('') to recombine the array of charators into a string.
 * 3. The callback function, takes three arguments (the current charactor, the inddex of the cuurent charactor and the string mapString was called upon)
 */
const mapString = (str, fn) => {
    return str.split('').map((v, i) => fn(v, i, str)).join('')
}

console.log(mapString('lorem ipsum', c => c.toUpperCase()))
