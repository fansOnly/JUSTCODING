let date  = '2022-6-1 12:12:12'


const reg = /([a-zA-Z]+)|(\d{1,4})/g


const res = date.match(reg)
console.log('res: ', res);


function foo() {
  try {
    return 1
  } catch (error) {
    throw error
  } finally {
    return 'haha'
  }
}

console.log(foo());


function Pet(name) {
  this.name = name;

  this.getName = function() {
    return  this.name
  };
}

const cat = new Pet('Fluffy');

console.log(cat.getName()); // What is logged?

const getName = cat.getName
console.log(getName());




globalThis.length = 4

function callback() {
  console.log(this.length)
}

var obj = {
  length: 2,
  method(callback) {
    callback()
  },
  method2() {
    arguments[0]()
  }
}

obj.method(callback, 1, 2)
obj.method2(callback, 1, 2)


