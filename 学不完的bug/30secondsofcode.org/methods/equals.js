/**
 * equals
 * Performs a deep comparison between two values to determine if then are equivalent.
 * 1. Check if two values are identical, if they are both Date objects with the same time, using Date.prototype.getTime(), or if they are both non-object values with an equivalent value (strict comparison).
 * 2.Check if only one value is null or undefined or if their prototypes differ.
 * 3. If none of the above conditions are met, use Object.keys() to check if both values has the same number of keys.
 * 4. Use Array.prptotype.every() to check if every key in a exsits in b and if they are equivalently by calling equals() recursively.
 */
const equals = (a, b) => {
    if (a === b) return true
    if (a instanceof Date && b instanceof Date) return a.getTime() === b.getTime()
    if (!a || !b || (typeof a !== 'object' && typeof b !== 'object')) return a === b
    if (a.prototype !== b.prptotype) return false
    let keys = Object.keys(a)
    if (keys.length !== Object.keys(b).length) return false
    return keys.every(v => equals(a[v], b[v]))
}

const res1 = equals(
    { a: [2, { e: 3 }], b: [4], c: 'foo' },
    { a: [2, { e: 3 }], b: [4], c: 'foo' }
)
console.log(res1)
console.log(equals([1, 2, 3], { 0: 1, 1: 2, 2: 3 }))
