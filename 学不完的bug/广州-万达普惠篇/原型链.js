function Person(name, age) {
    this.name = name;
    this.age = age;
}

Person.prototype.hobby = 'swim'

Person.prototype.say = function() {
    return `my name is ${this.name};`;
}

const p1 = new Person('john');

p1.gender = 'male'

console.log(p1.say())

console.log(Person.constructor)
console.log(Person.constructor === Function)

console.log(Person.prototype)
console.log(Person.prototype.__proto__ === Object.prototype)
console.log(Person.__proto__)
console.log(Person.__proto__ === Function.prototype)

console.log(p1.__proto__)
console.log(Person.prototype === p1.__proto__)

console.log(p1.constructor)
console.log(Person === p1.constructor)

console.log(Person.prototype.isPrototypeOf(p1))

console.log(Object.getPrototypeOf(p1) === Person.prototype)

console.log(Object.getPrototypeOf(p1).say)

console.log(p1.hobby)
console.log(p1.hasOwnProperty('hobby'))
p1.hobby = 'read'
console.log(p1.hobby)
console.log(p1.hasOwnProperty('hobby'))

console.log('name' in p1)
console.log(p1.hasOwnProperty('say'))
console.log('say' in p1)

const keys = Object.keys(p1)
console.log(keys)

console.log(Object.keys(Person.prototype))

console.log(Object.getOwnPropertyNames(Person.prototype))


// 对象字面量 -- 无构造函数指向
function School() {}

School.prototype = {
    name: 'shanghai',
    age: 25
}

const s1 = new School();

console.log(s1 instanceof School)
console.log(s1 instanceof Object)

console.log(s1.__proto__)
console.log(School.prototype)

console.log(s1.constructor) // 指向 Object
console.log(Object.keys(School.prototype))

// 对象字面量 -- 手动构造函数指向
function Job() {}

Job.prototype = {
    constructor: Job,  // 1、手动指向构造函数为自身, 此时 constructor 可枚举
    name: 'police',
    age: 25
}

const j1 = new Job();

console.log(j1 instanceof Job)
console.log(j1 instanceof Object)

console.log(j1.__proto__)
console.log(Job.prototype)

console.log(j1.constructor)
console.log(Object.keys(Job.prototype))

// 2、设置 constructor 不可枚举
Object.defineProperty(Job.prototype, 'constructor', {
    enumerable: false,
    value: Job
})

console.log(Object.keys(Job.prototype))


// 构造函数模式用于定义实例属性，而原型模式用于定义方法和共享属性


// 原型链
// 就是通过原型对象的constructor指向构造函数，实例对象通过__proto__指向原型对象。
const obj1 = {}
const obj2 = Object.create(obj1)

console.log(obj2.__proto__) // => obj1
console.log(obj2.__proto__ === obj1)
console.log(obj2.__proto__.__proto__ === Object.prototype)
console.log(obj2.__proto__.__proto__.__proto__)
console.log(Object.prototype.__proto__) // Object 原型的原型是 null (原型链的尽头)


function Sup() {
    this.propx = true;
}

Sup.prototype.getSupValue = function() {
    return this.propx;
}

function Sub() {
    this.subpropx = false;
}

Sub.prototype = new Sup();

Sub.prototype.getSubValue = function() {
    return this.subpropx;
}

const ins = new Sub();
console.log(ins.getSupValue());
console.log(ins.getSubValue());


// functions中有prototype，objects中有__proto__，prototype是函数才有的属性，__proto__是每个对象都有的属性，但__proto__不是一个规范属性，只是部分浏览器实现了此属性，对应的标准是[[Prototype]]

// 大多数情况下，__proto__可以理解为“构造器的原型”，即：__proto__===constructor.prototype。

// __proto__的指向取决于对象创建时的实现方式。



const obj = {
    is: function() {
        console.log(this)
    }
}

obj.is();

const nobj = new obj.is()

console.log(obj.__proto__ === Object.prototype)
console.log(nobj.__proto__ === Object.prototype)
console.log(nobj.__proto__ === obj.is.prototype)
console.log(nobj.__proto__.__proto__ === Object.prototype)