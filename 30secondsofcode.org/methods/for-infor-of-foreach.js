/**
 * for...in is used to iterate over all enumerable properties of an object, including inherited enumerable properties.
 * This interation statement can be used with arrays strings or plain objects, but not with Map or Set objects.
 */
for (let p in [1, 2, 3]) {
    console.log(p) // 0, 1, 2
}

for (let s in 'asb') {
    console.log(s) // 0, 1, 2
}

for (let k in {a: 1, b:2}) {
    console.log(k) // a, b
}

/**
 * for...of is used to iterate over iterable objects, interating over their values instead of their properties.
 * This interation statement can be used with arrays, strings, Map or Set objects, but not with plain objects. 
 */
for (let val of [1,2,3]) {
    console.log(val) // 1, 2, 3
}

for (let val of 'abs') {
    console.log(val) // a, b, s
}

for (let val of new Set('set')) {
    console.log(val) // s, e, t
}

var map = new Map()
var obj = {}
map.set(obj, 1)
for (let val of map) {
    console.log(val) // [ {}, 1 ]
}


/**
 * Finally, forEach() is a method of the Array prototype, which allows you to iterate over the elements of an array.
 * While forEach() only iterates over arrays, it can access both the value an the index of each element while iterating.
 */
['a', 'b', 'c'].forEach((val, index) => {
    console.log(val, index) // a 0, b 1, c 2
})
