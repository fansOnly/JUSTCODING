/**
 * 实现一个迭代器
 */
function iteratorGenerator(list) {
    var index = 0
    var len = list.length
    return {
        next() {
            let done = index >= len
            let value = done ? undefined : list[index++]
            return {
                value,
                done
            }
        }
    }
}

const iterator = iteratorGenerator([1,3,4])
console.log(iterator.next()) // { value: 1, done: false }
console.log(iterator.next()) // { value: 3, done: false }
console.log(iterator.next()) // { value: 4, done: false }
console.log(iterator.next()) // { value: undefined, done: true }

// ============================================================================================================

/**
 * 原型继承又来了
 * 最新babel es6 转码 extend 继承实现
 */
function _setPrototypeOf(o, p) {
    _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
        o.__proto__ = p
        return o
    }
    return _setPrototypeOf(o, p)
}
function _inherts(subClass, superClass) {
    if (typeof superClass !== 'function' && superClass !== null) {
        throw new TypeError('super expression must either be null or a function.')
    }
    subClass.prototype = Object.create(superClass && superClass.prototype, {
        constructor: {
            value: superClass,
            writable: true,
            configurable: true
        }
    })
    if (superClass) {
        _setPrototypeOf(subClass, superClass)
    }
}

function Parent(name) {
    this. name = name
}

Parent.prototype.say = function() {
    return 'this is ' + this.name
}

function Child(name, age) {
    Parent.call(this, name)
    this.age = age
}

_inherts(Child, Parent)

const child = new Child('cc', 10)
console.log(child)

console.log(child.say()) // this is cc

// ============================================================================================================

function fn({x = 10} = {}, {y} = {y: 10}) {
    return {x, y}
}

console.log(fn()) // { x: 10, y: 10 }

console.log(fn(undefined, undefined)) // { x: 10, y: 10 }

console.log(fn(undefined, {})) // { x: 10, y: undefined }
