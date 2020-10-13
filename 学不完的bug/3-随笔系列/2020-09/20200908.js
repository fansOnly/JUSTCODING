function Foo() {
    getName = function() {
        return 1
    }
    return this;
}

Foo.getName = function() {
    return 2
}

Foo.prototype.getName = function() {
    return 3
}

var getName = function() {
    return 4
}

function getName() {
    return 5
}

console.log(Foo.getName()) // 2  对象方法

console.log(getName()) // 4  全局方法直接执行, 赋值变量

// console.log(Foo().getName()) // 1 ? 改写全局getName方法
// console.log(Foo())  // 相当于先执行官Foo(), 在执行getName()

console.log(getName()) // 1 

console.log(new Foo) // object Foo
console.log(new Foo()) // constructor Foo

console.log(new Foo.getName()) // 2  执行对象方法

console.log(new Foo().getName()) // 3  构造函数方法

console.log(new new Foo().getName()) // 3
