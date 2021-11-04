const path = require('path')
const fs = require('fs')
const { getAst, getDeps, getCode } = require('./parser')

/**
 * 编译类
 */
class Compiler {

  constructor(options = {}) {
    this.options = options
    // 所有的模块依赖信息
    this.modules = []
  }

  /**
   * 启动 webpack 打包
   */
  run() {
    // 1. 读取入口文件
    const filePath = this.options.entry

    // 第一次构建获得的入口文件信息
    const fileInfo = this.build(filePath)

    this.modules.push(fileInfo)

    this.modules.forEach(fileInfo => {
      // 获取当前文件的所有依赖
      const deps = fileInfo.deps

      for (let key in deps) {
        const file = this.build(deps[key])
        this.modules.push(file)
      }
    })

    // console.log(this.modules)

    // 生成依赖关系图
    const depsGraph = this.modules.reduce((graph, module) => ({
      ...graph,
      [module.filePath]: {
        deps: module.deps,
        code: module.code
      }
    }), {})

    // console.log(depsGraph)

    this.generate(depsGraph)
  }

  /**
   * 生成输出资源
   */
  generate(depsGraph) {
    /**
     * index.js 代码
     * "use strict";\n' +
      '\n' +
      'var _add = _interopRequireDefault(require("./add.js"));\n' +
      '\n' +
      'var _count = _interopRequireDefault(require("./count.js"));\n' +
      '\n' +
      'function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }\n' +
      '\n' +
      'console.log((0, _add["default"])(1, 2));\n' +
      'console.log((0, _count["default"])(1, 2));
     */
    // 输出内容
    const bundle = `
      (function (depsGraph) {
        // 入口文件的解析
        function require(module) {
          // 用于解析模块内部引用的其他文件
          function localRequire(relativePath) {
            // 获取当前模块的绝对路径，通过 require 函数加载
            return require(depsGraph[module].deps[relativePath])
          }

          // 暴露的内容
          var exports = {}

          (function (require, exports, code) {
            eval(code)
          })(localRequire, exports, depsGraph[module].code)

          return exports
        }

        require('${this.options.entry}')
      })(${JSON.stringify(depsGraph)})
    `

    // 生成输出路径
    const fullPath = path.resolve(this.options.output.path, this.options.output.filename)
    // 写入文件
    fs.writeFileSync(fullPath, bundle, 'utf-8')
  }

  /**
   * 开始构建
   */
  build(filePath) {
    // 1. 解析 AST 抽象语法树
    const ast = getAst(filePath)
    // console.log('ast: ', ast);

    // 2. 收集依赖
    const deps = getDeps(ast, filePath)
    // console.log('deps: ', deps);

    // 3. 编译浏览器不能识别的代码
    const code = getCode(ast)
    // console.log('code: ', code);

    return {
      filePath,
      deps,
      code
    }
  }

}


module.exports = Compiler
