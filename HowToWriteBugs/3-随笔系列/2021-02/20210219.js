const arr = Array(10)


arr.fill('a', 0, 3)

console.log(arr)

for (let i = 0; i < arr.length; i++) {
    if (arr[i] === undefined) {
        console.log(i)
    }
}


console.log(([,,,]).length)

console.log(([1,2,3,]).length)


function getFileExtension(filename) {
    return filename.slice(((filename.lastIndexOf(".") - 1) >>> 0) + 2);
}

console.log(getFileExtension('a.js')) // js
console.log(getFileExtension('.hiddenfile'))

console.log(Object.is(NaN, NaN)) // true
console.log(Object.is(+0, -0)) // false


var u = 'http://www.google.com?a=1&b=2&c=http://127.0.0.1:8081/#/page/index&d=[1,2]'
console.log(encodeURIComponent(u))
console.log(encodeURI(u))
