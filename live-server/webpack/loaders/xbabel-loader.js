/**
 *  尝试编写一个 babel-loader
 */
const { getOptions } = require('loader-utils')
const { validate } = require('schema-utils')
const babel = require('@babel/core')
const util = require('util')

const schema = require('./babel-schema.json')

/**
 * 将 babel 的 transform 函数转换为 promise 形式
 */
const transform = util.promisify(babel.transform)

module.exports = function(content, map, meta) {

  // 获取参数
  const options = getOptions(this) || {}

  // 校验参数格式
  validate(schema, options, {
    name: "xbabel-loader"
  })

  // 异步 loader
  const callback = this.async()

  // 实现 babel 编译
  transform(content, options)
  .then(({code, map}) => {
    callback(null, code, map, meta)
  })
  .catch(e => callback(e))
}
