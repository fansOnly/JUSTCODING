/**
 * 四、原型式继承
 * 对参数对象的一种复制
 * Object.create()
 * 1. 方法复用
 * 2. 引用类型的属性共享内存地址
 * 3. 子类不能传参
 */
function create(obj) {
    function F() {}
    F.prototype = obj
    return new F()
}

const parent = {
    name: 'p',
    info: {
        age: 10
    },
    say() {
        console.log({
            name: this.name,
            ...this.info
        })
    }
}

const child1 = create(parent)
const child2 = create(parent)

console.log(child1)
child1.info.age = 20
console.log(child1.info)
child1.say()

console.log(child1.info === child2.info) // true
