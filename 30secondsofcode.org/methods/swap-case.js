/**
 * swapCase
 * Creates a string with uppercase characters converted to lowercase and vice versa.
 * 1. Use the spread operator to convert str into an array of characters.
 * 2. Use String.prototype.toLowerCase() and String.prototype.toUpperCase() to convert lowercase characters to uppercase characters and vice versa.
 * 3. Use Array.prototype.map() to apply the transformation to each charactor, Array.prototype.join() to combine back into a string.
 * 4. Note that it is not necessaryly true that swapCase(swapCase(str)) === str.
 */
const swapCase = str => {
    return [...str].map(v => (v === v.toLowerCase() ? v.toUpperCase() : v.toLowerCase())).join('')
}


console.log((swapCase('Hello World')))
console.log(swapCase(swapCase('Hello World')) === 'Hello World') // true
