// es5  原型链继承
function Parent() {
    this.name = ['p1'] 
}
Parent.prototype.getName = function() {
    return this.name
}
function Child() {}

// 无法向父类的构造方法传参
Child.prototype = new Parent();
Child.prototype.constructor = Child;

const c1 = new Child()
const c2 = new Child()

console.log(c1.__proto__)

console.log(c1.name, c1.getName())
console.log(c2.name, c2.getName())

// 对于某一个子类实例的修改会影响其他实例
c1.name[0] = 'c1'

console.log(c1.name, c1.getName())
console.log(c2.name, c2.getName())




// es5 构造函数继承
function Parent2(name) {
    this.name = [name]
}
Parent2.prototype.getName = function() {
    return this.name
}

function Child2(name) {
    Parent2.call(this, name)
}

const c3 = new Child2('c3')
const c4 = new Child2('c4')

console.log(c3.__proto__)

console.log(c3.name)
console.log(c4.name)

c3.name[0] = 'c33'

console.log(c3.name)
console.log(c4.name)

// 继承不到父类原型上的实例和方法
// console.log(c3.getName())  // c3.getName is not a function




// 组合式继承
function Parent3(name) {
    this.name = [name]
}
Parent3.prototype.getName = function() {
    return this.name
}

function Child3(name) {
    Parent3.call(this, name)
}

// 每次创建实例都会执行两次构造函数，子类创建的的实例原型中会存在两份相同的属性和方法
Child3.prototype = new Parent3('p3');
Child3.prototype.constructor = Child3;

const c5 = new Child3('c5')
const c6 = new Child3('c6')

console.log(c5.__proto__)

console.log(c5.name)
console.log(c6.name)

c5.name[0] = 'c55'

console.log(c5.name)
console.log(c6.name)

console.log(c5.getName())




// 寄生式组合继承  -- 基础版
function Parent4(name) {
    this.name = [name]
}
Parent4.prototype.getName = function() {
    return this.name
}

// 1  父类实例的原型默认指向父类原型
const p4 = new Parent4('p4')
console.log(p4.__proto__)

function Child4(name) {
    Parent4.call(this, name)
}

// 1 子类的原型修改会影响父类的原型
Child4.prototype = Parent4.prototype;
Child4.prototype.constructor = Child4;

// 1 此时父类实例的原型指向了子类原型
console.log(p4.__proto__)

const c7 = new Child4('c7')
const c8 = new Child4('c8')

console.log(c7.__proto__)

console.log(c7)
console.log(c8)

c7.name[0] = 'c77'

console.log(c7)
console.log(c8)
console.log(c8.getName())

// 1 父类原型的 getName 会被子原型修改
Child4.prototype.getName = function() {
    return ['child4']
}
console.log(c8.getName())

// 1 父类原型跟随子类原型新增 hello 方法
Child4.prototype.hello = function() {
    return 'hello'
}

console.log(p4.getName())
console.log(p4.hello())





// 寄生式组合继承  -- 优化版
function Parent5(name) {
    this.name = [name]
}

Parent5.prototype.getName = function() {
    return this.name
}

function Child5(name) {
    Parent5.call(this, name)
}

// 2 子类原型指向父类原型的浅拷贝
Child5.prototype = Object.create(Parent5.prototype)
Child5.prototype.constructor = Child5


const p5 = new Parent5('p5')
console.log(p5)
console.log(p5.__proto__)
console.log(p5.getName())


const c9 = new Child5('c9')
const c10 = new Child5('c10')
console.log(c9.__proto__)

console.log(c9)
console.log(c10)

c9.name = 'c99'

console.log(c9)
console.log(c9.getName())

// 2 父类原型的方法不会跟随子类原型的修改
Child5.prototype.getName = function() {
    return ['child5']
}
console.log(c9.getName())

// 2 父类原型的方法不会跟随子类原型的新增
Child5.prototype.hello = function() {
    return 'hello'
}

// 2 父类原型的方法未被修改
console.log(p5.getName())
// console.log(p5.hello()) // p5.hello is not a function