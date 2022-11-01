#### 五、非原始值的响应式方案

-----

##### 5.1 理解 Proxy 和 Reflect

1. Proxy 只能代理对象
    - 代理指的是对一个对象 基本语义 的代理，它允许我们拦截并重新定义一个对象的基本操作。
    - 基本操作(读取，设置，函数调用) vs 复合操作(多个操作组合？)

2. Reflect 是一个全局对象
    - 它的方法与 Proxy 拦截器的方法一一对应
    - 在部分方法中可以指定 receiver 参数，相当于 this

    ```js
    const obj = {
      foo: 1,
      get bar() {
        // this 指向 obj
        return this.foo
      }
    }
    const p = new Proxy(obj, {
      get(target, key) {
        tack(target, key, receiver)
        // 1. 如果直接返回，target 指向的是 obj
        // return target[key]
        // 2. receiver 参数代表谁在读取当前属性 -> p
        return Reflect.get(target, key, receiver)
      },
      set(target, key, newVal) {
        target[key] = newVal
        trigger(target, key)
      }
    })

    effect(() => {
      // 在副作用函数内通过原始对象访问它的某个属性是不会建立响应式联系
      // 1.1 obj.foo
      // 2.1 p.foo
      p.bar
    })
    // 
    p.foo++
    ```

> 示例代码详见 2-code1.html

-----

##### 5.2 Javascript 对象及 Proxy 的工作原理

1. Javascript 中的对象分为常规对象和异质对象
2. 对象的实际语义是由对象的内部方法指定的
    - 内部方法：当我们对一个对象进行操作时在引擎内部调用的方法
    - 在 ECMAScript 规范中使用 \[[xxx]] 代表内部方法或内部槽

3. 对象必要的内部方法

    |    内部方法     |  签名          | 描述          |
    | ---------------- | ---------------- | ----------------- |
    | \[[GetPrototypeOf]]  |  () -> Object \| Null   |  查明为该对象提供继承属性的对象，没有则为 null  |
    | \[[SetPrototypeOf]]  |   (Object \| Null) -> Boolean |  将该对象与提供继承属性的另一个对象关联，传 null 表示没有继承属性。返回 true 或 false   |
    | \[[IsExtensible]]  | () -> Boolean  |  查明是否允许向该对象添加其他属性 |
    | \[[PreventExtensions]] |  () -> Boolean   |  控制能否向该对象添加新属性。返回 true 或 false   |
    | \[[GetOwnProperty]]  | (propertyKey) -> Undefined \| PropertyDescriptor    |  返回该对象自身属性的描述符，键为 propertyKey。没有则返回 undefined  |
    | \[[DefineOwnProperty]]  | (propertyKey, propertyDescriptor) -> Boolean    |   创建或更改自己的属性，其键为 propertyKey，以具有由 propertyDescriptor 描述的状态。返回 true 或 false |
    | \[[HasProperty]]  |  (propertyKey) -> Boolean  |  返回一个布尔值，指示该对象是否已经拥有键为 propertyKey 的自身或继承属性   |
    | \[[Get]]  |  (propertyKey, receiver) -> any   |  从该对象返回键为 propertyKey 的属性的值。如果必须运行 ECMAScript 代码来检索属性值，则在运行代码时使用 Receiver 作为 this 值   |
    | \[[Set]]  |  (propertyKey, value, receiver) -> Boolean  |   将键值为 propertyKey 的属性的值设为 value。如果必须运行 ECMAScript 代码来设置属性值，则在运行代码时使用 Receiver 作为 this 值。返回 true 或 false  |
    | \[[Delete]]  |  (propertyKey) -> Boolean   |  从该对象中删除属于对象自身的键为 propertyKey 的属性。返回 true 或 false  |
    | \[[OwnPropertyKeys]]  |  () -> List of PropertyKey   | 返回对象自身属性键的 List  |

4. 额外的必要内部方法

    |    内部方法     |  签名          | 描述          |
    | ---------------- | ---------------- | ----------------- |
    | \[[Call]]  |  (any, a List of any) -> any   | 将运行的代码与 this 对象关联。 由函数调用触发。参数为一个 this 值和参数列表 |
    | \[[Constructor]]  | (a List of any, Object) -> Object  | 创建一个对对象。通过 new 运算符或 super 调用触发。第一个参数时一个 List，该 List 的元素是构造函数调用或 super 调用的参数，第二个参数时最初应用 new 运算符的对象。实现该内部方法的对象称作构造函数 |

5. 内部方法具有多态性
    - 不同类型的对象可能部署了相同的内部方法，但却具有不同的逻辑

6. 常规对象
    - 对于必要内部方法(3)，必须使用 ECMAScript 规范 10.1.x 节给出的定义实现
    - 对于内部方法 \[[Call]]，必须使用 ECMAScript 规范 10.2.1 节给出的定义实现
    - 对于内部方法 \[[Constructor]]，必须使用 ECMAScript 规范 10.2.2 节给出的定义实现

7. Proxy 是一个异质对象

8. 代理透明性质
    - 如果在创建代理对象时没有指定对应的拦截函数，当我们通过代理对象访问属性值时，代理对象的内部方法回调用原始对象的内部方法获取属性值
    - 创建代理时指定的拦截函数，是用来定义代理对象本身的内部方法和行为的，不是用来指定被代理对象的内部方法和行为

9. Proxy 对象部署的所有内部方法

    |    内部方法     |  处理器函数   |
    | ---------------- | ---------------- |
    |  \[[GetPrototypeOf]]     |  getPrototypeOf   |
    |  \[[SetPrototypeOf]]     |  setPrototypeOf   |
    |  \[[IsExtensible]]     |  isExtensible   |
    |  \[[PreventExtensions]]     |  preventExtensions   |
    |  \[[GetOwnProperty]]     |  getOwnPropertyDescriptor   |
    |  \[[DefineOwnProperty]]     |  defineProperty   |
    |  \[[HasProperty]]     |  has   |
    |  \[[Get]]     |  get   |
    |  \[[Set]]     |  set   |
    |  \[[Delete]]     |  deleteProperty   |
    |  \[[OwnPropertyKeys]]     |  ownKeys   |
    |  \[[Call]]     |  apply   |
    |  \[[Constructor]]     |  constructor   |

-----

##### 5.3 如何代理 Object

> 以下操作的拦截方法都是依靠分析 ECMAScript 规范定义的实现得到的结果

1. 读取操作：通过 get 拦截

    ```js
    const p = new Proxy(obj, {
      get(target, key, receiver) {
        track(target, key)
        return Reflect.get(target, key, receiver)
      }
    })
    ```

2. 设置操作：通过 set 拦截

    ```js
    const p = new Proxy(obj, {
      set(target, key, newVal, receiver) {
        const res = Reflect.set(target, key, newVal, receiver)
        trigger(target, key)
        return res
      }
    })
    ```

3. in 操作符：通过 has 拦截

    ```js
    const p = new Proxy(obj, {
      has(target, key) {
        track(target, key)
        return Reflect.has(target, key)
      }
    })
    ```

4. for...in 循环：通过 ownKeys 拦截

    ```js
    // 定义一个通用的唯一 key 值
    const ITERATE_KEY = symbol()
    const p = new Proxy(obj, {
      ownKeys(target) {
        track(target, ITERATE_KEY)
        return Reflect.ownKeys(target)
      }
    })
    ```

5. delete：通过 deleteProperty 拦截

    ```js
    const p = new Proxy(obj, {
      deleteProperty(target, key) {
        const hadKey = Object.prototype.hasOwnProperty.call(target, key)
        const res = Reflect.deleteProperty(target, key)

        if (hadKey && res) {
          // 被删除的是自身属性且删除操作成功才会触发更新
          trigger(target, key, 'DELETE')
        }
        return res
      }
    })
    ```

6. 几个需要注意的地方
    - 当添加属性时，会对 for...in 循环产生影响，需要取出与 ITERATE_KEY 关联的副作用函数并重新执行
    - 在设置属性时，需要区分是添加属性(ADD)还是更新已有属性(SET)
    - 删除属性时，也会对 for...in 循环产生影响，需要取出与 ITERATE_KEY 关联的副作用函数并重新执行

> 示例代码详见 2-code2.html

-----

##### 5.4 合理的触发响应

1. 设置值时，需要判断新值是否与旧值相等，不相等才触发更新

    ```js
    const p = new Proxy(obj, {
      set(target, key, newVal, receiver) {
        const oldVal = target[key]

        const type = Object.prototype.hasOwnProperty.call(target, key) ? 'SET' : 'ADD'
        const res = Reflect.set(target, key, newVal, receiver)
        if (oldVal !== newVal) {
          trigger(target, key, type)
        }
        return res
      }
    })
    ```

2. 设置值时，还要考虑初始值为 NaN 的场景(NaN !== NaN)

    ```js
    const p = new Proxy(obj, {
      set(target, key, newVal, receiver) {
        const oldVal = target[key]
        const type = Object.prototype.hasOwnProperty.call(target, key) ? 'SET' : 'ADD'
        const res = Reflect.set(target, key, newVal, receiver)
        if (oldVal !== newVal && (oldVal === oldVal || newVal === newVal)) {
          trigger(target, key, newVal, receiver)
        }
        return res
      }
    })
    ```

3. 如果设置的属性不存在对象上，会取得原型，调用原型的 \[[Set]] 方法
    - 如果一个响应式对象的原型也是响应式对象，在读取原型上的某个属性值时，该对象和原型对象都会收集该属性对应的副作用函数，当该对象修改属性时，不仅会触发自身的副作用函数执行，也会触发其原型对象的副作用函数执行

    ```js
    function reactive(obj) {
      return new Proxy(obj, {})
    }

    const obj = {}
    const proto = { bar: 1 }
    const child = reactive(obj)
    const parent = reactive(proto)
    Object.setPrototypeOf(child, parent)

    effect(() => {
      child.bar // 1 2 2
    })

    child.bar = 2
    ```

    - 当 parent 代理对象的 set 拦截函数执行时，此时 target 是原始对象 proto，而 receiver 仍是代理对象 child，不再是 target 的代理对象

    ```js
    function reactive(obj) {
      return new Proxy(obj, {
        get(target, key, receiver) {
          // key === 'raw' 时，返回原始对象
          if (key === 'raw') {
            return target
          }
          track(target, key)
          return Reflect.get(target, key, receiver)
        },
        set(target, key, newVal, receiver) {
          const oldVal = target[key]
          const type = Object.prototype.hasOwnProperty(target, key) ? 'SET' : 'ADD'
          const res = Reflect.set(target, key, newVal, receiver)
          if (target === receiver.raw) {
            // receiver 是 target 的代理对象
            if (oldVal !== newVal && (oldVal === oldVal || newVal === newVal)) {
              trigger(target, key, type)
            }
          }
          return res
        }
      })
    }
    ```

> 示例代码详见 2-code3.html

-----

##### 5.5 深响应与浅响应

1. 深响应：如果是对象，则递归的调用 reactive 函数将其包装成响应式数据并返回

2. 浅响应：只有对象的第一层属性是响应式的

    ```js
    function reactive(obj) {
      return createReactive(obj)
    }
    function shallowReactive(obj) {
      return createReactive(obj, true)
    }
    function createReactive(obj, isShallow = false) {
      return nee Proxy(obj, {
        get(target, key, receiver) {
          if (key === 'raw') {
            return target
          }
          const res = Reflect.get(target, key, receiver)

          track(target, key)

          if (isShallow) {
            return res
          }
          if (typeof res === 'object' && res !== null) {
            return reactive(res)
          }
          return res
        }
      })
    }
    ```

> 示例代码详见 2-code4.html

-----

##### 5.6 深只读和浅只读

1. 只读：当用户尝试修改只读数据时，会收到一条警告信息
2. 对于一个只读数据，不需要建立响应关系

    ```js
    function createReactive(obj, isShallow = false, isReadonly = false) {
      return new Proxy(obj, {
        get(target, key, receiver) {
          if (key === 'raw') {
            return target
          }
          const res = Reflect.get(target, key, receiver)
          // 只读属性不需要建立响应关系
          if (!isReadonly) {
            track(target, key)
          }
          if (isShallow) {
            return res
          }
          if (typeof res === 'object' && res !== null) {
            return isReadonly ? readonly(res) : reactive(res)
          }
          return res
        },
        set(target, key, newVal, receiver) {
          if (isReadonly) {
            console.warn(`${key} 是只读属性`)
            return true
          }
          const oldVal = target[key]
          // ...
        },
        deleteProperty(target, key) {
          if (isReadonly) {
            console.warn(`${key} 是只读属性`)
            return true
          }
          // ...
        }
      })
    }
    function readonly(obj) {
      return createReactive(obj, false, true)
    }
    function shallowReadonly(obj) {
      return createReactive(obj, true, true)
    }
    ```

> 示例代码详见 2-code5.html

-----

##### 5.7 代理数组

1. 数组是一个异质对象，除了 \[[DefineOwnProperty]] 这个方法，其他内部方法逻辑都与常规对象相同
2. 数组的读取
    - 通过索引访问元素：arr[0]
    - 获取数组的长度：arr.length
    - 通过 for...in 遍历
    - 通过 for...of 迭代遍历数组
    - 数组的原型方法，如 concat/join/every/some/find/findIndex/includes 等所有不改变原数组的原型方法
3. 数组的设置
    - 通过索引修改数组元素值：arr[0] = 10
    - 修改数组长度：arr.length = 0
    - 数组的栈方法：unshift/shift/push/pop
    - 修改原数组的原型方法：splice/fill/sort 等

###### 5.7.1 数组的索引与 length

1. 通过索引修改数组的元素值时，有可能隐式的修改数组的 length 属性

      ```js
      const arr = reactive(['foo'])

      effect(() => {
        console.log(arr.length) // 1 -> 2
      })

      arr[1] = 'bar'
      ```

   - 修改 set 拦截函数，增加对数组操作的处理
   - 修改 trigger 函数，新增对数组 length 的处理

    ```js
    function createReactive(obj, isShallow = false, isReadonly = false) {
      return new Proxy(obj, {
        set(target, key, newVal, receiver) {
          if (isReadonly) return
          const oldVal = target[key]
          // 判断数组
          const type = Array.isArray(target) ?
          Number(key) < target.length ? 'SET' : 'ADD' :
          Object.prototype.hasOwnProperty.call(target, key) ? 'SET' : 'ADD'
          const res = Reflect.set(target, key, newVal, receiver)
          if (target === receiver.raw) {
            if (oldVal !== newVal && (oldVal === oldVal || newVal === newVal)) {
              trigger(target, key, type)
            }
          }
          return res
        }
      })
    }

    function trigger(target, key, type) {
      const depsMap = bucket.get(target)
      if (!depsMap) return
      // ...
      // 对数组的 length 属性的处理
      if (Array.isArray(target) && type === 'ADD') {
        const lengthEffects = depsMap.get('length')
        lengthEffects && lengthEffects.forEach(effectFn => {
          if (effectFn !== activeEffect) {
            effectsToRun.add(effectFn)
          }
        })
      }
      // ...
    }
    ```

2. 修改数组的 length 属性时，也可能隐式的修改数组的元素
    - 修改 trigger 函数，对于数组索引大于或等于新的 length 的元素，取出相关的副作用函数待执行

    ```js
    function trigger(target, key, type, newVal) {
      const depsMap = bucket.get(target)
      if (!depsMap) return
      // ...
      // 处理数组中因 length 修改收到影响的元素
      if (Array.isArray(target) && key === 'length') {
        depsMap.forEach((effects, key) => {
          if (key >= newVal) {
            effects.forEach(effectFn => {
              if (effectFn !== activeEffect) {
                effectsToRun.add(effectFn)
              }
            })
          }
        })
      }
      // ...
    }
    ```

> 示例代码详见 2-code6.html

###### 5.7.2 遍历数组

1. for...in 遍历
    - 数组遍历受到数组长度的影响，需要将绑定的 key 值改为 length

    ```js
    function createReactive(obj, isShallow = false, isReadonly = false) {
      return new Proxy(obj, {
        ownKeys(target) {
          trigger(target, Array.isArray(target) ? 'length' : ITERATE_KEY)
          return Reflect.ownKeys(target)
        }
      })
    }
    ```

2. for...of 迭代
    - 可迭代对象
    - 迭代协议：在对象或者对象的原型上部署了 @@iterator 方法

      ```js
      const obj = {
        value: 0,
        [Symbol.iterator]() {
          return {
            next() {
              return {
                value: obj.value++,
                done: value > 10 ? true : false
              }
            }
          }
        }
      }

      for (const value of obj) {
        console.log(value) // 0 1 2 3 4 5 6 7 8 9
      }
      ```

    - 数组内建了 Symbol.iterator 方法

        ```js
        const arr = [1, 2, 3, 4, 5]
        const itr = arr[Symbol.iterator]()

        console.log(itr.next()) // { value: 1, done: false }
        console.log(itr.next()) // { value: 2, done: false }
        console.log(itr.next()) // { value: 3, done: false }
        console.log(itr.next()) // { value: 4, done: false }
        console.log(itr.next()) // { value: 5, done: false }
        console.log(itr.next()) // { value: undefined, done: true }
        ```

    - 自定义实现数组内建的迭代器：关联数组的长度与索引

      ```js
      const arr = [1, 2, 3, 4, 5]
      arr[Symbol.iterator] = function() {
        const target = this
        const len = target.length
        let index = 0

        return {
          next() {
            return {
              value: index < len ? target[index] : undefined,
              done: index++ >= len
            }
          }
        }
      }
      ```

    - 数组的 values 方法的返回值实际上就是数组的内建迭代器

      ```js
      Array.prototype.values === Array.prototype[Symbol.iterator]
      ```

    - 我们不该在副作用函数与 Symbol.iterator 这类 symbol 之间建立响应联系

      ```js
      function createReactive(obj, isShallow = false, isReadonly = false) {
        return new Proxy(obj, {
          get(target, key, receiver) {
            if (key === 'raw') {
              return target
            }
            // 如果 key 是 symbol 类型，不仅行追踪
            if (!isReadonly && typeof key !== 'symbol') {
              track(target, key)
            }
            // ...
          }
        })
      }
      ```
  
> 示例代码详见 2-code7.html

###### 5.7.3 数组的查找方法

1. includes 方法会访问数组的 length 和索引

    ```js
    const arr = reactive([1, 2])
    effect(() => {
      console.log(arr.includes(1)) // true -> false
    })
    arr[0] = 3
    ```

2. 当我们通过代理对象访问元素时，如果值是可以被代理的，得到的值是代理对象，而不是原始对象

    ```js
    const obj = {}
    const arr = reactive([obj])
    console.log(arr.includes(arr[0])) // false

    // 定义一个 map 存储原始对象到代理对象的映射
    const reactiveMap = new Map()
    function reactive(obj) {
      const existProxy = reactiveMap.get(obj)
      if (existProxy) return existProxy

      const proxy = createReactive(obj, {})
      reactiveMap.set(obj, proxy)
      return proxy
    }
    ```

3. 通过代理对象调用 includes 方法时，内部的 this 指向的是代理对象，如果我们传入普通原始对象，肯定找不到

    ```js
    const obj = {}
    const arr = reactive([obj])
    console.log(arr.includes(obj)) // false

    // 重写 includes/indexOf/lastIndexOf 方法，先在代理对象中查找，如果找不到，再到原始对象中查找
    const arrayInstrumentations = {}
    const arrayMethods = ['includes', 'indexOf', 'lastIndexOf']
    arrayMethods.forEach(method => {
      const originMethod = Array.prototype[method]
      arrayInstrumentations[method] = function(...args) {
          let res = originMethod.apply(this, args)
          if (res === false) {
            res = originMethod.apply(this.raw, args)
          }
          return res
        }
    })
    function createReactive(obj, isShallow = false, isReadonly = false) {
      return new Proxy(obj, {
        get(target, key, receiver) {
          if (key === 'raw') {
            return target
          }
          if (Array.isArray(target) && arrayInstrumentations.hasOwnProperty(key)) {
            return Reflect.get(arrayInstrumentations, key, receiver)
          }
          // ...
        }
      })
    }
    ```

> 示例代码详见 2-code8.html

###### 5.7.4 隐式修改数组长度的原型方法

1. 当调用数组的 push 方法时，即会读取数组的 length 属性，也会设置 length 属性，会导致栈溢出。因此我们在 push 操作的时候修腰屏蔽数组对 length 属性的读取

    ```js
    const arr = reactive([])
    effect(() => {
      arr.push(1)
    })
    effect(() => {
      arr.push(2)
    })
    ```

2. 数组的 pop/unshift/shift/splice 方法同理

    ```js
    let shouldTrack = true
    let arrayInstrumentations = {}
    const arrayMethods = ['push', 'pop', 'unshift', 'shift', 'splice']
    arrayMethods.forEach(method => {
      const originMethod = Array.prototype[method]
      arrayInstrumentations[method] = function(...args) {
        shouldTrack = false
        const res = originMethod.apply(this, args)
        shouldTrack = true
        return res
      }
    })

    function track(target, key) {
      if (!activeEffect || !shouldTrack) return
      // ...
    }
    ```

> 示例代码详见 2-code9.html

-----

##### 5.8 代理 Set 和 Map

1. Set 的原型方法
    - size
    - add(value)
    - clear()
    - delete(value)
    - has(value)
    - keys()
    - values()
    - entries()
    - forEach(callback[, thisArg])

2. Map 的原型方法
    - size
    - clear()
    - delete(key)
    - has(key)
    - get(key)
    - set(key, value)
    - keys()
    - values()
    - entries()
    - forEach(callback[, thisArg])

###### 5.8.1 如何代理 Set 和 Map

1. size 是一个访问器属性，代理时需要修正访问器属性的 getter 函数执行时的 this 为原始对象

    ```js
    const s = new Set([1, 2, 3])
    const p = new Proxy(s, {
      get(target, key, receiver) {
        if (key === 'size') {
          // 将 receiver 替换为原始 Set 对象
          return Reflect.get(target, key, target)
        }
        return Reflect.get(target, key, receiver)
      }
    })
    ```

2. delete 方法需要在代理的时候将其与原始数据对象 target 绑定后返回

     ```js
     const s = new Set([1])
     const p = new Proxy(p, {
      get(target, key, receiver) {
        if (key === 'size') {
          return Reflect.get(target, key, target)
        }
        // 将方法绑定到原始对象 target 上
        return target[key].bind(target)
      }
     })
     ```

###### 5.8.2 建立响应联系

1. 自定义实现相关的方法：add/delete

    ```js
    const mutableInstrumentations = {
      add(key) {},
      delete(key) {}
    }
    function createReactive(obj, isShallow = false, isReadonly = false) {
      return new Proxy(obj, {
        get(target, key, receiver) {
          if (key === 'raw') {
            return target
          }
          if (key === 'size') {
            track(target, ITERATE_KEY)
            return Reflect.get(target, key, target)
          }
          return mutableInstrumentations[key]
        }
      })
    }
    ```

> 示例代码详见 2-code10.html

###### 5.8.4 避免污染原始数据

1. Map get 方法的实现

    ```js
    const mutableInstrumentations = {
      get(key) {
        const target = this.raw
        const hadKey = target.has(key)
        track(target, key)
        if (hadKey) {
          const res = target.get(key)
          // TODO 浅响应 / 只读
          return typeof res === 'object' && res !== null ? reactive(res) : res
        }
      }
    }
    ```

2. Map set 方法的实现

    ```js
    const mutableInstrumentations = {
      set(key, value) {
        const target = this.raw
        const hadKey = target.has(key)
        const oldVal = target.get(key)
        target.set(key, value)
        if (!hadKey) {
          trigger(target, key, 'ADD')
        } else if (oldVal !== value && (oldVal === oldVal && value === value)) {
          trigger(target, key, 'SET')
        }
      }
    }
    ```

3. 数据污染：将响应式数据设置到原始数据的行为。需要判断当数据时响应式数据时，获取该数据的原始数据后进行设置

    ```js
    const mutableInstrumentations = {
      set(key, value) {
        const target = this.raw
        const hadKey = target.has(key)
        const oldVal = target.get(key)
        // 获取原始数据 value.raw，如果没有，说明 value 本身就是原始数据
        const rawValue = value.raw || value
        target.set(key, rawValue)
        if (!hadKey) {
          trigger(target, key, 'ADD')
        } else if (oldVal !== value && (oldVal === oldVal && value === value)) {
          trigger(target, key, 'SET')
        }
      }
    }
    ```

> 示例代码详见 2-code11.html

4. 使用 raw 属性获取原始对象存在风险，有可能与用户自定义的 raw 属性冲突，可以通过一个 Symbol 类型来替代

-----

###### 5.8.4 处理 forEach

1. Map 的 forEach 函数遍历 Map 数据的每一组键值对，它既关心键，又关心值

    ```js
    const m = new Map([
      [{key: 1}, {value: 1}]
    ])
    m.forEach((value, key, m) => {
      console.log(value) // { value: 1 }
      console.log(key) // { key: 1 }
    })
    ```

2. Set 的 forEach 函数遍历的是 Set 的值，它只关心值

    ```js
    const s = new Set([1, 2, 3])
    s.forEach((value) => {
      console.log(value) // 1 2 3
    })
    ```

3. 遍历的时候，我们应该让副作用函数与 ITERATE_KEY 建立响应联系，要确保传给回调函数的参数也是响应式的

    ```js
    const mutableInstrumentations = {
      forEach(callback, thisArg) {
        const wrap = val => typeof val === 'object' ? reactive(val) : val

        const target = this.raw
        track(target, ITERATE_KEY)
        target.forEach((v, k) => {
          callback.call(thisArg, wrap(v), wrap(k), this/**当前对象本身 */)
        })
      }
    }
    ```

4. 对于 Map 数据，即使是 set 操作，也会影响到 forEach 的结果

    ```js
    function trigger(target, key, type, newVal) {
      // ...
      if (type === 'ADD' || type === 'DELETE' || (type === 'SET' && Object.prototype.toString.call(target) === '[object Map]')) {
        const iterateEffects = depsMap.get(ITERATE_KEY)
        // ...
      }
    }
    ```

> 示例代码详见 2-code12.html

###### 5.8.6 迭代器方法

1. 迭代器协议和可迭代协议
    - 迭代器协议：一个对象实现了 next 方法
    - 可迭代协议：一个对象实现了 Symbol.iterator 方法

2. for...of：@@iterator

    ```js
    const mutableInstrumentations = {
      [Symbol.iterator]: iterationMethod
    }
    function iterationMethod() {
      const target = this.raw
      const itr = target[Symbol.iterator]

      const wrap = val => typeof val === 'object' && val !== null ? reactive(val) : val

      track(target, ITERATE_KEY)

      return {
        // 实现迭代器协议
        next() {
          const { value, done } = itr.next()
          return {
            value: value ? [wrap(value[0]), wrap(value[1])] : undefined,
            done
          }
        }
      }
    }
    ```

3. entries：返回一个迭代器对象，关联键和值的变化 / ITERATE_KEY

    ```js
    const mutableInstrumentations = {
      [Symbol.iterator]: iterationMethod,
      entries: iterationMethod
    }
    function iterationMethod() {
      const target = this.raw
      const itr = target[Symbol.iterator]
      const wrap = val => typeof val === 'object' && val !== null ? reactive(val) : val
      track(target, ITERATE_KEY)
      return {
        next() {
          const { value, done } = itr.next()
          return {
            value: value ? [wrap(value[0]), wrap(value[1])] : undefined,
            done
          }
        }
        // 实现可迭代协议
        [Symbol.iterator]() {
          return this
        }
      }
    }
    ```

4. values：返回一个迭代器对象，关联键和值的变化 / ITERATE_KEY

    ```js
    const mutableInstrumentations = {
      [Symbol.iterator]: iterationMethod,
      entries: iterationMethod,
      values: valuesIterationMethod
    }
    function valuesIterationMethod() {
      const wrap = val => typeof val === 'object' ? reactive(val) : val
      const target = this.raw
      const itr = target.values()
      track(target, ITERATE_KEY)

      return {
        next() {
          const { value, done } = itr.next()
          return {
            value: wrap(value),
            done
          }
        }
        [Symbol.iterator]() {
          return this
        }
      }
    }
    ```

5. keys：返回一个迭代器对象，关联键的变化 / MAP_KEY_ITERATE_KEY

    ```js
    const MAP_KEY_ITERATE_KEY = Symbol()
    const mutableInstrumentations = {
      [Symbol.iterator]: iterationMethod,
      entries: iterationMethod,
      values: valuesIterationMethod,
      keys: keysIterationMethod
    }
    function keysIterationMethod() {
      const wrap = val => typeof val === 'object' ? reactive(val) : val
      const target = this.raw
      const itr = target.keys()
      track(target, MAP_KEY_ITERATE_KEY)
      return {
        next() {
          const { value, done } = itr.next()
          return {
            value: wrap(value),
            done
          }
        }
        [Symbol.iterator]() {
          return this
        }
      }
    }
    function trigger(target, key, type, newVal) {
      // ...
      if ((type === 'ADD' || type === 'DELETE') && Object.prototype.toString.call(target) === '[object Map]') {
        const iterateEffects = depsMap.get(key)
        iterateEffects && iterateEffects.forEach(effectFn => {
          if (effectFn !== activeEffect) {
            effectToRun.add(effectFn)
          }
        })
      }
    }
    ```

> 示例代码详见 2-code13.html
