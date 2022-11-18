function Sub() { }

const s = new Sub()

console.log(s.__proto__.constructor === Sub) // true



// *****************************************************************************************************
// ****************************************** 2021-04-06 ***********************************************
// *****************************************************************************************************

// ⭐️⭐️⭐️
// 一般来讲, 等号赋值的方向是从右至左
// a.x指的是给a添加一个x属性，在js的运算中“.”和"="运算符同时出现，会先执行"."运算
let a = { n: 1 };
let b = a;
a.x = a = { n: 2 }; // => tmp = {n:2}, a.x = tmp, a = tmp

console.log(a.x) // undefined
console.log(b.x) // {n: 2}


// ⭐️⭐️⭐️ 闭包？？？
var a = 0,
  b = 0;
function A(a) {
  A = function (b) {
    console.log(arguments)
    console.log(a + b++)
  }
  console.log(a++)
}
A(1) // 1
A(2) // 4



/**
 * ⭐️⭐️⭐️
 * 解释就是第一次使用push,obj对象的push方法设置obj[2] = 1,obj.length++
 * 解释就是第一次使用push,obj对象的push方法设置obj[3] = 2,obj.length++
 * 使用console.log()方法输出的时候，因为obj上有length属性和splice方法，故将其作为数组输出打印
 * 打印时因为数组未设置下标为0和1的值，故打印的结果就是empty，主动获取obj[0] = undefined
 */
var obj = {
  "2": 3,
  "3": 4,
  "length": 2,
  "splice": Array.prototype.splice,
  "push": Array.prototype.push
}
obj.push(1) // 3
obj.push(2) // 4
console.log(obj) // [empty * 2, 1, 2, splice, push]


/**
 * 稀疏数组 - filter map ⭐️
 * callback 函数只会在有值的索引上被调用
 */
var ary = [0, 1, 2];
ary[10] = 10;
console.log(ary.filter(function (x) { return x === undefined; })) // []


/**
 * switch 条件语句严格比较 ⭐️
 */


/**
 * ⭐️
 * % 如果不是数值会调用Number（）去转化
 * Infinity % 2  //NaN  Infinity 是无穷大
 * 9 % -2        // 1   余数的正负号随第一个操作数
 */
function isOdd(num) {
  return num % 2 == 1;
}
function isEven(num) {
  return num % 2 == 0;
}
function isSane(num) {
  return isEven(num) || isOdd(num);
}
var values = [7, 4, '13', -9, Infinity]; // [1, 0, 1, -1, NaN]
values.map(isSane);
console.log(values) // [ true, true, true, false, fasle ]


/**
 * 数组的原型是数组，对象的原型是对象，函数的原型是函数
 */
console.log(Array.isArray(Array.prototype)) // true



/**
 * {} + [] => {} 被解析为空的代码块
 */



/**
 * 逻辑或比三元运算符的优先级高 ⭐️
 */
console.log(1 || 1 ? 2 : 3) // (1 || 1) ? 2 : 3 => 2

/**
 * 逻辑与比逻辑或的优先级高 ⭐️
 */
function fn() { return 'fn' }
console.log(1 || fn() && fn()) // 1 || (fn() && fn()) => 1


/**
 * 原型 ⭐️
 */
function f() { }
var a = f.prototype, b = Object.getPrototypeOf(f);
// b = Function.prototype
console.log(a === b) // constructor f() != f() [native code] false


/**
 * 函数名称 - 不可变 ⭐️
 */
function foo() { }
var oldName = foo.name
foo.name = 'bar'
console.log(oldName, foo.name) // foo foo


/**
 * 数组方法 - reduce ⭐️⭐️
 * 没有初始值会报错
 * 只有初始值不会执行回调函数
 */
console.log([].reduce(Math.pow)) // TypeError: Reduce of empty array with no initial value
console.log([2].reduce(Math.pow)) // 2
console.log([2].reduce(Math.pow, 3)) // 9



/**
 * 正则替换 - replace ⭐️⭐️
 * 指定一个函数作为参数时
 * 1. 匹配想
 * 2. 匹配的字串 - 捕获组
 * 3. 匹配项的位置
 * 4. 原始字符串
 */
console.log("1 2 3".replace(/\d/g, parseInt))
// parseInt('1', 0) // 1
// parseInt('2', 2) // NaN
// parseInt('3', 4) // 3




/**
 * Function.length ⭐️
 */
var a = Function.length,
  b = new Function().length
console.log(a, b) // 1 0



/**
 * 数组排序 - sort ⭐️
 */
console.log([1, 2, 5, 10].sort()) // [1, 10, 2, 5]



/**
 * 字符串拼接 ⭐️
 */
console.log("b" + "a" + +"a" + "a") // 'b' + 'a' + (+'a') + 'a' => 'baNaNa'



/**
 * 变量作用域 ⭐️
 */
let res = new Array()
for (var i = 0; i < 10; i++) {
  res.push(console.log.bind(null, i))
}
res[0]() // 1
res[1]() // 2
res[2]() // 3


/**
 * 隐私转换 ⭐️
 * 1. a => true
 * 2. a == true => a == 1 => false
 */
var a = [0];
if (a) {
  console.log(a == true); // false
} else {
  console.log("wut");
}

// 函数 => 函数体字符串
function fn() {
  return 20;
}
console.log(fn + 10);


/**
 * 二进制 vs 十进制 ⭐️
 * 1. 十进制转换二进制 连续除以2，自下而上读取结果
 * 2. 二进制转换十进制 位数 * 2ⁿ
 */

// 1110 => 1 * 2³ + 1 * 2² + 1 * 2¹ + 0 * 2⁰ = 8 + 4 + 2 + 0 = 14




/**
 * 大数相加 ⭐️⭐️
 */
function largeNumAdd(a, b) {
  let result = ''
  let arrA = a.split('')
  let arrB = b.split('')
  let temp = 0
  while (arrA.length || arrB.length) {
    let bitValue = ~~arrA.pop() + ~~arrB.pop() + temp
    result = (bitValue % 10) + result
    temp = Math.floor(bitValue / 10)
  }
  if (temp > 0) {
    result = temp + result
  }
  return result
}




/**
 * arguments ⭐️⭐️⭐️
 * 当非严格模式中的函数没有包含剩余参数、默认参数和解构赋值，
 * 那么arguments对象中的值会跟踪参数的值（反之亦然）
 */
function fn(a) {
  arguments[0] = 99
  console.log(a)
}

fn(10) // 99

function fn(a) {
  a = 99
  console.log(arguments[0])
}
fn(10) // 99

/**
 * 当非严格模式中的函数有包含剩余参数、默认参数和解构赋值，
 * 那么arguments对象中的值不会跟踪参数的值（反之亦然）
 */
function fn(a = 1) {
  arguments[0] = 99
  console.log(a)
}
fn(10) // 10

function fn(a = 1) {
  a = 10
  console.log(arguments[0])
}
fn(10) // 10

function fn(a = 5) {
  console.log(arguments[0])
}
fn() // undefined



/**
 * ⭐️⭐️
 * Math.max < Math.min
 * Math.max: 无参返回 Infinity
 * math.min: 无参返回 -Infinity
 */
console.log(Math.max() < Math.min()) // true


/**
 * ⭐️⭐️⭐️⭐️
 * [].concat[1,2,3]
 * 1. [].concat = Array.prototype.concat
 * 2. 执行逗号操作符 1,2,3 => 3
 * 3. 执行一个数组访问运算或属性访问运算 [].concat[3] => undefined
 */
console.log([].concat[1,2,3]) // undefined


/**
 * ⭐️⭐️⭐️⭐️⭐️
 * 作用域 + 运算符优先级
 * 同级从左到右依次执行
 * 成员访问 . 21
 * 不带参 new 20
 * 带参 new 21
 */
function Foo() {
  getName = function () { alert (1); }; // 改写全局的 getName 函数
  return this;
}
Foo.getName = function () { alert (2);};
Foo.prototype.getName = function () { alert (3);};
var getName = function () { alert (4);};
function getName() { alert (5);}

//请写出以下输出结果：
Foo.getName(); // 2
getName(); // 4
Foo().getName(); // 1
getName(); // 1
new Foo.getName(); // new (Foo.getName()) // 2
new Foo().getName(); // (new Foo()).getName() // 3
new new Foo().getName(); // new ((new Foo()).getName()) // 3


