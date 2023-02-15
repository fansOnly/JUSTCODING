function myNew(ctor, ...args) {
  const target = Object.create(ctor.prototype)
  const res = ctor.call(target, ...args)
  return typeof res === 'object' && res !== null ? res : target
}

function Parent(name) {
  this.name = name
}
const p1 = myNew(Parent, 'p1')
console.log(p1) // Parent { name: 'p1' }

// ******************************************************
// ******************************************************
// ******************************************************
function myCreate(proto) {
  function F() { }
  F.prototype = proto
  return new F()
}

const p2 = new Parent('p2')
const p3 = myCreate(p2)
console.log(p2) // Parent { name: 'p2' }

// ******************************************************
// ******************************************************
// ******************************************************
function myInstanceOf(obj, proto) {
  let _proto = Object.getPrototypeOf(obj)
  while (_proto) {
    if (_proto === proto.prototype) return true
    _proto = Object.getPrototypeOf(_proto)
  }
  return false
}

console.log(myInstanceOf(p2, Parent)) // true
console.log(myInstanceOf(p3, Parent)) // true
