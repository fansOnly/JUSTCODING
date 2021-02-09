/**
 * Deep freezes an object.
 * 1. Use Object.keys() to get all the properties of the passed object, Array.prototype.forEach() to iteratover them.
 * 2. Call Object.freeze(obj) recursively on all properties, apply deepFreeze() as necessary.
 * 3. Finally, use Object.freeze() to freeze the given object.
 */
const deepFreeze = obj => {
    Object.keys(obj).forEach(key => {
        if (typeof obj[key] === 'object') {
            deepFreeze(obj[key])
        }
    })
    return Object.freeze(obj)
}

const val = deepFreeze([1, [2, 3]]);

val[0] = 3

val[1][0] = 3
