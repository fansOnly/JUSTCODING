/**
 * queryStringToObject
 * Generates an object from the given query string or URL
 * 1. Use String.prototype.split() to get the params from the given URL.
 * 2. Use new URLSearchParams() to create an appropriate object and convert it to an array of key-value pairs using the spread operator(...)
 * 3. Use Array.prototype.redcue() to convert the array of key-value pairs into an object.
 */
const queryStringToObject = url => {
    return [...new URLSearchParams(url.split('?')[1])].reduce((obj, [k, v]) => ((obj[k] = v, obj)), {})
    // return [...new URLSearchParams(url.split('?')[1])].reduce((acc, [k, v]) => ({...acc, [k]: v}), {})
}

console.log(queryStringToObject('https://google.com?page=1&count=10'))
