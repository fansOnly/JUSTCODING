const data = {
    obj: {
        name: '11111',
        info: {
            age: 10,
        },
        list: ['a', 'b', 'c']
    },
    toString: function() {
        return 'sss'
    },
    valueOf: function() {
        return 100
    }
}


var path = 'obj.list'
var index = 1

var paths = path.split('.')
console.log(paths)

console.log(eval(`(data.${path}[${index}]=99)`))

console.log(data)



console.log(undefined == undefined) // true
console.log(undefined === undefined) // true

console.log(NaN === NaN) // false

console.log(Object.is(NaN, NaN)) // true

console.log(Object.is(-0, +0)) // true



for (let i in data) {
    console.log(i)
}


const arr = [1,2,3,4,5]
console.log(arr.toString())
console.log(arr.valueOf())

var obj = {
    a: 1,
    b: 2
}

console.log(obj.toString())
console.log(obj.valueOf())
console.log(obj.toString() === '[object Object]')
