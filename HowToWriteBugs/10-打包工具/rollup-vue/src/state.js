import { observe } from './observe/index'

export function initState(vm) {
  const opts = vm.$options

  if (opts.props) { // 初始化传入的属性
    initProps(vm)
  }
  if (opts.methods) { // 初始化方法
    initMethod(vm)
  }
  if (opts.data) { // 初始化 data
    initData(vm)
  }
  if (opts.computed) { // 初始化计算属性
    initComputed(vm)
  }
  if (opts.watch) { // 初始化 watc
    initWatch(vm)
  }
}

function initProps(vm) {

}

function initMethod(vm) {

}

function initData(vm) {
  // 将 data 转换为对象并提供给用户访问
  let data = vm.$options.data
  data = vm._data = typeof data === 'function' ? data.call(vm) : data

  // 响应式
  observe(data)
}

function initComputed(vm) {

}

function initWatch(vm) {

}
