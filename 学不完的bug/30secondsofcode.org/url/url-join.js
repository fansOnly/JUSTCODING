/**
 * URLJoin
 * Joins all given URL segments together, then normalizes the resulting URL.
 * 1. Use Array.prototype.join('/') to combine URL segments.
 * 2. Use a series of String.prototype.replace() calls with various regexps to normalize the resulting URL (remove dobule slashes, add proper slashes for portocol, remove slashes before parameters, combine parameters with '&' and normalize first parameter delimiter)
 */
const URLJoin = (...args) => {
    return args.join('/').replace(/[\/]+/g, '/')
    .replace(/^(.+):\//, '$1://')
    .replace(/^file:\//, 'file:/')
    .replace(/\/(\?|&|#[^!])/g, '$1')
    .replace(/\?/g, '&')
    .replace('&', '?')
}

console.log(URLJoin('http://www.google.com', 'a', '/b/cd', '?foo=123', '?bar=foo'))
