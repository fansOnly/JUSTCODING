const formatPrice = (str) => {
  return str.replace(/^\D*(\d*(?:\.\d{0,2})?).*$/g, '$1')
}

console.log(formatPrice('aa222.336655'))

const formatNumber = val => {
  return val.replace(/(?!^)(?=(\d{3})+(?!\d))/g, ',')
}
console.log(formatNumber('36252619990512099.1232'))


const asyncPool = async (limit, arr, fn) => {
  const ret = []
  const executing = []

  for (const item of arr) {
    const p = Promise.resolve().then(() => fn(item, arr))
    ret.push(p)

    if (arr.length > limit) {
      const e = p.then(() => executing.splice(executing.indexOf(e), 1))
      executing.push(e)
      if (executing.length > limit) {
        await Promise.race(executing)
      }
    }
  }
  return Promise.all(ret)
}
