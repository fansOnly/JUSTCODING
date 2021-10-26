export function extend (a, b, thisArg) {
  for (let i in b) {
    if (thisArg) {
      a[i] = bind(b[i], thisArg)
    } else {
      a[i] = b[i]
    }
  }
  return a
}


export function bind (fn, thisArg) {
  return function wrap() {
    const args = new Array(arguments.length)
    for (let i = 0; i < args.length; i++) {
      args[i] = arguments[i]
    }
    return fn.apply(thisArg, args)
  }
}
