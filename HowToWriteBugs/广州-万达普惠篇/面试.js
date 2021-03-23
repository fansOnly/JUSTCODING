
// 参数不传递或是传递undefined会让参数等于默认值，如果参数不是最后一个，不传递参数就会报错。
// 传递null不会让函数参数等于默认值。

const fn1 = (x, y = 'world') => {
    return x + ' ' + y;
}

console.log(fn1('hello'))

console.log(fn1(undefined,))

console.log(fn1('hello', undefined))

console.log(fn1('hello', ''))

console.log(fn1('hello', null))



// forEach 来遍历数组
// for in 遍历对象或 json, for in 循环出的是 key
// for of 数组对象都可以遍历, for of 循环出的是 value
const json = {
    title: 'sjon1111',
    content: [1,2,3],
    intro: {
        name: 'lili'
    }
}

for (let i in json) {
    console.log(i)
}

const arr = ['a', 'b', 'c']

for (let i in arr) {
    console.log(i + '=>'+ arr[i])
}

for (let v of arr) {
    console.log(v)
}


// 闭包函数可以访问它创建时所处的上下文环境中的变量以及参数，this以及arguments除外。

function fn2() {
    fn2 = 10;
    console.log(fn2)
}

fn2()

var a = 10;

( function a() {
    a = 20;
    console.log(a)
})();

console.log(a);

(b = function a(){
    a = 30;
    console.log(a) // 这个 a 为什么是函数, 为什么 a 的值不能被覆盖
    console.log(b)
    console.log(b === a)

    b = 20;
    console.log(b)
})();

console.log(a);
console.log(b);

function sum(a, b, c) {
    return a + b + c
}




// 函数柯里化
function curry1(fn) {
    return function curried(...args) {
        if (args.length >= fn.length) {
            return fn.apply(this, args)
        } else {
            return function (...restArgs) {
                return curried.apply(this, args.concat(restArgs))
            }
        }
    }
}

var currySum1 = curry1(sum);
console.log(currySum1(1, 2)(3))

// 进阶版
function curry(fn) {
    var length = fn.length; // 获取参数个数
    var args = Array.prototype.slice.call(arguments, 1);
    return function () {
        var restArgs = Array.prototype.slice.call(arguments);
        var newArgs = args.concat(restArgs);
        if (newArgs.length < length) {
            return curry.call(this, fn, ...newArgs);
        } else {
            return fn.apply(this, newArgs);
        }
    }
}

let currySum = curry(sum)

console.log(currySum(1, 2)(3))
console.log(currySum(1)(2)(3))




// 反转
const str1 = 'abc def'; // => def abc

const str22 = str1.split(' ').reverse().join(' ')
console.log(str22)
const str2 = str1.replace(/(\w+)\W(\w+)/, '$2 $1')
console.log(str2)





// 运算符

// 赋值从右到左
+function (){var a1 = b1 = 1;}();  // b = 1; var a = b
 console.log(b1);
//  console.log(a1);   error: a1 is not defined


var n1 = 1;
var n2 = n1++ + ++n1;
console.log(n1, n2)

var a = 42;
 var b = "foo";
 var c = 0;

 {
    (a && b) || c ? ((c || b) ? a : (c && b)) : a
 }

 console.log(a && b || c ? c || b ? a : c && b : a)





// 虚值: 转换为 boolean 类型时值为 fasle，['', 0, false, undefined, null, NaN]

// es5 "use strict;"
// 1 禁止变量未声明使用
// 2 禁止使用 with
// 3 禁止 this 指向全局对象
// 4 禁止函数的参数同名属性
// 5 不能对只读属性赋值
// 6 不能删除不可删除的属性



{
    "use strict";
    const object1 = {};

    Object.defineProperty(object1, 'property1', {
    value: 42,
    writable: false
    });

    object1.property1 = 77;
    // throws an error in strict mode

    console.log(object1.property1);
}


// 关于 this 指向
(function (){
    console.log(this);
  })(); // 打印 "window" 对象

  function iHateThis(){
     console.log(this);
  }

  iHateThis(); // 打印 "window" 对象

  const myFavoriteObj = {
    guessThis(){
       function getName(){
         console.log(this);
       }
       getName();
    },
    guessThis2(){
        var self = this;
       function getName(){
         console.log(self);
       }
       getName();
    },
    guessThis3(){
        const getName = () => {
         console.log(this);
       }
       getName();
    },
    name: 'Marko Polo',
    thisIsAnnoying(callback){
      callback();
    }
  };


  myFavoriteObj.guessThis(); // 打印 "window" 对象
  myFavoriteObj.guessThis2(); // 打印 "window" 对象
  myFavoriteObj.guessThis3(); // 打印 "window" 对象
  myFavoriteObj.thisIsAnnoying(function (){
    console.log(this); // 打印 "window" 对象
  });



  
// 实现 new
function Func(name, age) {
    this.name = name;
    this.age = age;
}

Func.prototype.hello = function() {
    return 'parent is ' + this.name + '; age is ' + this.age;
}

const p1 = new Func('lily', 15);
console.log(p1.hello())


// one
function myNew(fn, ...args) {
    const obj = Object.create(fn.prototype);
    const res = fn.apply(obj, args);
    return typeof res === 'object' && res !== null ? res : obj;
}

const p2 = myNew(Func, 'xiaoxiao', 30);
console.log(p2)
console.log(p2.hello())

// two
function myNew2() {
    const Constructor = [].shift.call(arguments)
    let obj = Object.create(null)
    obj.__proto__ = Constructor.prototype
    Constructor.call(obj, ...arguments)
    return obj
}

const p3 = myNew2(Func, 'hehe', 20)
console.log(p3)
