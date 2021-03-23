/**
 * countSubstrings
 * Counts the occurrences of a substring in the given string.
 * 1. Use Array.prototype.indexOf() to look for searchVal in str.
 * 2. Increament a counter if the value is found and update the index, i.
 * 3. Use a while loop that will return as soon as the value returned from Array.prototype.indexOf() is -1.
 */
const countSubstrings = (str, searchVal) => {
    let count = 0, i = 0;
    while (true) {
        const index = str.indexOf(searchVal, i)
        if (index !== -1) {
            [count, i] = [count + 1, index + 1]
        } else {
            return count
        }
    }
}

console.log(countSubstrings('tiktok tok tok tik tok tik', 'tik')) // 3
console.log(countSubstrings('tutut tut tut', 'tut')) // 4
