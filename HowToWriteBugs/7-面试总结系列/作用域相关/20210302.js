function Foo() {
    // 此处不用关键词生命默认为全局
    getName = function () {
        return 1
    };
    return this;
}
Foo.getName = function () {
    return 2
};
Foo.prototype.getName = function () {
    return 3
};
var getName = function () {
    return 4
};
function getName() {
    return 5
}

// 读取 Foo 对象上的 getName() 函数
console.log(Foo.getName()) // 2

// 输出全局的 getName() 函数
console.log(getName()) // 4

// Foo() 执行时改写了全局的 getName() 函数，Foo() 函数执行后返回this 即 window，所以最终运行的时全局的 getName() 函数
// console.log(Foo().getName())  // 1

// 全局的 getName() 函数，已经在上一步被改写
// console.log(getName()) // 1

// (new Foo.getName)()
console.log(new Foo.getName()) // 2

// (new Foo()).getName()
console.log(new Foo().getName()) // 3

// new ((new Foo()).getName)()
console.log(new new Foo().getName()) // 3
