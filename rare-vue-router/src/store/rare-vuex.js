import { partial } from '@/utils'
let Vue

class Store {
  constructor(options) {
    this._mutations = options.mutations
    this._actions = options.actions
    this._wrappedGetters = options.getters

    // 绑定 this 指向
    const store = this
    const { commit, dispatch } = this
    this.commit = function(type, payload) {
      return commit.call(store, type, payload)
    }
    this.dispatch = function(type, payload) {
      return dispatch.call(store, type, payload)
    }

    // 处理 getters
    const computed = registerGetter(store)

    Vue.config.silent = true
    store._vm = new Vue({
      data: {
        $$state: options.state
      },
      computed
    })
    console.log('store._vm: ', store._vm.double);
  }

  // 避免用户直接修改 state
  get state() {
    return this._vm._data.$$state
  }

  set state(v) {
    console.error('this is forbidden...')
  }

  /**
   * @param {string} type
   * @param {string} payload
   */
  commit(type, payload) {
    const entry = this._mutations[type]
    if (entry) {
      entry(this.state, payload)
    }
  }

  /**
   * @param {string} type
   * @param {string} payload
   */
  dispatch(type, payload) {
    const entry = this._actions[type]
    if (entry) {
      entry(this, payload)
    }
  }
}

function install(_Vue) {
  Vue = _Vue

  Vue.mixin({
    beforeCreate() {
      if (this.$options.store) {
        Vue.prototype.$store = this.$options.store
      }
    },
  })
}

function registerGetter(store) {
  store.getters = {}
  const wrappedGetters = store._wrappedGetters
  let computed = {}
  Object.entries(wrappedGetters).forEach(([key, fn]) => {
    // 将 store 实例传入
    computed[key] = partial(fn, store)
    Object.defineProperty(store.getters, key, {
      get: () => store._vm[key],
      enumerable: true
    })
  })
  return computed
}

export default {
  Store,
  install
}
