export function isObject(val) {
    return val !== null && typeof val === 'object'
}

export function remove(arr, item) {
    if (arr.length) {
        const index = arr.indexOf(item)
        if (index > -1) {
            arr.splice(index, 1)
        }
    }
}

export function isValidArrayIndex(val) {
    const n = parseFloat(String(val))
    return n >= 0 && Math.floor(n) === n && isFinite(n)
}

export function hasOwn(target, key) {
    return Object.prototype.hasOwnProperty.call(target, key)
}

export function def(target, key, val, enumerable) {
    Object.defineProperty(target, key, {
        value: val,
        enumerable: !!enumerable,
        writable: true,
        configurable: true
    })
}

// Firefox has a "watch" function on Object.prototype...
export const nativeWatch = ({}).watch

export function noop() {}

export function isPlainObject(val) {
    return Object.prototype.toString.call(val) === '[object Object]'
}
