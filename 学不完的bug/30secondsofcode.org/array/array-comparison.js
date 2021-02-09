/**
 * JSON.stringify
 */
const equal = (a, b) => JSON.stringify(a) === JSON.stringify(b)

const a = [1, 2, 3];
const b = [1, 2, 3];
console.log(equal(a, b)) // true

const str = 'a';
const strObj = new String('a');

console.log(equal([str], [strObj])) // true  should be false
console.log(equal([null], [undefined])) // true should be false


/**
 * A better way
 */
const equal2 = (a, b) => {
    if (a.length !== b.length) return false
    return a.every((v, i) => v === b[i])
}
console.log(equal2(a, b)) // true
console.log(equal2([str], [strObj])) // false
console.log(equal2([null], [undefined])) // false

const v1 = [1, 'a', [], 3, '44']
const v2 = ['a', [], 1, '44', 3]
console.log(equal2(v1, v2)) // false


/**
 * Comparing out of order
 * 1. Use for...of loop over a Set created from the values of both arrays.
 * 2. Use Array.prototype.filter() to compare the amount of occurrences of each distinct value in both arrays.
 * 3. Return false if the counts do not match for any element, true otherwise
 */
const equal3 = (a, b) => {
    const unique = [...new Set(a, b)]
    for (const v of unique) {
        const lenA = a.filter(x => v === x).length
        const lenB = b.filter(x => x === v).length
        if (lenA !== lenB) return false
    }
    return true
}

console.log(equal3(a, b)) // true
console.log(equal3([str], [strObj])) // false
console.log(equal3([null], [undefined])) // false
console.log(equal3(v1, v2)) // false
