/**
 * Creates an object containing the parameters of the current URL
 * 1. Use String.prototype.match() with an appropriate regular expression to get all key-value pairs.
 * 2. Use String.prototype.reduce() to map an combine them into a single object.
 * 3. Pass location.search as the argument to apply to the current url.
 */
const getURLParameters = url => {
    return (url.match(/([^?=&]+)(=[^&]*)/g) || []).reduce((acc, cur) => (acc[cur.split('=')[0]] = cur.split('=')[1], acc), {})
}

console.log(getURLParameters('google.com'))
const res = getURLParameters('http://url.com/page?name=Adam&surname=Smith')
console.log('res: ', res);
