/**
 * Mutates the original array to filter out the values specified, based on a given iterator function.
 * 1. Check if the last argument provided is a function.
 * 2. Use Array.prototype.map() to apply the iterator function fn to all array elements.
 * 3. Use Array.prototype.filter() and Array.prototype.includes() to pull out the values that are not needed.
 * 4. Set Arry.prototype.length to mutate the passed in an array by resetting its length to 0.
 * 5. Use Array.prototype.push() to re-populateit with only the pulled values.
 */
const pullBy = (arr, ...args) => {
    const { length } = args
    let fn = length > 1 ? args[length - 1] : undefined
    fn = typeof fn === 'function' ? (args.pop(), fn) : undefined
    return arr.filter(v => !(Array.isArray(args[0]) ? args[0] : args).map(x => fn(x)).includes(fn(v)))
}

var myArray = [{ x: 1 }, { x: 2 }, { x: 3 }, { x: 1 }]
const res = pullBy(myArray, [{ x: 1 }, { x: 3 }], o => o.x)
console.log('res: ', res) // [ { x: 2 } ]

const res2 = pullBy(myArray, { x: 1 }, o => o.x)
console.log('res2: ', res2) // [ { x: 2 }, { x: 3 } ]
