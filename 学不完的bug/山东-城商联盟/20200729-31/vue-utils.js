
/**
   * Create a cached version of a pure function.
   */
function cached(fn) {
    var cache = Object.create(null)
    return function cacheFn(str) {
        var hit = cache[str]
        return hit || (cache[str] = fn(str))
    }
}

/**
   * Capitalize a string.
   */
var capitalize = cached(function (str) {
    return str.charAt(0).toUpperCase() + str.slice(1)
})

/**
   * Convert an Array-like object to a real Array.
   */
function toArray(list, start) {
    start = start || 0
    var i = list.length - start
    var ret = new Array(i)
    while (i--) {
        ret[i] = list[i + start]
    }
    return ret
}

/**
   * Mix properties into target object.
   */
function extend(to, _from) {
    for (var key in _from) {
        to[key] = _from[key]
    }
    return to
}
