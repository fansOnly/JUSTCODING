#### 六、原始值的响应式方案

-----

##### 6.1 ref

1. Proxy 只能代理对象，想要“代理”原始值，需要将其包装成一个对象
2. 如何区分是原始值还是一个非原始值的响应式数据

    ```js
    function ref(val) {
      const wrapper = {
        value: val
      }
      Object.defineProperty(wrapper, '__v_isRef', {
        value: true
      })
      return reactive(wrapper)
    }
    ```

> 示例代码详见 3-code6-1.html

-----

##### 6.2 响应丢失问题

1. 对于一个响应式数据，如果直接暴露给模版使用，就失去了响应式

    ```js
    export default {
      setup() {
        const obj = reactive({ foo: 1, bar: 2 })
        return {
          ...obj
        }
        // this is like
        //return {
        //  foo: 1,
        //  bar: 2
        //}
      }
    }
    ```

2. 通过将暴露给模板的属性关联到响应式数据上解决响应丢失问题

      ```js
      function toRef(obj, key) {
        const wrapper = {
          get value() {
            return obj[key]
          },
          set value(val) {
            obj[key] = val
          }
        }
        // toRef 返回的数据是一个真正的 Ref 值
        Object.defineProperty(wrapper, '__v_isRef', {
          value: true
        })
        return wrapper
      }
      function toRefs(obj) {
        const ret = {}
        for (let key in obj) {
          ret[key] = toRef(obj, key)
        }
        return ret
      }
      ```

> 示例代码详见 3-code6-2.html

-----

##### 6.3 自动脱 ref

1. 自动脱 ref 指的是属性的访问行为，如果读取的是一个 ref 值，直接将该 ref 值的 value 返回

    ```js
    function proxyRefs(target) {
      return new Proxy(target, {
        get(target, key, receiver) {
          const value = Reflect.get(target, key, receiver)
          return value.__v_isRef ? value.value : value
        }
      })
    }
    ```

2. Vue.js 3 中的 setup 函数返回的数据会传递给 proxyRefs 函数处理
3. Vue.js 3 中的 reactive 函数也有自动脱 ref 的能力

    ```js
    const count = ref(0)
    const obj = reactive({ count })
    obj.count // 0
    ```

> 示例代码详见 3-code6-3.html
