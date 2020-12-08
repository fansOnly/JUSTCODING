let a = Symbol.for('a')
a = Symbol.for('b')
console.log(a)
console.log(Symbol.keyFor(a))


class Foo {}
class Bar {
    static [Symbol.hasInstance]() {
        return false
    }
}

const f1 = new Foo()
console.log(f1 instanceof Foo)
console.log(Foo[Symbol.hasInstance](f1)) // true

const b1 = new Bar()
console.log(b1 instanceof Bar) // false


let s = new Set()

console.log(s) // Set {}
console.log(s.toString()) // [object Set]
console.log(s[Symbol.toStringTag]) // Set

// 自定义类实例需要明确定义对象标识符
let foo = new Foo()
console.log(foo) // Foo {}
console.log(foo.toString()) // [object object]
console.log(foo[Symbol.toStringTag])  // undefined

