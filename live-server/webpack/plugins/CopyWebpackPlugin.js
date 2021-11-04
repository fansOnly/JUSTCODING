const { validate } = require('schema-utils')
const globby = require('globby')
const fs = require('fs')
const path = require('path')
const util = require('util')
const webpack = require('webpack')
const { RawSource } = webpack.sources

const schema = require('./schema.json')
const readFile = util.promisify(fs.readFile)

class CopyWebpackPlugin {

  constructor(options) {

    validate(schema, options, {
      name: 'CopyWebpackPlugin'
    })

    this.options = options
  }

  apply(compiler) {
    compiler.hooks.thisCompilation.tap('CopyWebpackPlugin', compilation => {
      compilation.hooks.additionalAssets.tapAsync('CopyWebpackPlugin', async cb => {

        // 将 from 中的资源复制到 to 中
        let { from = '', to = '.', ignore = [] } = this.options

        // 1. 过滤掉 ignore 中定义的文件，获取需要 copy 的文件
        // 获取 webpack 配置，代码运行目录，默认 process.cwd()
        const { context = '' } = compiler.options
        const absoluteFrom = path.isAbsolute(from) ? form : path.resolve(context, from)

        const paths = await globby(absoluteFrom, { ignore })

        // 2. 读取 from 中的资源
        const files = await Promise.all(
          paths.map(async absPath => {
            const data = await readFile(absPath)
            const relativeName = path.basename(absPath)
            // 获取全路径
            const fileName = path.join(to, relativeName)
            return {
              data,
              fileName
            }
          })
        )

        // 3. 生成 webpack 格式的资源
        const assets = files.map(file => {
          const source = new RawSource(file.data)
          return {
            source,
            fileName: file.fileName
          }
        })

        // 4. 添加到 compilation 中，输出到 to
        assets.forEach(asset => {
          compilation.emitAsset(asset.fileName, asset.source)
        })

        cb()
      })
    })
  }
}

module.exports = CopyWebpackPlugin
