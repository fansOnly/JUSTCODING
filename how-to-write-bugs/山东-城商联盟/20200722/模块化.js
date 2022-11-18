// CommonJS  AMD CMD ES6


// CommonJS  服务端的模块规范, 运行时加载
// 整个模块时一个对象, 导入时加载模块的所有方法, 生成一个对象, 然后再从这个对象读取相应的方法


// AMD CMD 浏览器端的模块规范


// ES6  编译时加载 静态加载
// 本身不是对象, 导入时只加载指定的方法
// 模块内部默认使用严格模式
// 在模块顶部 this 为 undefined
// 模块不支持html风格的代码注释
// 通过script标签引入模块需要将type="module", 需要提供绝对url和相对url


// ⭐ export 和 import 只能在其他语句、函数外使用


// es6 导出 export

// 导出变量
// 1
// export const name = '111'
// 2
// const name = '111'
// export { name }
// 3
// expport { name as name1 }


// 导出函数
// 1
// export function f1() {}
// 2
// function f2() {}
// export { f2 }
// 3
// export { f2 as f3 }


// 导出类
// 1
// export class c1 {}
// 2
// class c2 {}
// export { c2 }
// 3
// export { c2 as c3 }


// 导出默认值 一个文件只能导出一个默认值 default

// 导出变量默认值
// 1
// const name = '222'
// export default name
// 2
// export { name as default }

// 导出函数默认值
// function f1() {}
// 1
// export default f1
// 2
// export { f1 as default }

// 导出类默认值
// class c5 {}
// 1
// export default c5
// 2
// export { c5 as default }



// 导入 import

// 导入单个模块
// import name from ''

// 导入多个模块
// import { a, b } from ''

// 导入全部模块
// import * as c from ''

// 导入时重命名
// import { name as name2 } from ''


// 导入默认值
// import name from ''

// 同时导入默认值和非默认值
// 1 默认值默认名称 - 默认值在前
// import name, { name2 } from ''
// 2 默认值重命名 - 无顺序要求
// import { default as name, name2 } from ''


// 导出已经导入的内容
// 1 先导入 后导出
// import name from ''
// export { name }
// 2 一步实现
// export { name } from ''
// 导出全部
// export * as all from ''
