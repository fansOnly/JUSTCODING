{
  a = 1
  function a() { }
  a = 2
  console.log(a)
}
console.log(a)



function fn(a, c) {
  console.log(a)
  var a = 123
  console.log(a)
  console.log(c)
  function a() {}
  if (false) {
    var d = 456
  }
  console.log(d)
  console.log(b)
  var b = function () {}
  console.log(b)
  function c() {}
  console.log(c
}

fn(1, 2)



(function (){
  a = 1
  function a() { }
  a = 2
  console.log(a)
})()
console.log(a)
