/**
 * Retrieves a set of properties indicated by the given selectors from an object.
 * 1. Use Array.prototype.map() for each selector, use String.prototype.replace() to replace square brackets of dots.
 * 2. Use String.prototype.split('.') to split each selector.
 * 3. Use Array.prototype.filter() to remove empty values and Array.prototype.reduce() to get the value indicated by each selector.
 */
function get(from, ...selectors) {
    return [...selectors].map(s => 
        s.replace(/\[([^\[\]]*)\]/g, '.$1.')
        .split('.')
        .filter(Boolean)
        .reduce((acc, cur) => acc && acc[cur], from)
    )
}

const obj = {
    selector: { to: { val: 'val to select' } },
    target: [1, 2, { a: 'test' }],
}

const res = get(obj, 'selector.to.val', 'target[0]', 'target[2].a')

console.log(res) // [ 'val to select', 1, 'test' ]
