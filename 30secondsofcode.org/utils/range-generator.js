/**
 * Using JavaScript generator functions for ranges
 */
function* generateRange(end, start = 0, step = 1) {
    let x = start - step
    while (x < end - step) yield x += step
}

const gen5 = generateRange(5)
let x = gen5.next()

while (!x.done) {
    console.log(x.value) // 0, 1, 2, 3, 4
    x = gen5.next()
}


// Symbol.iterator
const iteratableVal = {
    [Symbol.iterator]: function*() {
        yield 1;
        yield 2;
    }
}

console.log([...iteratableVal]) // [ 1, 2 ]


// Putting it all together
const range = (end, start = 0, step = 1) => {
    function* generateRange() {
        let x = start - step
        while (x < end - step) yield x += step
    }
    return {
        [Symbol.iterator]: generateRange
    }
}

console.log([...range(5)]) // [ 0, 1, 2, 3, 4 ]
console.log([...range(8, 2, 2)]) // [2, 4, 6]
