/**
 * Returns the human-readable format of the given number of milliseconds.
 * 1. Divide ms with the appropriate values to obtain the approprite values for day, hours, minute, second, millisecond
 * 2. Use Object.entries() with Array.prototype.filter() to keep only non-zero values.
 * 3. Use Array.prototype.map() to create the string for each value, pluralizing appropriately.
 * 4. Use String.prototype.join(', ') to combine the values into a string.
 */
const formatDuration = ms => {
    const time = {
        day: Math.floor(ms / 86400000),
        hour: Math.floor(ms / 360000) % 24,
        minute: Math.floor(ms / 60000) % 60,
        second: Math.floor(ms / 1000) % 60,
        millisecond: Math.floor(ms) % 1000
    }
    return Object.entries(time)
    .filter(([val]) => val !== 0)
    .map(([key, val]) => `${val} ${key}${val > 1 ? 's' : ''}`)
    .join(', ')
}

const res = formatDuration(34325055574)
console.log('res: ', res);
// 397 days, 19 hours, 44 minutes, 15 seconds, 574 milliseconds
