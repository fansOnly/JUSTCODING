/**
 * 全局预编译流程
 * 1. 创建 GO 对象
 * 2，查找变量声明，赋值 undefined
 * 3. 查找函数声明，赋值函数体
 *
 * 函数预编译流程
 * 1. 创建 AO 对象
 * 2. 查找形参和变量声明，赋值 undefined
 * 3. 实参值赋给形参
 * 4. 查找函数声明，赋值函数体
 *
 * AO: {
 *    a: undefined => 1(形参赋值) => function a() {} (函数赋值)
 *    c: undefined => 3(形参赋值) => function c() {} (函数赋值)
 *    d: undefined
 *    b: undefined
 * }
 */


/**
 * 创建变量对象的过程 - AO
 * 1. 创建 arguments 对象
 * 2. 检查函数声明
 * 3. 检查变量声明
 */

function fn(a, c) {
  console.log(a) // f -> a
  var a = 123
  console.log(a) // 123
  console.log(c) // f -> c
  function a() {}
  if (false) {
    var d = 456
  }
  console.log(d) // undefined
  console.log(b) // undefined
  var b = function () {}
  console.log(b) // f
  function c() {}
  console.log(c) // f -> c
}

fn(1, 2)
