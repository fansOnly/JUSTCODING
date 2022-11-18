/**
 * 一、原型链继承
 * 1. 父类原型方法可以被子类复用
 * 2. 子实例初始化时不能传参
 * 3. 父类引用类型的属性子实例会共享
 */
function Parent(name) {
    this.name = name
    this.info = {
        age: 10
    }
}
Parent.prototype.say = function() {
    console.log({
        name: this.name,
        ...this.info
    })
}

function Child() {}

Child.prototype = new Parent()

const c1 = new Child()
const c2 = new Child()
c1.info.age = 20
console.log(c1.info === c2.info) // true
console.log(c1.say())
console.log(c2.say())
