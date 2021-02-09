/**
 * Converts an array of objects to a common-separated values (CSV) string that contains only the columns specified.
 * 1. Use Array.prototype.join(delimiter) to combine all the names in columns to create the first row.
 * 2. Use Array.prototype.map() and Array.prototype.reduce() to create a row for each object, subsituting non-exsitent values with empty strings and only mapping values in columns.
 * 3. Use Array.prototype.join('\n') to combine all rows into a string.
 * 4. Omit the third argument, delimiter, to use a default delimiter of ','.
 */
const JSONtoCSV = (arr, columns, delimiter = ',') => {
    return [...columns, ...arr.map(obj => {
        return columns.reduce((acc, cur) => `${acc}${acc.length ? delimiter : ''}"${obj[cur] ? obj[cur] : ''}"`, '')
    }, [])].join('\n')
}

const res = JSONtoCSV(
    [{ a: 1, b: 2 }, { a: 3, b: 4, c: 5 }, { a: 6 }, { b: 7 }],
    ['a', 'b']
)
console.log(res)
// a 
// b 
// "1","2" 
// "3","4" 
// "6","" 
// "","7" 
