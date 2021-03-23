/**
 * hasKey
 * Checks if the target value exists in a JSON object.
 * 1. Check if keys is non-empty and use Array.prototype.every() to sequentially check its keys to internal depth of the object, obj.
 * 2. Use Object.prototype.hasOwnProperty() to check if obj does not have the current key or is not an object, stop propagation and return false.
 * 3. Otherwise assign the key's value to obj to use on the next iteration.
 * 3. Return false beforehand if given key list is empty.
 */
const hasKey = (obj, keys) => {
    return keys.length > 0 && keys.every(key => {
        if (typeof obj !== 'object' || !obj.hasOwnProperty(key)) {
            return false
        }
        obj = obj[key]
        return true
    })
}
let obj = {
    a: 1,
    b: { c: 4 },
    'b.d': 5
}

console.log(hasKey(obj, ['a'])) // true
console.log(hasKey(obj, ['b', 'c'])) // true
