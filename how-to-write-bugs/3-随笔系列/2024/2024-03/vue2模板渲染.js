function initMixin (Vue) {
  Vue.prototype._init = function(options) {
    const vm = this
    vm.$options = options

    // initState(vm)

    if (vm.$options.el) {
      vm.$mount(vm.$options.el)
    }
  }

  Vue.prototype.$mount = function(el) {
    const vm = this
    const options = vm.$options

    el = document.querySelector(el)

    if (!options.render) {
      let template = options.template
      if (template) {
        // ...
      } else if (el) {
        template = el.outerHTML
      }

      if (template) {
        const render = compileToFunctions(template)
        options.render = render
      }

      return this
    }
  }
}


function compileToFunctions (template) {
  const ast = parse(template, options)
  const code = generate(ast, options)

  return {
    ast,
    render: code.render
  }
}