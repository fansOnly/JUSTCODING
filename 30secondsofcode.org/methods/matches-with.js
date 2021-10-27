/**
 * matchesWith
 * Compares two objects to determine if the first one contains equivalent propery values to the second one, based on a provided function.
 * 1. Use Object.keys() to get all the keys of the second object.
 * 2. Use Array.prototype.every(), Object.prototype.hasOwnProperty() and the provided function to determine if the all keys exsits in the first object and have equivalent values.
 * 3. If none function is provided, the values will be compared using the equality operstor.
 */
const matchesWith = (obj, source, fn) => {
    return Object.keys(source).every(key => {
        return obj.hasOwnProperty(key) && fn ? fn(obj[key], source[key], key, obj, source) : obj[key] === source[key]
    })
}

const isGreeting = val => /^h(?:i|ello)$/.test(val)
const res = matchesWith(
  { greeting: 'hello' },
  { greeting: 'hi' },
  (oV, sV) => isGreeting(oV) && isGreeting(sV)
)
console.log(res)
