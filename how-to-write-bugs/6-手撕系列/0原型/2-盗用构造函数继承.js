/**
 * 二、构造函数继承
 * 1. 不能继承父类原型方法
 * 2. 子实例初始化跨域传参
 * 3. 父类上的引用类型的属性不会被子实例共享
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

function Child(name) {
    Parent.call(this, name)
}

Child.prototype.say2 = function() {
    console.log({
        name: this.name,
        ...this.info
    })
}

const d1 = new Child('d1')
const d2 = new Child('d2')
d1.info.age = 20

console.log(d1)
console.log(d2)

console.log(d1.say) // undefined
d1.say2()
