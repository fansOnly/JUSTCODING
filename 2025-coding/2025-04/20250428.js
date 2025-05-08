// es 2025 - Promise.try()

// function syncFn1() {
//   console.log('sync success')
// }

// function asyncFn1() {
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       resolve('async success')
//     }, 1000)
//   })
// }

// Promise.try(syncFn1).then(res => {
//   console.log('after success =>')
// }).catch((err) => {
//   console.log('try err =>', err)
// });

// console.log('111')


// vue reactivity
function reactive(target) {
  if (typeof target !== 'object' || target === null) {
    return target
  }
  return new Proxy(target, {
    get(target,key) {
      track(target, key)
      return Reflect.get(target, key)
    },
    set(target, key, value, receiver) {
      const result = Reflect.set(target, key, value, receiver)
      trigger(target, key)
      return result
    }
  })
}

let activeEffect = null
let targetMap = new WeakMap()
function effect(fn) {
  activeEffect = fn
  fn()
  activeEffect = null
}

function track(target, key) {
  if (activeEffect) {
    let depsMap = targetMap.get(target)
    if (!depsMap) {
      targetMap.set(target, (depsMap = new Map()))
    }
    let deps = depsMap.get(key)
    if (!deps) {
      depsMap.set(key, (deps = new Set()))
    }
    deps.add(activeEffect)
  }
}

function trigger(target, key) {
  const depsMap = targetMap.get(target)
  if (depsMap) {
    const effects = depsMap.get(key)
    if (effects) {
      effects.forEach(fn => fn())
    }
  }
}


const obj = reactive({
  count: 0,
})

effect(() => {
  console.log('count update:', obj.count)
})

obj.count++