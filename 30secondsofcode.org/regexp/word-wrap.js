/**
 * wordWrap
 * Wraps a string to a given number of characters using a string break character.
 * 1. Use String.prototype.replace() and a regular expression to insert a given break character at the nearest whitespace of max characters.
 * 2. Omit the third argument, br, to use the default value of '\n'.
 */
const wordWrap = (str, max, br = '\n') => {
    return str.replace(new RegExp(`(?![^\\n]{1,${max}}$)([^\\n]{1,${max}})\\s`, 'g'), '$1' + br)
}

const res =  wordWrap('Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce tempus.', 32)
console.log(res)

// Lorem ipsum dolor sit amet, 
// consectetur adipiscing elit. 
// Fusce tempus. 
