/**
 * isAbsoluteURL
 * Check if the given string is an absolute url
 * 1. Use RegExp.prototype.test() to test if the string is an absolute url
 */
const isAbsoluteURL = str => /^[a-z][a-z0-9+-.]*:/.test(str)


console.log(isAbsoluteURL('https://google.com'))
