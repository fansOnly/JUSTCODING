/**
 * 实现 Object.create()
 * 1. 创建一个空的构造函数
 * 2. 将新创建的函数的原型指向传入的对象
 * 3. 返回这个构造函数的实例,一个继承obj原型属性的纯净对象
 */
function myCreate(obj) {
    function F() {}
    F.prototype = obj
    return new F()
}

function Parent() {}

const obj = new Parent()


const p1 = Object.create(obj)
console.log(p1)

const p2 = myCreate(obj)
console.log(p2)
