/**
 * 六、寄生组合式继承
 * 1. 完美解决各种其他继承方式的弊端
 */
function Parent(name) {
    this.name = name
    this.arr = [1, 2, 3]
}

Parent.prototype.say = function() {
    console.log(this.name)
}

function Child(name, age) {
    Parent.call(this, name)
    this.age = age
}

function inheritPrototype(sup, sub) {
    const prototype = Object.create(sup.prototype)
    sub.prototype = prototype
    prototype.constructor = sub
}

inheritPrototype(Parent, Child)

const c1 = new Child('c1', 10)
c1.arr.push('a')
console.log(c1.arr)
c1.say() // c1

const c2 = new Child('c2', 20)
console.log(c2.arr)
c2.say() // c2
