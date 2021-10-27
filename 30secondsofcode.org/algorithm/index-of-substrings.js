/**
 * indexOfSubstrings
 * Find all the indexes of a substring in the given string.
 * 1. Use Array.prototype.indexOf() to look for searchVal in str.
 * 2. Use yield to return the index if the value is found and update the index, i.
 * 3. Use a while loop the will terminate the generator as soon as the value returned from Array.prototype.indexOf() is -1.
 */
const indexOfSubstrings = function *(str, searchVal) {
    let i = 0
    while (true) {
        const index = str.indexOf(searchVal, i)
        if (index !== -1) {
            yield index
            i = index + 1
        } else {
            return
        }
    }
}

console.log([...indexOfSubstrings('tiktok tok tok tik tok tik', 'tik')]) // [ 0, 15, 23 ]

console.log([...indexOfSubstrings('hello', 'hi')]) // []
