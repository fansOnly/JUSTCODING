export function lookup(obj, key) {
  if (key.indexOf('.') > 0) {
    let res = obj
    key.split('.').forEach(k => {
      res = res[k]
    })
    return res
  }
  return obj[key]
}
