/**
 * 同步 loader
 */
modules.exports = function (source) {
  return source.replace('a', 'b')
}

/**
 * 异步 loader
 */
const loaderUtils = require('loader-utils')
modules.exports = function (source) {
  const options = loaderUtils.getOptions(this)
  const callback = this.sync()
  setTimeout(() => {
    const res = source.replace('a', options.title)
    callback(null, res, sourceMaps, ast)
  }, 3000)
}
