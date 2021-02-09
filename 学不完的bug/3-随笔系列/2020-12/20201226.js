function SuperType(name) {
    this.name = name
}

SuperType.prototype.say = function() {
    console.log(this.name)
}

function SubType() {
    SuperType.call(this, 'sub')
    this.age = 11
}

const instance = new SubType()

console.log(instance.__proto__)
console.log(instance.__proto__.constructor)

// instance.say()

for (var i = 0; i < 5; i++) {
    setTimeout(() => {
        console.log(i)
    }, 0);
}

for (let i = 0; i < 5; i++) {
    setTimeout(() => {
        console.log(i)
    }, 0);
}

for (var i = 0; i < 5; i++) {
    (function(j) {
        setTimeout(function() {
            console.log(j)
        }, 0);
    })(i)
}


for (let i = 0; i < 5; i++) {
    setTimeout((function(j) {
        return function() {
            console.log(j)
        }
    })(i), 0);
}
