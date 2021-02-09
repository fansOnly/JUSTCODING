/**
 * Replaces the names of multiple object keys withs the values provided.
 * Use Object.keys()in combination with Array.prototype.reduce() and the speread (...) to get the object keys and rename them according to the keyMap.
 */
const renameKeys = (keyMap, obj) => {
    return Object.keys(obj).reduce((acc, cur) => ({
        ...acc,
        [keyMap[cur] || cur]: obj[cur]
    }), {})
}

const obj = {
    name: 'john',
    age: 30,
    high: 180
}
const res = renameKeys({name: 'firstName', age: 'realAge'}, obj)
console.log('res: ', res);
