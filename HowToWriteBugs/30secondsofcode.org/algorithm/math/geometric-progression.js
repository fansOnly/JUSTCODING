/**
 * geometricProgression - 等比数列
 * Initializes an array containing the numbers in the specified range where start and end are inclusive and the ratio between two terms are step. Returns an error if step equals 1.
 * 1. Use Array.form(), Math.log() and Math.floor() to create an array of the desired length, Array.prototype.map() to fill the desired values in a range.
 * 2. Omit the second argument, start, to use a default value of 1.
 * 3. Omit the third argument, step, to use a default value of 2.
 */
const geometricProgression = (end, start = 1, step = 2) => {
    return Array.from({length: Math.floor(Math.log(end / start)/ Math.log(step) + 1)}, (_, i) => start * step ** i)
}

console.log(geometricProgression(256)) // [ 1, 2, 4, 8, 16, 32, 64, 128, 256 ]

console.log(geometricProgression(256, 1, 4)) // [ 1, 4, 16, 64, 256 ]
