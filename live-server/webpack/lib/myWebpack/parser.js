const fs = require('fs')
const path = require('path')
const babelParser = require('@babel/parser')
const traverse = require('@babel/traverse').default
const { transformFromAst } = require('@babel/core')

const parser = {
  // 获取 ast
  getAst(filePath) {
    // 同步读取文件
    const file = fs.readFileSync(filePath, 'utf-8')
    // 2. 解析 AST 抽象语法树
    const ast = babelParser.parse(file, {
      // 解析文件的模块化方案是 ES Module
      sourceType: 'module',
    })

    return ast
  },
  // 获取依赖
  getDeps(ast, filePath) {
    // 获取文件夹路径
    const dirname = path.dirname(filePath)
    // 定义存储依赖的容器
    const deps = {}
    // 收集依赖关系
    traverse(ast, {
      // 遍历 ast 中的 program.body，判断语句的类型
      // import 引入语句类型
      ImportDeclaration({node}) {
        // 获取文件相对路径 node -> source -> value
        const relativePath = node.source.value
        const fullPath = path.resolve(dirname, relativePath)
        // 添加依赖
        deps[relativePath] = fullPath
      }
    })

    return deps
  },
  getCode(ast) {
    const { code } = transformFromAst(ast, null, {
      presets: [
        '@babel/preset-env'
      ]
    })

    return code
  }
}


module.exports = parser
