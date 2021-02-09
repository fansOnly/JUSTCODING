/**
 * reducedFilter
 * Filters an array of objects based on a condition while also filtering out unspecified keys.
 * 1. Use Array.prototype.filter() to filter the array based on the redicate fn so that it returns the objects for which the condition returned a truthy value.
 * 2. On the filtered array, use Array.prototype.map() to return the new object.
 * 3. Use Array.prototype.reduce() to filter out the keys which wre not supplied as the keys arguments.
 */
const reducedFilter = (arr, keys, fn) => {
    return arr.filter(fn).map(v => {
        return keys.reduce((acc, key) => {
            acc[key] = v[key]
            return acc
        }, {})
    })
}
const data = [
    {
      id: 1,
      name: 'john',
      age: 24
    },
    {
      id: 2,
      name: 'mike',
      age: 50
    }
]

console.log(reducedFilter(data, ['id', 'name'], item => item.age > 24))
