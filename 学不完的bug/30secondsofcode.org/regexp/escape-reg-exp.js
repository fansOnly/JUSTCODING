/**
 * escapeRegExp
 * Escapes a string to use in regular expression
 * 1. Use String.prototype.replace() to escape special characters.
 */
const escapeRegExp = str => {
    return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

console.log(escapeRegExp('(test)'))
