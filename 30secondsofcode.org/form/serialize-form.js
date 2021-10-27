/**
 * serializeForm
 * Encodes a set of form elements as a query string.
 * 1. Use the FormData constructor to convert the HTML form to FormData.
 * 2. Use Array.from() to convert to an array, passing a map function as the second argument.
 * 3. Use Array.prototype.map() and encodeURIComponent() to encode each filed's value.
 * 4. Use Array.prototype.map() with appropriate arguments to produce an appropriate query string.
 */
const serializeForm = form => {
    return Array.from(new FormData(form), field => {
        field.map(encodeURIComponent).join('=')
    }).join('&')
}
