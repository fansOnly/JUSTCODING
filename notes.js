// var obj = [1,2,3];
// console.log(obj.__proto__);
// console.log(obj.__proto__ === Array.prototype);

// console.log(Number.prototype.__proto__);
// console.log(Array.prototype.__proto__);

// var o = Object.create(null);
// console.log(o.__proto__);


// splice
// const arr3 = [1,2,3,4,5];
// const newValue3 = 8;
// const vIndex3 = 2;
// arr3.splice(vIndex3, 1, newValue3);
// console.log(arr3);

// const newLength3 = 7;
// arr3.splice(newLength3);
// console.log(arr3);

const arr4 = [
    {
        name: 'ablis',
    },
    {
        name: 'sari'
    },
    {
        name: 'colle'
    },
    {
        name: 'ahom'
    },
    {
        name: 'ella'
    },
    {
        name: 'ackkk'
    }
];

// arr4.sort((a, b) => a.name.toUpperCase() > b.name.toUpperCase() ? 1 : -1)

const rst = [...new Set(arr4.map(item => item.name.split('')[0]))];
rst.sort((a, b) => a.toUpperCase() > b.toUpperCase() ? 1 : -1)
let tmp = new Array(rst.length);
tmp.fill([]);
rst.map((item, index) => {
    arr4.map(item2 => {
        if (item2.name.split('')[0] == item) {
            console.log(item2, index)
            tmp[index] = [...tmp[index], item2];
        }
    })
})
console.log(tmp);


// let arr5 = [{a:1}, 123, () => {}, undefined, null, ''];
// console.log('显式转换::', arr5.toString());


// var obj5 = {}
// obj5[arr5] = "";
// console.log('隐式转换::', obj5)


// var arr6 = [1,2,3,4]
// console.log('return length::', arr6.push(5))
// console.log(arr6);

// console.log('return length::', arr6.unshift(0))
// console.log(arr6);

// console.log('return ele::', arr6.pop())
// console.log(arr6);

// console.log('return ele::', arr6.shift())
// console.log(arr6);


// var arr7 = [1,2,3,4,5,6];
// console.log(arr7.slice(-2,-1));
// console.log(arr7.slice(4,5));

// var arr8 = ['a', 'b', 'c', 'd', 'e'];

// var r8 = arr8.reduce((pre, cur, index) => {
//     console.log(index);
//     return pre + cur;
// })
// console.log(r8);

// var r9 = arr8.reduce((pre, cur, index) => {
//     console.log(index);
//     return pre + cur;
// }, '')
// console.log(r9);


// var obj1 = {
//     a: 1,
//     b: 2
// };
// console.log(Object.keys(obj1));
// console.log(Object.values(obj1));
// console.log(Object.entries(obj1));

// console.log(Object.entries(['a', 'c']));
// console.log(Object.entries('abc'));
// console.log(Object.entries(NaN));


// console.log([1,2,NaN].indexOf(NaN))
// console.log([1,2,NaN].includes(NaN))

// console.log([].some(() => {}))
// console.log([].every(() => {}))


// let { toString: s1 } = 123;
// console.log(s1 === Number.prototype.toString)

// let { toString: s2 } = true;
// console.log(s2 === Boolean.prototype.toString)

// var obj2 = {
//     a: 10,
//     es7: function() {
//         console.log(7777);
//     }
// }

// console.log([...obj2])


// let map = new Map();
// map.set('first', 'zhang');
// map.set('last', 'le');

// for (let [key, value] of map) {
//     console.log(key, value);
// }

// var str = 'abcde';
// for (let s of str) {
//     console.log(s)
// }


// console.log(Number.isFinite(1+[]))
// console.log(Number.isSafeInteger(2**52))
// console.log(Number.isSafeInteger(2**55))


// console.log(1 + [])
// console.log(typeof(1+[]))


// function fn(a,b,c,...d) {}
// console.log(fn.length)

// function fn2(a,b = 1, c) {}
// console.log(fn2.length)

// function func(a,b,c) {
//     console.log(a,b,c)
//     console.log(this)
// }

// func.call({a:1},1,2,3)
// func.call('123',1,2,3)
// func.apply({a:1},[1,2,3])
// var bindF = func.bind({a:1}, 1)
// bindF(2,3);

// let str3 = `
//     React makes it painless to create interactive UIs.
//      Design simple views for each state in your application, and React will efficiently update and render just the right components when your data changes
// `;

// let res = [];
// var pos = str3.indexOf('e');
// while (pos > -1) {
//     res.push(pos);
//     pos = str3.indexOf('e', pos + 1);
// }
// console.log(res)

// var str1 = 'hello world'
// console.log(str1.split('l'))
// console.log(str1.split(/(l)/))


// var arr9 = ['a', 'ab', 'ba', 'gg', 'c', 'ed', 'fa'];
// var res9 = arr9.sort((a, b) => a > b ? 1 : -1)
// console.log(res9)


// var a1 = [1,2,5,7,8,4,5];
// var a2 = [0,3,6,2,9,10,8,5];
// const com = [...new Set(a1)].filter(item => a2.includes(item))
// console.log(com)

// const diff1 = [...new Set(a1)].filter(item => !a2.includes(item))
// const diff2 = [...new Set(a2)].filter(item => !a1.includes(item))
// console.log(diff1, diff2, [...diff1, ...diff2])


// var person = {
//     name: 'lilei',
//     age: 20,
// }
// var person2 = {
//     name: 'lilei',
//     age: 20
// }
// console.log(person === person2)

// Object.defineProperty(person, 'weight', {
//     value: '80',
//     enumerable: false
// })
// console.log(person)
// console.log(person.weight)

// var clone = {
//     ...person
// }
// console.log(clone)
// console.log(clone.weight)
// console.log(person === clone)

// 原型丢失
// class Game {
//     constructor(name) {
//         this.name = name;
//     }
//     play() {
//         return `let's play ${this.name}`;
//     }
// }

// var player = new Game('cd');

// console.log(player instanceof Game)
// console.log(player.name)
// console.log(player.play())

// var player2 = {
//     ...player,
//     // __proto__: Game.prototype
// }

// var player3 = Object.assign({}, player);
// var player4 = Object.assign(new Game(), player);

// console.log(player2 instanceof Game)
// console.log(player2.name)
// console.log(player2.play)


// function multiline(str, option = {}) {
//     option = {
//         width: 10,
//         newLine: '\\n',
//         indent: '',
//         ...option,
//     }
//     // const reg = /([\w\s]{3})/g;
//     const reg = new RegExp("([\\w\\s]{"+option.width+"})", 'g');
//     return str.replace(reg, `${option.indent}$&${option.newLine}`)
//     // return str.replace(reg, function(x) {
//     //     return option.indent + x + option.newLine;
//     // })
// }

// console.log(multiline('Hello World!'))
// console.log(multiline('Hello World!', {width: 5, newLine: '*', indent: '-'}))

// console.log({...null})
// console.log({...undefined})
// console.log({...2}, {...'a'}, {...true}, {...Symbol}, {...NaN})


// 偏函数
// function partial () {
//     const fn = arguments[0];
//     const args = Array.prototype.slice.call(arguments, 1);
//     console.log(args)

//     return function() {
//         var remainArgs = Array.prototype.slice.call(arguments);
//         console.log(remainArgs)
//         return fn.apply(this, args.concat(remainArgs))
//     }
// }

// const fn3 = function() {
//     return Array.prototype.reduce.call(arguments, (a, b) => a + b, 0)
// }
// const res3 = partial(fn3, 1, 2);
// console.log('partial', res3(3, 4, 5));
// const res33 = partial(fn3, 1);
// console.log('1+2+3', res33(2))


// 函数柯里化 1.0
// function curry(func) {
//     return function curried(...args) {
//         // console.log(args)
//         if (args.length >= func.length) {
//             return func.apply(this, args)
//         }
//         return function(...args2) {
//             return curried.apply(this, args2.concat(args))
//         }
        
//     }
// }

// function sum(a, b, c) {
//     return a + b + c;
// }

// const curried_sum = curry(sum);
// const res4 = curried_sum(1, 2, 3);
// const res4s = curried_sum(1)(2)(3);
// console.log('1+2+3', res4, res4s);

// 函数柯里化 2.0
// function curry2(func, args) {
//     args = args || [];
//     return function() {
//         const remainArgs = Array.prototype.slice.call(arguments);
//         // console.log(remainArgs)
//         const newArgs = args.concat(remainArgs);
//         // console.log(newArgs)
//         if (newArgs.length < func.length) {
//             return curry2.call(this, func, newArgs);
//         }
//         return func.apply(this, newArgs)
//     }
// }

// var curried_sm2 = curry2(sum);
// var r4 = curried_sm2(1, 2, 3);
// console.log('1+2+3', r4);
// var r5 = curried_sm2(1)(2)(3);
// console.log('1+2+3', r5);

// 函数柯里化 3.0
// function curry3(fn, ...args) {
//     return (...args2) => {
//         return fn(...args, ...args2);
//     }
// }

// var curried_sm3 = curry3(sum);
// var r6 = curried_sm3(1, 2, 3);
// console.log('1+2+3', r6);
// var r66 = curried_sm2(1)(2)(3);
// console.log('1+2+3', r66);


// 函数柯里化 面试版
// function curry_sum() {
//     const args = Array.prototype.slice.call(arguments);
//     const fn = function() {
//         const remainArgs = Array.prototype.slice.call(arguments);
//         return curry_sum.apply(this, [...args, ...remainArgs]);
//     }
//     // console.log(args)
//     fn.toString = function() {
//         return args.reduce((a, b) => a + b, 0)
//     }
//     return fn;
// }

// console.log(curry_sum(1)(2)(3))
// console.log(+curry_sum(1)(2)(3))
// console.log(curry_sum(1)(2)(3).toString())
// console.log(curry_sum(1)(2)(3) == 6)


// function foo({x, y = 5} = {}) {
//     console.log(x, y);
// }
// foo();


// toString 隐式转换
// function t1() {
//     return 10;
// }
// console.log(t1 + 10)

// t1.toString = function() {
//     return 20;
// }
// console.log(t1 + 10)

// // 执行顺序比toString靠后
// t1.valueOf = function() {
//     return 5;
// }

// console.log(t1 + 10)


// 复合函数 compose
// const add1 = x => x + 1;
// const mult3 = x => x * 3;
// const div2 = x => x / 2;

// const compose = (...fns) => {
//     // console.log(fns)
//     return fns.reduceRight((acc, fn) => {
//         // console.log(acc);
//         // console.log(fn);
//         return (...args) => {
//             // console.log(args)
//             return fn(acc(...args));
//         }
//     })
// }

// const opt = compose(div2, mult3, add1, add1);
// console.log(opt(3));


// const f1 = () => 7;
// console.log(f1());

// const a11 = [1]
// console.log(a11)
// a11.push(2)
// console.log(a11)
// a11.length = 0;
// console.log(a11)




// var obj1 = {
//     desc: {
//         age: 22,
//     },
//     "name": '1',
// }

// var obj2 = {
//     desc: {
//         age: 22,
//     },
// }

// Object.defineProperty(obj2, 'name', {
//     value: '1',
//     enumerable: true
// })

// console.log(obj2, obj2.name)

// console.log(Object.keys(obj2))

// function isEqualObject(obj1, obj2) {
//     if (!obj1 instanceof Object || !obj2 instanceof Object) {
//         throw new Error('need object type');
//     }
//     const obj1ToArray = Object.entries(obj1);
//     const obj2ToArray = Object.entries(obj2);
//     if (obj1ToArray.length !== obj2ToArray.length) return false;
//     for (let i = 0, len = obj1ToArray.length; i < len; i++) {
//         // console.log(obj1ToArray[i], i)
//         // console.log(obj1ToArray[i][0])
//         // 处理属性为对象的情形
//         if (obj1ToArray[i][0] === obj2ToArray[i][0] && obj1ToArray[i][1] instanceof Object) {
//             return isEqualObject(obj1[obj1ToArray[i][0]], obj2[obj2ToArray[i][0]])
//         }
//         if ((obj1ToArray[i][0] !== obj2ToArray[i][0]) || (obj1ToArray[i][1] !== obj2ToArray[i][1])) {
//             // console.log(obj1ToArray[i], obj2ToArray[i])
//             return false;
//         }
//     }
//     // for (let [key, value] of Object.entries(obj1)) {
//     //     console.log(key, obj1[key], obj2[key]);
//     //     if (obj2[key] && obj1[key] instanceof Object) {
//     //         return isEqualObject(obj1[key], obj2[key]);
//     //     }
//     //     if (obj2[key] !== obj1[key]) {
//     //         return false;
//     //     }
//     // }
//     return true;
// }

// console.log(isEqualObject(obj1, obj2));



// ;(function() {
//     console.log(1)
// })();

// ;(function() {
//     console.log(2)
// }());


// function setName(obj) {
//     obj.name = '1';
//     obj = new Object();
//     obj.name = '2';
// }
// var user = new Object();
// setName(user);
// console.log(user.name);


// function test() {
//     console.log(...arguments);
//     console.log(arguments instanceof Object);
//     console.log(Array.isArray(arguments))
//     console.log(Object.prototype.toString.call(arguments))
// }

// console.log(typeof (() => {}))

// console.log(typeof null)
// console.log(typeof undefined)
// console.log(typeof NaN)
// console.log(typeof Infinity)
// console.log(typeof (Symbol()))
// console.log(typeof true)

// console.log(Object.prototype.toString.call({}))
// console.log(Object.prototype.toString.call([]))
// console.log(Object.prototype.toString.call(new Date()))
// console.log(Object.prototype.toString.call(new RegExp()))
// console.log(Object.prototype.toString.call(new Error()))

// test(1,'2a',[1,2],{})


// function Book() {
//     this.name = '1';
//     return {
//         name : '2'
//     }
// }

// var b1 = new Book();
// console.log(b1);
// console.log(b1.constructor)

// var a = 1;
// function fn(c) {
//     // a = 4
//   console.log(a)
//   b = 5
// }
// a = 2
// fn(a)



// var obj0 = { foo: "bar", baz: 42 };
// for (let key in obj0) {
//     console.log(key)
// }
// var map0 = new Map(Object.entries(obj0));
// console.log(map0);
// for (let [key, value] of map0) {
//     console.log(`${key} => ${value}`)
// }


// function f1(n, total) {
//     if (n === 1) return total;
//     return f1(n - 1, n * total);
// }

// function f2(n) {
//     return f1(n, 1);
// }
// console.log(f2(1), f2(2), f2(3), f2(4), f2(5))


// var obj3 = {
//     a: 1
// }

// var obj33 = {
//     a: 0,
//     b: 2
// }

// console.log(Object.assign(obj3, null) === obj3)
// console.log(Object.assign(obj3, obj33))


// console.log(Object.assign([1,2,3], [4,5]))


// var pro = {}
// var objj = Object.create(pro);
// console.log(Object.getPrototypeOf(objj) === pro)

// function clone(origin) {
//     const originProto = Object.getPrototypeOf(origin);
//     return Object.assign(Object.create(originProto), origin);
// }


// var o1 = {
//     a: 1,
// }

// var o2 = clone(o1);

// console.log(o2, o2.__proto__)
// console.log(o1.__proto__ === o2.__proto__);
// console.log(o1 === o2);
// console.log(Object.getOwnPropertyDescriptor(o1, 'a'))


// class Parent {
//     constructor(name) {
//         this.name = name;
//     }
// }

// Parent.prototype.weight = 50;

// var child = new Parent('lili');

// console.log(child.name);
// console.log(child.__proto__, Parent.prototype)

// // o1 = Object.create(o)
// Object.defineProperty(child, 'height', {
//     value: 170,
//     enumerable: false
// })
// console.log(Object.keys(child))
// console.log(Object.getOwnPropertyNames(child))
// console.log(Object.getOwnPropertySymbols(child))
// console.log(Reflect.ownKeys(child))


// console.log(Object.values({}))
// console.log(Object.values({a:1}))
// console.log(Object.values([]))
// console.log(Object.values([1,2]))
// console.log(Object.values('aaa'))
// console.log(Object.values(11))
// console.log(Object.values(true))


// console.log({...null, ...undefined})
// console.log({...{}})


// var set = new Set([1,2,3]);
// set = [...set].map(v => v * 2);
// console.log(set)


// const queuedObservers = new Set();

// const observe = fn => queuedObservers.add(fn);
// const observable = obj => new Proxy(obj, {set});

// function set(target, key, value, receiver) {
//     const result = Reflect.set(target, key, value, receiver);
//     queuedObservers.forEach(observer => observer());
//     return result;
// }

// const person = observable({
//     name: '张三',
//     age: 20
// });

// function print() {
//     console.log(`${person.name}, ${person.age}`)
// }

// observe(print);
// person.name = '李四';
// person.name = '李四1';


// var ar1 = [1, 2, 3];
// for (let [key, value] of ar1.entries()) {
//     console.log(key, value);
// }


// var m2 = new Map(ar1.entries());
// console.log(m2)
// var m2 = new Map();
// m2.set('a', 1)
// for (let [key, value] of m2) {
//     console.log(key, value);
// }


// function* gen() {
//     yield 1;
//     return 2;
//   }
  
//   let g = gen();
  
//   console.log(
//     g.next().value,
//     g.next().value,
//     g.next().value,
// );


var clock = function* () {
    while (true) {
      console.log('Tick!');
      yield;
      console.log('Tock!');
      yield;
    }
  };

  clock();