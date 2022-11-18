var timezone = -8
var offset = new Date().getTimezoneOffset()
console.log('offset: ', offset);
var date = new Date().getTime()
var target = new Date(date + offset * 60 * 1000 + timezone * 60 * 60 * 1000)
console.log('target: ', target);




var obj = {
  a: 1,
  b: 2,
  c: 'c'
}

Object.assign(obj, {
  a: undefined,
  b: null,
  c: ''
})

console.log(obj)
