function add(x) {
    return x + 5
}

function div(x) {
    return x / 2
}

function sub(x) {
    return x - 3
}

const chain = [add, div, sub].reduce((a, b) => (...args) => a(b(...args)))

console.log(chain(1))
