const compose = (...fns) => (...args) => fns.reduceRight((res, fn) => fn.call(null, ...args), args)[0]


const curry = fn => {
  const { length } = fn
  return function $curry(...args) {
    if (args.length < length) {
      return $curry.bind(null, ...args)
    }
    return fn.call(null, ...args)
  }
}

const curry2 = (fn, ...args) => {
  const { length } = fn
  return function(...rest) {
    const allArgs = [...args, ...rest]
    if (allArgs.length < length) {
      return curry2.call(null, fn, ...allArgs)
    }
    return fn.call(this, ...allArgs)
  }
}

const sum = (a, b, c, d) => {
  return a + b + c + d
}

const add = curry(sum)

console.log(add(1)(2)(3)(4))


const add2 = curry2(sum, 1)
console.log(add2(2)(3, 4))
