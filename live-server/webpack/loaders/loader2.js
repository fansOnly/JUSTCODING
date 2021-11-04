/**
 * loader 本质是一个函数
 */
module.exports = function(content, map, meta) {
  console.log('loader2 content')

  // 异步 loader
  const callback = this.async()

  setTimeout(() => {
    callback(null, content)
  }, 2000);
}


/**
 * 从上往下执行
 */
module.exports.pitch = function() {
  console.log('pitch 2222')
}
