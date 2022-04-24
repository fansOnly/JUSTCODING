export default {
  props: {
    to: null
  },
  // 运行时环境，只能使用 render 函数，不能用 template
  // <a href="#/foo"></a>
  // <link to="/foo"></foo>
  render(h) {
    // h(tag, data, children)
    return h('a', { attrs: { href: '#' + this.to }, class: 'router-link' }, this.$slots.default)
    // jsx
    // return <a href={'#' + this.to}>{this.$slots.default}</a>
  }
}
