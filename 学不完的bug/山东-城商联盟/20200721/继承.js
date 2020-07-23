// 继承
function Father(name) {
    this.name = name
}
Father.prototype.say = function () {
    console.log('say =>', this.name)
}
// 1 原型继承
function Child(name) {
    this.name = name
}
Child.prototype = new Father()
var c1 = new Child('c1')
c1.say() // say => c1
// 2 构造函数继承
function Child2(name) {
    Father.call(this, name)
}
var c2 = new Child2('c2')
console.log('c2.name', c2.name)
// 3 组合继承
function Child3(name) {
    Father.call(this, name)
}
Child3.prototype = new Father()
var c3 = new Child3('c3')
c3.say() // say => c3
// 4 寄生继承
function clone(obj) {
    var o = Object.create(obj)
    o.say = function () {
        console.log('this is cone')
    }
    return o
}
var Child5 = clone(Father)
console.log('c5', Child5)
Child5.say() // this is clone
// 5 组合寄生继承
var Child6 = function (name) {
    Father.call(this, name)
}
function inhertPrototype(sub, sup) {
    var o = Object.create(sup.prototype)
    sub.prototype = o
    o.constructor = sub
}
inhertPrototype(Child6, Father)
var c6 = new Child6('c6')
console.log(c6.__proto__.__proto__.__proto__.__proto__)
c6.say() // say => c6
// 6 es6 class 继承
class Father2 {
    constructor(name) {
        this.name = name
    }
    say() {
        console.log('say', this.name)
    }
}
class Child4 extends Father2 {
    constructor(name) {
        super(name)
    }
}
var c4 = new Child4('c4')
c4.say() // say c4
