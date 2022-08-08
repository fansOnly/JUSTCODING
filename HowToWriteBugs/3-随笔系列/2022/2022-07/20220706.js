export const parseJsonStr = str => {
  try {
    // 去除 json 文件中的注释
    str = str.replace(/\/\/(.+\n)?|\/\*.*\*\//g, '')
    return JSON.parse(str)
  } catch (error) {
    console.log('JSON.parse error ', error);
  }
}

var str = `{
  // dsadsds
  "a": { /* 是颠三倒四的方法是 */
    // sdssds
    "b": 1 // sdsdds
  },
  "k": {
    "d": 1 /** */
  }
}`
console.log(parseJsonStr(str))


var obj = {
  a: 1,
  b: {
    b1: 2
  }
}

var o2 = {
  c: 11
}

console.log(Object.assign(obj3 || {}, undefined))

console.log(obj)
console.log(o2)
