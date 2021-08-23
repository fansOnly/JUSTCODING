let fn = function f() {}

const res = fn.toString().match(/^\s*function (\w+)/)

console.log(res && res[1])
