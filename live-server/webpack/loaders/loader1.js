/**
 * loader 本质是一个函数
 */
module.exports = function(content, map, meta) {
  console.log('loader1 content')

  // 同步 loader
  this.callback(null, content, map, meta)
  // return content
}


/**
 * 从上往下执行
 */
module.exports.pitch = function() {
  console.log('pitch 111')
}
