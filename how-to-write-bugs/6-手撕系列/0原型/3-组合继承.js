/**
 * 三、组合继承
 * 1. 父类原型方法复用
 * 2. 子实例初始化可以传参
 * 3. 父类引用类型属性不会被子实例共享
 * 4. 父类构造函数会被初始化两次
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

Child.prototype = new Parent()

const c1 = new Child('c1')
const c2 = new Child('c2')
c1.info.age = 20

console.log(c1)
console.log(c2)

c1.say()
