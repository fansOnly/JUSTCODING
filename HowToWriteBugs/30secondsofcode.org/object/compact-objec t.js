/**
 * compactObject
 * Deeply removes all falsy value from an object or array.
 * 1. Use recursion.
 * 2. Initialize the iterable data, using Array.isArray(), Array.prototype.filter() and Boolean for arrays in order to avoid sparse arrays.
 * 3. Use Object.keys() and Array.prototype.reduce() to iterate each key with an appropriate initial value.
 * 4. Use Boolean to determine the truthness of each key's value and add it to the accumulator if it's truthy.
 * 5. Use typeOf() to determine if a given value is an object and call the function again to deeply compact it.
 */
const compactObject = val => {
    const data = Array.isArray(val) ? val.filter(Boolean) : val
    return Object.keys(data).reduce((acc, key) => {
        const value = data[key]
        if (Boolean(value)) {
            acc[key] = typeof value === 'object' ? compactObject(value) : value
        }
        return acc
    }, Array.isArray(val) ? [] : {})
}

const obj = {
    a: null,
    b: false,
    c: true,
    d: 0,
    e: 1,
    f: '',
    g: 'a',
    h: [null, false, '', true, 1, 'a'],
    i: { j: 0, k: false, l: 'a' }
}
console.log(compactObject(obj))
