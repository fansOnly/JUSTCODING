/**
 * escapeHTML
 * Escapes a string for use in HTML.
 * 1. Use String.prototype.replace() with a regexp that matches the character that need to be escaped.
 * 2. Use the callback function to replace each other character instance with its associated escaped character using a dictionry (object).
 */
const escapeHTML = str => {
    return str.replace(/[&<>'"]/g, tag => {
        return ({
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            "'": '&#39',
            '"': '&quot;'
        }[tag] || tag)
    })
}

console.log(escapeHTML('<a href="#">Me & you</a>'))
