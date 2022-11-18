/**
 * 1. 首先，这里涉及到变量和函数的提升
 * 2. 函数提升优于变量
 * 3. 函数提升时，会带着函数体一起
 * 4. 变量提升只会提升声明，而赋值操作则在运行时
 * 5. block 环境外，应无法访问函数
 */
// {
//   a = 1
//   function a() { }
//   a = 2
//   console.log(a) // 2
// }
// console.log(a) // 1·


// 块中的函数会在全局定义一个 var a
console.log(a) // 由函数提升上来的变量 // undefined
{
  // 函数提升，并且在词法环境声明了 a
  let a = function a() {}
  a = 1 // 赋值给了词法环境中的 a
  function a() {} // 函数声明执行时，会绑定变量环境（var）与词法环境（let）
  a = 2 // 赋值给词法环境中的 a
  console.log(a) // 输出词法环境中的 a // 2
}
console.log(a) // 输出变量环境中的 a // 1
