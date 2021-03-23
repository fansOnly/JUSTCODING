// node 自动化引入模块
/**
 * @param {string} directory 检索的目录
 * @param {boolean} useSubdirectories 是否检索子目录
 * @param {RegExp} regExp 匹配文件的正则表达式, 一般为文件名
 */
require.context(directory, useSubdirectories, regExp)

// example-1
const path = require('path')
const files = require.context('/folder', false, /\.js$/)
const modules = {}
files.keys().forEach(key => {
    const name = path.basename(key, '.js')
    modules[name] = files[key].default || files[key]
})

// example-2
const modules = files.keys().reduce((module, path) => {
    const name = path.replace(/^\.\/(.*)\.\w+$/, '$1')
    const value = modules[path]
    modules[name] = value.default
    return modules
}, {})
