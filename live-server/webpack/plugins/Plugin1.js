/**
 *  plugin 本质是一个类
 */
class Plugin1 {
  apply(compiler) {
    compiler.hooks.emit.tap('Plugin1', (compilation) => {
      console.log('emit.tap 1111')
    })

    compiler.hooks.emit.tapAsync('Plugin1', (compilation, cb) => {
      setTimeout(() => {
        console.log('afterEmit.tapAsync')
        cb()
      }, 1000);
    })

    compiler.hooks.emit.tapPromise('Plugin1', (compilation) => {
      return new Promise((resolve) => {
        setTimeout(() => {
          console.log('emit.tapPromise')
          resolve()
        }, 1000);
      })
    })

    compiler.hooks.afterEmit.tap('Plugin1', (compilation) => {
      console.log('afterEmit.tap 22222')
    })

    compiler.hooks.done.tap('Plugin1', (stats) => {
      console.log('done.tap 333')
    })
  }
}

module.exports = Plugin1
