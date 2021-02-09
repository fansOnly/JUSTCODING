/**
 * deepGet
 * Gets the target value in a nested JSON object, based on the keys array.
 * 1. Compare the keys you want in the nested JSON object as an array.
 * 2. Use Array.prototype.reduce() to get the values of the nested JSON object one by one.
 * 3. If the key exsits in the object, return the target value, otherwise return null.
 */
const deepGet = (obj, keys) => {
    return keys.reduce((acc, key) => {
        return (acc && acc[key] !== null && acc[key] !== undefined) ? acc[key] : null
    }, obj)
}
const data = {
    foo: {
        foz: [1, 2, 3],
        bar: {
            baz: ['a', 'b', 'c']
        }
    }
}

console.log(deepGet(data, ['foo', 'foz', 2])) // 3
console.log(deepGet(data, ['foo', 'bar', 'baz', 8, 'foz'])) // null
