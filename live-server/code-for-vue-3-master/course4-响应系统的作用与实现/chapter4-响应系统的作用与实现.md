#### 四、响应系统的作用与实现

-----

##### 4.1 响应式设计与副作用函数

1. 副作用函数指的是会产生副作用的函数，例如修改全局变量或者是页面上的内容

```js
// 1. 修改全局变量
let val = 1

function effect() {
  val = 2
}

effect() // val => 2

// 2.修改页面显示
const obj = {
  text: 'hello world'
}

function effect() {
  document.body.innerText = obj.text
}

effect() // 页面显示 hello world
```

-----

##### 4.2 响应式数据的基本实现

+ 执行副作用函数 effect 时，触发 obj.text 的读取操作
+ 改变 obj.text 时，触发 obj.text 的设置操作

实现方式：

+ Vue.js 2 通过 Object.defineProperty()
+ Vue.js 3 通过 Proxy

  > 示例代码详见 1-code1.html

-----

##### 4.3 一个完善的响应式系统

1. 注册副作用函数

    + 新建一个全局的副作用函数变量，记录当前正在执行的副作用函数
    + 待完善：副作用函数与目标属性没有建立明确的对应关系

    > 代码示例详见 1-code2.html

2. 常见的响应式关联的场景

    ```js
    // 一对一
    ├── target
    │   └── key 
    │       └── effect

    // 一对多
    ├── target
    │   └── key 
    │       │── effect1
    │       └── effect2

    // 多对一
    ├── target
    │   └── key1 
    │       └── effect
    │   └── key2 
    │       └── effect

    // 多对多
    ├── target1
    │   └── key1 
    │       └── effect1
    ├── target2
    │   └── key2
    │       └── effect2
    ```

3. 数据结构处理

    + WeakMap 由 target -> Map 组成
    + Map 由 key -> Set 组成
    + Set 里面存储 effect

    > 代码示例详见 1-code3.html

4. 代码封装

    + 追踪依赖：track
    + 触发副作用函数：trigger

    > 代码示例详见 1-code4.html

-----

##### 4.4 分支切换与 cleanup

1. 分支切换可能会产生遗留的副作用函数。

    ```js
    const data = {
      ok: true,
      text: 'hello world'
    }

    const obj = new Proxy(data, {})

    effect(()) => {
      document.body.innerText = obj.ok ? obj.text : 'none'
    }

    // 1. 当 obj.ok 为 true 时，副作用函数关系如下
    ├── data
    │   └── ok 
    │       └── effect 
    │   └── text 
    │       └── effect 

    // 2. 如果设置 obj.ok 为 false，副作用函数关系如下
    ├── data
    │   └── text 
    │       └── effect

    // 实际 obj.ok 对应的副作用函数会遗留
    ```

2. 解决方案

    + 在副作用函数执行前，将它从所有与之关联的依赖集合中删除
    + 执行完毕后，重新建立联系，在新的联系中不会包含遗留的副作用函数
    + 避免死循环：在调用 forEach 遍历 Set 时，如果一个值已经被访问过，但改值被删除并重新添加到集合中，如果这时 forEach 遍历没有结束，该值会重新被访问

> 代码示例详见 1-code5.html

-----

##### 4.5 嵌套的 effect 与 effect 栈

1. 在 Vue.js 中，当组件发生嵌套时， 副作用函数就发生了嵌套。

    ```js
    const Bar = {
      render() {
        return {}
      }
    }

    const Foo = {
      render() {
        return <Bar />
      }
    }

    // 渲染时等价于
    effect(() => {
      Foo.render()
      effect(() => {
        Bar.render()
      })
    })
    ```
2. 嵌套的 effect 存在问题：统一同一时间只有一个 activeEffect，最后保留的 activeEffect 始终是内层的副作用函数，当外层数据触发依赖收集时，执行的副作用函数依旧是内层的。需要新增一个记录全局的副作用函数的栈结构 effectStack，并让 activeEffect 始终指向栈顶。

    > 示例代码详见 1-code6.html

-----

##### 4.6 避免无限递归循环

```js
const data = {
  foo: 1
}

const obj = new Proxy(data, {})

effect(() => {
  obj.foo++ // obj.foo = obj.foo + 1
})
```

1. 在执行上述代码时，既会访问 obj.foo 的值，也会修改 obj.foo 的值，这会导致副作用函数不停的调用自己，产生栈溢出。
2. 在执行当前副作用函数的时候需要判断，如果 trigger 触发的副作用函数正在执行，则跳过。

> 示例代码详见 1-code7.html

-----

##### 4.7 调度执行

```js
const data = {
  foo: 1
}
const obj = new Proxy(data, {})
effect(() => {
  console.log(obj.foo)
})

obj.foo++
console.log('end')
// 默认打印 1 2 end
// 如何实现打印? 1 end 2
```

1. 可调度指的是当 trigger 触发副作用函数重新执行时，有能力决定副作用函数的执行时机、次数和方式等。
2. 用户在调用 effect 函数注册副作用函数时，可以传入第二个参数 options。
3. 通过 options.scheduler 实现调度。

+ 执行顺序控制
    > 示例代码详见 1-code8.html
+ 执行次数控制
    > 示例代码详见 1-code9.html

-----

##### 4.8 计算属性 computed 与 lazy

1. 通过 options.lazy 实现懒计算
    + 当 lazy 为 true 时，将副作用函数执行结果保存，手动执行

    ```js
    function computed(getter) {
      const effectFn = effect(getter, {
        lazy: true
      })

      const obj = {
        get value() {
          return effectFn()
        }
      }
      return obj
    }

    const data = { foo: 1, bar: 2 }
    const obj = new Proxy(data, {})

    const sumRes = computed(() => obj.foo + obj.bar)
    console.log(sumRes) // 3
    ```

2. 通过 options.dirty 实现缓存
    + 当 dirty 为 true 时，表示需要重新计算，否则使用上一次的计算结果

    ```js
    function computed(getter) {
      let value
      let dirty = true
      const effectFn = effect(getter, {
        lazy: true,
      })
      const obj = {
        get value() {
          if (dirty) {
            value = effectFn()
            dirty = false
          }
          return value
        }
      }
      return obj
    }
    ```
    + 如果改变响应式数据的值时，依然会读取缓存，这里需要手动将 dirty 改成 true，重新计算

    ```js
    function computed(getter) {
      let value
      let dirty = true
      const effectFn = effect(getter, {
        lazy: true,
        scheduler() {
          dirty = true
        }
      })
      const obj = {
        get value() {
          if (dirty) {
            value = effectFn()
            dirty = false
          }
          return value
        }
      }
      return obj
    }

    const data = { foo: 1, bar: 2 }
    const obj = new Proxy(data, {})
    const sumRes = computed(() => obj.foo + obj.bar)
    console.log(sumRes) // 3
    obj.foo++
    console.log(sumRes) // 4
    ```

3. 一个计算属性内部拥有自己 effect，它是懒执行的，只有在读取计算属性的值时才会执行。对于计算属性的 getter 函数，它里面访问的响应式数据只会把 computed 内部的 effect 收集为依赖。当把计算属性用于另外一个 effect 函数时，发生 effect 嵌套，外层的 effect 函数不会被内层的 effect 中的响应式依赖收集。再读取计算属性的值时，需要手动调用 track 函数进行追踪，在计算属性依赖的响应式数据发生变化时，手动调用 trigger 函数触发响应。

> 示例代码详见 1-code10.html

-----

##### 4.9 watch 的实现原理

1. watch 的实现本质上利用了 effect 和 options.scheduler

    ```js
    function watch(source, cb) {
      effect(() => source.foo, {
        scheduler() {
          cb()
        }
      })
    }

    const data = { foo: 1 }
    const obj = new Proxy(data, {})
    watch(obj, () => {
      console.log(obj.foo) // 1, 2
    })

    obj.foo++
    ```

2. 需要递归的读取被观察的对象的属性，保证该对象上的任意属性发生变化时，都能触发回调函数执行

    ```js
    function watch(source, cb) {
      effect(
        () => traverse(source), 
        {
          scheduler() {
            cb()
          }
        }
      )
    }
    function traverse(value, seen = new Set()) {
      if (typeof value !== 'object' || value === null || seen.has(value)) return
      seen.add(value)
      for (const key in value) {
        traverse(value[key], seen)
      }
      return value
    }
    ```

3. watch 不仅可以观测响应式数据，还可以接受一个 getter 函数

    ```js
    function watch(source, cb) {
      let getter
      if (typeof source === 'function') {
        getter = source
      } else {
        getter = () => traverse(source)
      }

      effect(() => getter(), {
        scheduler() {
          cb()
        }
      })
    }
    ```

4. 如何在 watch 的回调函数中拿到新值 newVal 与旧值 oldVal：利用 lazy

     ```js
     function watch(source, cb) {
      let getter
      if (typeof source === 'function') {
        getter = source
      } else {
        getter = () => traverse(source)
      }
      const effectFn = effect(() => getter(), {
        lazy: true,
        scheduler() {
          let newVal, oldVal
          // 在 scheduler 中执行 effectFn，得到的时新值
          newVal = effectFn()
          cb(newVal, oldVal)
          // 将旧值赋值为上一次的值
          oldVal = newVal
        }
      })
      // 这里调用的到的就是旧值
      oldValue = effectFn()
     }
     ```

5. 立即执行的 watch：options.immediate = true

    ```js
    function watch(source, cb, options = {}) {
      let getter
      if (typeof source === 'function') {
        getter = source
      } else {
        getter = () => traverse(source)
      }
      let newVal, oldVal
      function job() {
        newVal = effectFn()
        cb(newVal, oldVal)
        oldVal = newVal
      }
      const effectFn = effect(
        () => getter(), 
        {
          lazy: true,
          scheduler: job
        }
      )

      if (options.immediate) {
        job()
      } else {
        oldVal = effectFn()
      }
    }
    ```

6. watch 回调执行时机：options.flush = pre / post / sync

    ```js
    function watch(source, cb, options = {}) {
      let getter
      let newVal, oldVal
      function job() {
        // ...
      }
      const effectFn = effect(
        () => getter(),
        {
          lazy: true,
          scheduler() {
            if (options.flush === 'post') {
              // 设置一个微任务
              const p = Promise.resolve()
              p.then(job)
            } else {
              job()
            }
          }
        }
      )

      if (options.immediate) {
        job()
      } else {
        oldVal = effectFn()
      }
    }
    ```

> 示例代码详见 1-code11.html

-----

##### 4.10 过期的副作用

1. 竟态问题：使用 watch 观测数据 obj，每次 obj 发生变化都会发起一个请求，等到请求响应后才会设置新的值。假设我们修改了 obj 的某个属性，第一次发期了请求 A，在 A 的结果返回之前，我们又修改了 obj 的属性，第二次发起了请求 B，由于 B 是后发送的，所以我们认为 B 返回的数据的才是最新的，A 返回的数据是“过期的”，应该被视为无效。

2. 通过在 watch 中传入 onInvalidate 函数，这个函数会在当前副作用函数过期时执行

    ```js
    watch(obj, async (newVal, oldVal, onInvalidate) => {
      // 是否过期
      let expired = false
      onInvalidate(() => {
        // 手动设置过期
        expired = true
      })

      const res = await fetch('/')

      if (!expired) {
        // 未过期的结果才是有效的
        finalData = res
      }
    })
    ```

3. watch 内部每次检测到变更后，在副作用函数执行前，会首先调用我们传入的 onInvalidate 函数注册的过期回调

    ```js
    function watch(source, cb, options = {}) {
      let getter
      // ...
      let oldVal, newVal

      // 存储用户注册的过期回调
      let cleanup

      function onInvalidate(fn) {
        cleanup = fn
      }

      const job = () => {
        newVal = effectFn()
        // 先清除过期回调
        if (cleanup) {
          cleanup()
        }
        // 将 onInvalidate 作为参数，提供给用户使用
        cb(newVal, oldVal, onInvalidate)
        oldVal = newVal
      }
      const effectFn = effect(
        // ...
      )
    }
    ```

> 示例代码详见 1-code12.html
