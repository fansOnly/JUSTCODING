/**
 * deepMapKeys
 * Deep map an object's keys.
 * 1. Creates an object with the same values as the provided object and keys generated by running the peovided function for each key.
 * 2. Use Object.keys(obj) to iterate over the object's keys.
 * 3. Use Array.prototype.reduce() to create a new object with the same values and mapped keys using fn.
 */
const deepMapKeys = (obj, fn) => {
    return Array.isArray(obj) ? (
        obj.map(v => deepMapKeys(v, fn))
    ) : (
        typeof obj === 'object' ?
        Object.keys(obj).reduce((acc, cur) => {
            const key = fn(cur)
            const val = obj[cur]
            acc[key] = val !== null && typeof val === 'object' ? deepMapKeys(val, fn) : val
            return acc
        }, {}) : obj
    )
}

const obj = {
    foo: '1',
    nested: {
      child: {
        withArray: [
          {
            grandChild: ['hello']
          }
        ]
      }
    }
}
const upperKeysObj = deepMapKeys(obj, key => key.toUpperCase());
console.log('upperKeysObj: ', upperKeysObj);
