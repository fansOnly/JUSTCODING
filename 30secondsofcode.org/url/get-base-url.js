/**
 * getBaseURL
 * Gets the current URL without any parametersor fragment identifiers.
 * 1. Use String.prototype.replace() with an appropriate regular expression to remove everything after either '?' or '#', if found.
 */
const getBaseURL = url => url.replace(/\/?[?#].*$/, '')

console.log(getBaseURL('http://url.com/page?name=Adam&surname=Smith'))

console.log(getBaseURL('http://url.com/test/#page?name=Adam&surname=Smith'))

console.log(getBaseURL('http://url.com/test/#/page?name=Adam&surname=Smith'))
