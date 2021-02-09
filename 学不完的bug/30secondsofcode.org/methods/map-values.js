/**
 * mapValues
 * Maps the values of an object with the provided function, generating a new object with the same keys.
 * 1. Use Object.keys() to iterate over the object's keys.
 * 2. Use Array.prototype.reduce() to creates a new object with the same keys and mepped values using fn.
 */
const mapValues = (obj, fn) => {
    return Object.keys(obj).reduce((acc, key) => {
        acc[key] = fn(obj[key], key, obj)
        return acc
    }, {})
}

const users = {
    fred: { user: 'fred', age: 40 },
    pebbles: { user: 'pebbles', age: 1 }
}

console.log(mapValues(users, u => u.age))
