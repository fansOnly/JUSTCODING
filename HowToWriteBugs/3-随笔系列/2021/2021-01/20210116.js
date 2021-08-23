var obj = {
    '2': 3,
    '3': 4,
    'length': 2,
    'splice': Array.prototype.splice,
    'push': Array.prototype.push
}

obj.push(1)
obj.push(2)

console.log(obj)


/**
 * 大小写反转   AbC => aBc
 * 0 ~ 9 (Unicode编码值范围：48~57)
 * a ~ z(Unicode编码值范围：97~122)
 * A ~ Z(Unicode编码值范围：[65~90])
 */
const convert = str => {
    const arr = str.split('')
    for (let i = 0; i < arr.length; i++) {
        if (arr[i].charCodeAt() >= 60 && arr[i].charCodeAt() <= 90) {
            arr[i] = arr[i].toLowerCase()
        } else {
            arr[i] = arr[i].toUpperCase()
        }
    }
    return arr.join('')
}
console.log(convert('AbC'))

/**
 * 变量提升
 * undefined
 * 10
 * 20
 */
// var a = 10;
// (function () {
//     console.log(a)
//     a = 5
//     console.log(window.a)
//     var a = 20;
//     console.log(a)
// })()


/**
 * 引用类型指针
 */
var a = { n: 1 };
var b = a;
a.x = a = { n: 2 };

console.log(a.x) // undefined
console.log(b.x) // { n: 2 }


/**
 * 对象属性名隐式转换 字符串/symbol
 */
// example 1
var a = {}, b = '123', c = 123;
a[b] = 'b';
a[c] = 'c';
console.log(a[b]); // c

// example 2
var a = {}, b = Symbol('123'), c = Symbol('123');
a[b] = 'b';
a[c] = 'c';
console.log(a[b]); // b

// example 3
var a = {}, b = { key: '123' }, c = { key: '456' };
a[b] = 'b';
a[c] = 'c';
console.log(a[b]); // c


/**
 * 函数传参只传值，不传引用
 */
function changeObjProperty(o) {
    o.siteUrl = "http://www.baidu.com"
    o = new Object()
    o.siteUrl = "http://www.google.com"
}
let webSite = new Object();
changeObjProperty(webSite);
console.log(webSite.siteUrl); // http://www.baidu.com


/**
 * （京东）请写出如下代码的打印结果
 */
function Foo() {
    Foo.a = function() {
        console.log(1)
    }
    this.a = function() {
        console.log(2)
    }
}
Foo.prototype.a = function() {
    console.log(3)
}
Foo.a = function() {
    console.log(4)
}
Foo.a(); // 4
var obj = new Foo(); // 调用构造函数，重写Foo.a
obj.a(); // 2
Foo.a(); // 1


/**
 * {1:222, 2:123, 5:888}，
 * 请把数据处理为如下结构：
 * [222, 123, null, null, 888, null, null, null, null, null, null, null]
 */
const process = obj => {
    return Array.from({ length: 12 }).map((v, i) => obj[i + 1] || null)
}

console.log(process({ 1: 222, 2: 123, 5: 888 }))


/**
 * 给定两个数组，写一个方法来计算它们的交集
 */
const intersection = (a, b) => {
    return (a.length > b.length ? b : a).filter(k => b.includes(k))
}

const intersection2 = (a, b) => {
    let res = []
    for (let i = 0; i < a.length; i++) {
        for (let j = 0; j < b.length; j++) {
            if (a[i] === b[j]) {
                res.push(a[i])
                break;
            }
        }
    }
    res.length = Math.min(a.length, b.length, res.length)
    return res
}

console.log(intersection([1, 2, 2, 1,], [2, 2, 2]))
console.log(intersection2([1, 2, 2, 1], [2, 2, 2]))
