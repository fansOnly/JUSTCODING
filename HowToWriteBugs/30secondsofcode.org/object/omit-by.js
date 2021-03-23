/**
 * omitBy
 * Omits the key-value pairs corresponding to the keys of the object for which the given function returns falsy.
 * 1. Use Object.keys() and Array.prototype.filter() to remove the keys for which fn retuens a truthy value.
 * 2. Use Array.prototype.reduce() to convert the filtered keys back to an object with the corresponding key-value pairs.
 * 3. The callback function is invoked with two arguments: (value, key)
 */
const omitBy = (obj, fn) => {
    return Object.keys(obj).filter(k => !fn(obj[k])).reduce((acc, key) => (acc[key] = obj[key], acc), {})
}

const res = omitBy({ a: 1, b: '2', c: 3 }, x => typeof x === 'number')
console.log('res: ', res);
