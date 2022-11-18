/**
 * es6 Class 继承语法糖
 * ES5 的继承，实质是先创造子类的实例对象this，然后再将父类的方法添加到this上面。
 * ES6 的继承机制完全不同，实质是先将父类实例对象的属性和方法，加到this上面（所以必须先调用super方法），然后再用子类的构造函数修改this
 */
class Parent {
    constructor(name) {
        this.name = name
        this.arr = [1, 2, 3]
    }
    say() {
        console.log(this.name)
    }
}

class Child extends Parent {
    constructor(name, game) {
        super(name)
        this.game = game
    }
    play() {
        console.log(this.game)
    }
}

const c1 = new Child('c1', 'swim')
c1.say() // c1
c1.arr.push('a')
console.log(c1)

const c2 = new Child('c2', 'paint')
console.log(c2)
c2.play() // paint
