class MyPlugin {
  constructor(options) {
    this.options = options
  }
  apply(compiler) {
    // compiler.plugin.hooks.tapAsync()
    compiler.plugin('emit', compilation => {
      console.log('tap my plugin.', compilation)
    })
  }
}
