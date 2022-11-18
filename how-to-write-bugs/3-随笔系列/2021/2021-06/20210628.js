/**
 * 深拷贝
 * 1 日期或者正则类型，返回新对象
 * 2 null 或者基本类型，直接返回
 * 3 判断循环引用，直接返回
 * 4 创建一个基于目标对象的构造函数的实例 Object / Array
 * 5 递归遍历对象，复制属性
 * 6 处理 symbol 类型的键
 */
const deepClone = (target, hash = new WeakMap()) => {
  if (target instanceof RegExp) return new RegExp(target)
  if (target instanceof Date) return new Date(target)
  if (target === null || typeof target !== 'object') return target
  if (hash.has(target)) return hash.get(target)
  const result = new target.constructor
  hash.set(target, result)
  for (let key in target) {
    if (target.hasOwnProperty(key)) {
      result[key] = deepClone(target[key], hash)
    }
  }
  let symbolKeys = Object.getOwnPropertySymbols(target)
  for (let i = 0; i < symbolKeys.length; i++) {
    if (target.hasOwnProperty(symbolKeys[i])) {
      result[symbolKeys[i]] = deepClone(target[symbolKeys[i]], hash)
    }
  }
  return result
}



/**
 * 睡眠函数
 */
const sleep = delay => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve()
    }, delay);
  })
}

const sleep2 = delay => {
  const now = +new Date()
  while (now + delay > +new Date()) {
    continue
  }
}

// (async () => {
//   console.log(1, new Date())
// await sleep(5000)
// console.log(2, new Date())
// })()

// console.log(1, new Date())
// sleep2(5000)
// console.log(2, new Date())



/**
 * 解析url
 */
const parseUrlParam = url => {
  const paramString = url.split('?')[1]
  let paramObj = {}
  paramString.replace(/([^=&]+)(=([^&]+))?/g, (match, key, _, val) => {
    val = val ? decodeURIComponent(val) : true
    if (/^\d+$/.test(val)) {
      val = parseFloat(val)
    }
    if (paramObj.hasOwnProperty(key)) {
      paramObj[key] = [].concat(paramObj[key], val)
    } else {
      paramObj[key] = val
    }
  })
  return paramObj
}

const parseUrlParam2 = url => {
  const paramString = url.split('?')[1]
  const parasArr = paramString.split('&')
  let paramObj = {}
  parasArr.forEach(item => {
    if (/=/.test(item)) {
      let [key, val] = item.split('=')
      val = decodeURIComponent(val)
      if (/^\d+$/.test(val)) val = parseFloat(val)
      if (paramObj.hasOwnProperty(key)) {
        paramObj[key] = [].concat(paramObj[key], val)
      } else {
        paramObj[key] = val
      }
    } else {
      paramObj[item] = true
    }
  })
  return paramObj
}

let url = 'http://www.domain.com/?user=anonymous&id=123&id=456&city=%E5%8C%97%E4%BA%AC&enabled'
console.log('parseUrlParam(url): ', parseUrlParam(url));
console.log('parseUrlParam(url): ', parseUrlParam2(url));





/**
 * 模板引擎实现
 */
const render = (str, data) => {
  return str.replace(/\{\{(\w+)\}\}/g, (match, key) => {
    if (data.hasOwnProperty(key)) {
      return data[key]
    }
  })
}

const render2 = (str, data) => {
  const reg = /\{\{(\w+)\}\}/
  if (reg.test(str)) {
    const name = reg.exec(str)[1]
    str  = str.replace(reg, data[name])
    return render(str, data)
  }
  return str
}

let template = '我是{{name}}，年龄{{age}}，性别{{sex}}, more {{a.b}}';
let data = {
  name: '姓名',
  age: 18,
  a: {
    b: 3
  }
}
console.log(render(template, data)) //
console.log(render2(template, data)) //



/**
 * 查找字符串中出现最多的字符和个数
 */
const findLen = str => {
  let num = 0
  let char = ''
  str = str.split('').sort().join('')

  const reg = /(\w)\1+/g
  str.replace(reg, ($0, $1) => {
    console.log('$1: ', $1);
    console.log('$0: ', $0);
    if ($0.length) {
      num = $0.length
      char = $1
    }
  })
  console.log(`出现次数最多的字符串是${char}，共出现了${num}次`)
}

findLen('abcabcabcbbccccc')
