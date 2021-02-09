/**
 * permutations
 * Generate all permutations of an array's elements(contains duplicates)
 * 1. Use recursion
 * 2. For each element in the given array, create all the partial permutations for the rest of its elements.
 * 3. Use Array.prototype.map() to combine the element with each partial permutation, then Array.prototype.reduce() to combine all permutations in one array.
 * 4. Base cases are for Array.prototype.length equal to 2 or 1.
 * ⚠️ warning: This function's excution time increases exponenially with each array element. Anything more than 8 to 10 entries may cause your browser to hang as it tries to solve all the different combinations.
 */
const permutations = arr => {
    if (arr.length <= 2) {
        return arr.length === 2 ? [arr, [arr[1], arr[0]]] : arr
    }
    return arr.reduce((acc, cur, i) => {
        return acc.concat(permutations([...arr.slice(0, i), ...arr.slice(i+1)]).map(val => [cur, ...val]))
    }, [])
}


console.log(permutations([1, 33, 5]))
