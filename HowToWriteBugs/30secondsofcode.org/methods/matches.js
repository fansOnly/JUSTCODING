/**
 * matches
 * Compares two objects to determine if the first one contains equivalent property values to the second one.
 * 1. Use Object.keys() to get all the keys of the second object.
 * 2. Use Array.prototype.every(), Object.prototype.hasOwnProperty() and strict comparison to determine if all keys exsits in the first object and have the same values.
 */
const matches = (obj, source) => {
    return Object.keys(source).every(key => {
        return obj.hasOwnProperty(key) && obj[key] === source[key]
    })
}

console.log(matches({ age: 25, hair: 'long', beard: true }, { hair: 'long', beard: true }))
