export function callWithErrorHandling(fn, instance, type, args = []) {
  let res
  try {
    res = args.length ? fn(...args) : fn()
  } catch (error) {
    handlerError(error, instance, type)
  }
  return res
}



export function handlerError(error, instance, type) {}
