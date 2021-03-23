/**
 * 五、寄生式继承
 * 1. 使用原型式继承对一个目标对象进行复制，并增强复制的能力
 */
function inheritObject(target) {
    const clone = Object.create(target)
    clone.say = function() {
        console.log(this.name)
    }
    return clone
}

const parent = {
    name: 'parent',
    arr: [1, 2, 3],
}

const child1 = inheritObject(parent)

console.log(child1)
child1.arr.push('a')
console.log(child1.arr)

child1.say() // parent

const child2 = inheritObject(parent)

console.log(child2.arr === child1.arr) // true
