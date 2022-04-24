export default {
  render(h) {
    // 获取 path 对应的 component
    const { routeMap, current } = this.$router
    let component = routeMap[current].component || null
    return h(component)
  }
}
