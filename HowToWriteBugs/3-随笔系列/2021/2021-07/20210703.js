/**
 * 实现浅拷贝
 * 1. 目标对象不能是 undifined 或 null
 * 2. 将目标对象转换成对象格式，跳过 undefined 和 null
 * 3. 获取后续源对象中所有可枚举的属性（包括 Symbol 属性）复制到目标对象
 * 4. 返回该对象
 * 5. 利用 Object.defineProperty() 将该函数挂载到 Object 并设置成不可枚举
 */
function assign(target, ...sources) {
  if (target === undefined || target === null) {
    throw new Error("can't convert undefined or null value to object.")
  }
  const result = Object(target)
  for (let i = 0; i < sources.length; i++) {
    if (sources[i] !== undefined && sources[i] !== null) {
      const keys = Reflect.ownKeys(Object(sources[i]))
      for (let j = 0; j < keys.length; j++) {
        const desc = Object.getOwnPropertyDescriptors(keys[j])
        if (desc !== null && desc.enumerable) {
          result[j] = keys[j]
        }
      }
    }
  }
  return result
}

if (typeof Object.myAssign !== 'function') {
  Object.defineProperty(Object, 'myAssign', {
    value: assign,
    writable: true,
    enumerable: false,
    configurable: true
  })
}

const target = {
  a: 10
};
const source1 = {
  b: 20,
  c: 30
};
const source2 = {
  c: 40
};

console.log(Object.assign(target, source1, source2))
console.log(Object.myAssign(target, source1, source2))
