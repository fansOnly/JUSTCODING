/**
 * objectToQueryString
 * Generates a query string from the key-value pairs of the given object.
 * 1. Use Array.prototype.reduce() and Object.entries(queryParameters) to create the qyery string.
 * 2. Dateemine(确定) the symbol to be ethier ? or & based on the length of the queryString.
 * 3. Concatenate(连接) val to queryString only if it's a string.
 * 4. Return the queryString or an empty string when the queryParametersare falsy.
 */
const objectToQueryString = queryParameters => {
    return Object.entries(queryParameters).reduce((acc, [key, value]) => (acc += typeof value === 'string' ? `${(acc.length === 0 ? '?' : '&')}${key}=${value}` : '', acc), '')
}

console.log(objectToQueryString({ page: '1', size: '2kg', key: undefined }))
