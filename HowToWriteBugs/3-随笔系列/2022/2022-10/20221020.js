console.log(Function.prototype)
console.log(Function.__proto__);

function Foo() {}
console.log(Foo.__proto__ === Function.prototype);

const obj = new Function()
console.log(obj.__proto__);

function Object() {}
console.log(Object.__proto__ === Function.prototype);


//
new Promise((resolve, reject) => {
  resolve(11)
  // reject('11')
}).then((res) => {
  console.log(res)
  throw 22
}).catch(err => {
  console.log(err)
  throw 11
}).catch(err => {
  console.log(err)
})
