/**
 * Dig
 * Gets the target value in a nested JSON object, based on the given key.
 * 1. Use the in operator to check if target exsits in obj.
 * 2. If found, return the value of the obj[target].
 * 3. Otherwise, use Object.values(obj) and Array.prototype.reduce() to recursively call dig on each nested object until the first matching key/target pair is found.
 */
const dig = (obj, target) => {
    return target in obj ? obj[target] : Object.values(obj).reduce((acc, val) => {
        if (acc !== undefined) return acc
        if (typeof val === 'object') return dig(val, target)
    }, undefined)
}

const data = {
    level1: {
      level2: {
        level3: 'some data'
      }
    }
}

console.log(dig(data, 'level3'))
console.log(dig(data, 'level4'))
