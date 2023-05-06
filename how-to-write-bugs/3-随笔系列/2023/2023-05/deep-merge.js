const isObj = value => value !== null && typeof value === 'object'
const deepMergeArray = (a, b) => Array.from(new Set([...a, ...b]))


const deepMerge = (target, obj) => {
  for (const key of Object.keys(obj)) {
      const oldVal = target[key]
      const newVal = obj[key]

      if (Array.isArray(oldVal) && Array.isArray(newVal)) {
        target[key] = deepMergeArray(oldVal, newVal)
    } else if (isObj(oldVal) && isObj(newVal)) {
        target[key] = deepMerge(oldVal, newVal)
    } else {
        target[key] = newVal
    }
  }

  return target
}

const obj1 = {
  a: 1,
  b: 2,
  c: 3,
  d: [1,2,3],
  e: {
    k: 1,
    h: 2
  }
}

const obj2 = {
  a: 'a',
  d: [1,'p', 's'],
  e: {
    k: 'kkk',
    l: 111
  }
}

deepMerge(obj1, obj2)
console.log(obj1)
