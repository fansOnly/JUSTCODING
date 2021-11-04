/**
 * 引用变量赋值
 * 1. 修改对象数据，原对象改变
 * 2. 指向新的对象，原对象不变
 */
var a = {
  age: 12
}
var b = a
a = {
  name: 'jack',
  age: 13
}

console.log(a, b)

function fn(obj) {
  obj = {
    age: 20
  }
}

fn(a)

console.log(a)



/**
 * 函数参数传递是值传递
 * 1. 基本值
 * 2. 地址值
 */
var a = 3
function fn(a) {
  a = a + 1
}

console.log(a)



/**
 * 函数执行完后
 * 1. 局部变量：自动释放内部的
 * 2. 对象变量：成为垃圾对象 -> 垃圾回收器自动回收
 */



/**
 * this
 * 1. 直接调用：window
 * 2. 对象调用：对象本身
 * 3. new 调用：构造函数
 * 4. call/apply/bind调用：指向的对象
 */


/**
 * 代码风格-分号
 * 1. 括号开头的前一句
 * 2. 中括号开头的前一句
 */
