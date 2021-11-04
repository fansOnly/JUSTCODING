/**
 * loader 本质是一个函数
 */
const { getOptions } = require('loader-utils')
const { validate } = require('schema-utils')
// 校验规则文件
const schema = require('./schema3.json')


module.exports = function(content, map, meta) {

  // 获取 options
  const options = getOptions(this)
  console.log('loader3', options)

  // 校验 options
  validate(schema, options, {
    name: 'loader3'
  })

  return content
}


/**
 * 从上往下执行
 */
module.exports.pitch = function() {
  console.log('pitch 3333')
}
