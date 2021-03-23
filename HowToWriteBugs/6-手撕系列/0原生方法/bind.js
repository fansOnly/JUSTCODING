/**
 * 改变this指向，不执行
 */
Function.prototype.myBind = function(context = window, ...args) {
    if (typeof this !== 'function') {
        throw new TypeError ('caller must be a function.')
    }
    const self = this
    return function fbind() {
        return self.apply(self instanceof fbind ? this : context, [...args, ...arguments])
    } 
}

const obj1 = {
    name: 'lily',
    age: 10,
    say(weight) {
        return `I'm ${this.name}, and I'm ${this.age} years old, I'm ${weight} kg.`
    }
}

const obj2 = {
    name: 'john',
    age: 20
}

console.log(obj1.say(20))
// I'm lily, and I'm 10 years old, I'm 20 kg.

const say = obj1.say.myBind(obj2, 30)
console.log(say())
// I'm john, and I'm 20 years old, I'm 30 kg.

const say1 = obj1.say.myBind(obj1, 50)
console.log(say1())
// I'm lily, and I'm 10 years old, I'm 50 kg.
