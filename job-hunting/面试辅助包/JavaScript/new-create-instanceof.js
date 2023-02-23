/**
 * 1. 创建一个新对象，将原型指向传入的构造函数
 * 2. 将构造函数的 this 指向新创建的对象
 * 3. 如果构造函数返回一个引用类型的值, 直接返回这个值
 * 4. 否则, 则返回创建的对象
 */
function myNew(ctor, ...args) {
  const target = Object.create(ctor.prototype)
  const res = ctor.call(target, ...args)
  // 1.忽略构造函数返回的普通值
  // 2.如果构造函数返回对象类型，则返回这个对象
  // 3.否则返回初始对象
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
/**
 * 1. 创建一个函数
 * 2. 将函数的原型指向当前继承的原型
 * 3. 返回当前原型继承的实例
 */
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
