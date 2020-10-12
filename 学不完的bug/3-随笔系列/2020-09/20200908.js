function Foo() {
    getName = function() {
        console.log(1)
    }
    return this;
}

Foo.getName = function() {
    console.log(2)
}

Foo.prototype.getName = function() {
    console.log(3)
}

var getName = function() {
    console.log(4)
}

function getName() {
    console.log(5)
}

Foo.getName() // 2  对象方法

getName() // 4  全局方法直接执行

Foo().getName() // 1 ? 改写全局getName方法

getName() // 1 

new Foo.getName() // 2

new Foo().getName() // 3  构造函数方法

new new Foo().getName() // 3
