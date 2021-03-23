/**
 * walkThrough
 * Creates a generator, that walks through all the keys of a given object.
 * 1. Use recursion.
 * 2. Define a generator function, walk, that takes an object and an array of keys.
 * 3. Use a for...of and Object.keys() to iterate over the keys of the object.
 * 4. Use typeof to check if each value in the given object is itself an object.
 * 5. If so, use the yield* expression to recursively delegate to the same generator function, walk, appending the current key to the array of keys. Otherwise, yield the an array of keys representing the current path and the value of the given key.
 * 6. Use the yield* expression to delegate to the walk generator function.
 */
const walkThrough = function* (obj) {
    const walk = function* (x, previous = []) {
        for (let key of Object.keys(x)) {
            if (typeof x[key] === 'object') {
                yield* walk(x[key], [...previous, key])
            } else {
                yield [[...previous, key], x[key]]
            }
        }
    }
    yield* walk(obj)
}

const obj = {
    a: 10,
    b: 20,
    c: {
      d: 10,
      e: 20,
      f: [30, 40]
    },
    g: [
      {
        h: 10,
        i: 20
      },
      {
        j: 30
      },
      40
    ]
};

console.log([...walkThrough(obj)])
