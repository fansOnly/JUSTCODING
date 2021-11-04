/**
 * compilation
 */
const fs = require('fs')
const util = require('util')
const path = require('path')
const webpack = require('webpack')
const { RawSource } = webpack.sources

// promise 风格的 readFile
const readFile = util.promisify(fs.readFile)

class Plugin2 {
  apply(compiler) {
    /**
     * 初始化 compilation 钩子
     */
    compiler.hooks.thisCompilation.tap('Plugin2', compilation => {
    //   console.log(compilation)

       compilation.hooks.additionalAssets.tapAsync('Plugin2', async (cb) => {
        // debugger
        // console.log(compilation)
        // 添加资源
        const content = 'hello plugin2...'
        compilation.assets['a.txt'] = {
          // 文件大小
          size() {
            return content.length
          },
          // 文件内容
          source() {
            return content
          }
        }


        // 读取 b.txt 并追加到输出目录
        const data = await readFile(path.resolve(__dirname, 'b.txt'))
        // compilation.assets['b.txt'] = new RawSource(data)
        compilation.emitAsset('b.txt', new RawSource(data))

        cb()
      })
    })
  }
}

module.exports = Plugin2
