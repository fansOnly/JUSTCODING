/**
 * mapKeys
 * Maps the keys of an object using the provided function, generating a new object.
 * 1. Use Object.keys() to iterate over the object's keys.
 * 2. Use Array.prototype.reduce() to create a new object with the same values and mapped keys using fn.
 */
const mapKeys = (obj, fn) => {
    return Object.keys(obj).reduce((acc, key) => {
        acc[fn(obj[key], key, obj)] = obj[key]
        return acc
    }, {})
}
const res = mapKeys({ a: 1, b: 2 }, (val, key) => key + val); 
console.log('res: ', res); // { a1: 1, b2: 2 }
