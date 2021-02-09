/**
 * levenshteinDistance 编辑距离
 * Calculates the difference between two strings, using the levenshtein distance algorithm.
 * 1. If either of the two strings has a lengthf zero, return the length of the other one.
 * 2. Use a for loop to iterate over the letters of the target string and a nested for loop to iterate over the letters of the source string.
 * 3. Calculate the cost of subsituting the letters corresponsing to i-1 and j-1 in the target and source respectively (0 if they are the same, 1 otherwise).
 * 4. Use Math.min() to populate each element in the 2D array with the minimum of the cell above incremented by one, the cell to the left incremented by onr or the cell to the top left incremented by the prevously calculated cost.
 * 5. Return the last element of the last row of the producted array.
 */
const levenshteinDistance = (s, t) => {
    if (!s.length) return t.length
    if (!t.length) return s.length
    const arr = []
    for (let i = 0; i <= t.length; i++) {
        arr[i] = [i]
        for (let j = 1; j <= s.length; j++) {
            arr[i][j] = i === 0 ? j : Math.min(arr[i-1][j]+1, arr[i][j-1]+1, arr[i-1][j-1] + (s[j-1] === t[j-1] ? 0 : 1))
        }
    }
    return arr[t.length][s.length]
}

console.log(levenshteinDistance('duck', 'dark'))
