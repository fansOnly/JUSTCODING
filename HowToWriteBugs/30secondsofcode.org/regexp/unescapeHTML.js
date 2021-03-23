/**
 * unescapeHTML
 * Unescapes escaped HTML charators.
 * 1. Use String.prototype.replace() with a regexp that matches the characters that need to be unescaped.
 * 2. Use the function's callback to replace each escaped charactor instance with its associated unescaped charactor using a dictionary (object).
 */
const unescapeHTML = str => {
    return str.replace(/&amp;|&lt;|&gt;|&#39;|&quot;/g, tag => ({
        '&amp;': '&',
        '&lt;': '<',
        '&gt;': '>',
        '&#39': "'",
        '&quot;': '"'
    }[tag] || tag))
}

console.log(unescapeHTML('&lt;a href=&quot;#&quot;&gt;Me &amp; you&lt;/a&gt;'))
