// *********************************************************************************************************
const a = {b:3}

function foo(obj) {
    console.log(a === obj) // true
    obj.b = 5
    return obj
}

var aa = foo(a)

console.log(aa.b) // 5

console.log(a.b) // 5





// *********************************************************************************************************
function Ofo() {}

function Bike() {
    this.name = 'mybike'
}

var myBike = new Ofo()

Ofo.prototype = new Bike()

console.log(Ofo) // [F: Ofo]
console.log(myBike) // Ofo {}

console.log(myBike.name) // undefined

var yourBike = new Bike()

console.log(yourBike.name) // mybike





// *********************************************************************************************************
// 实现一个fill函数

function arrayFill(arr = [], value = '', start = 0, end = arr.length) {
    if (!Array.isArray(arr)) throw new TypeError('arr need to be a Array ...')
    const { length } = arr;
    const _start = start > 0 ? Math.min(start, length) : Math.max(start + length, start);
    const _end = end > 0 ? Math.min(end, length) : Math.max(end, length + end);
    let k = _start;
    while(k < _end) {
        arr[k] = value;
        k++;
    }
    return arr
}

var arr = new Array(5)
var arr2 = new Array(5)
console.log(arr) // [ , , , ,  ]

arrayFill(arr, 3, 1, -3)
arr2.fill(3, 1, -3)
console.log(arr) // [ , 3, , ,  ]
console.log(arr2) // [ , 3, , ,  ]





// *********************************************************************************************************
// es5 实现私有变量

// 1 构造函数 - 闭包
// 特权函数是增加在每隔实例中的, 而不是在 prototype 中, 增加了资源占用
function P1(name) {
    this.name = name;
    var _age = 10;
    this.getAge = function() {
        return _age
    }
    this.setAge = function(val) {
        _age = val
    }
}

const p1 = new P1('p1')

console.log(p1._age) // undefined
console.log(p1.getAge()) // 10

p1.setAge(55)
console.log(p1.getAge()) // 55


// 2 模块模式
// 每个实例都是强引用, 不会被垃圾回收机制回收
const p2 = (function() {
    var _key = 'id' + Math.random();
    function P2(name) {
        this[_key] = name
    }
    Object.defineProperty(P2.prototype, 'name', {
        get: function() {
            return this[_key]
        },
        set: function(val) {
            this[_key] = val
        }
    })
    return P2;
})()

console.log(p2.name) // P2 undefined

p2.name = 'ss'
console.log(p2.name) // P2

// 2.1  WeakMap 改进版
const p3 = (function() {
    var _data = new WeakMap();
    function P3(name) {
        _data.set(this, {name: name})
    }
    Object.defineProperty(P3.prototype, 'name', {
        get: function() {
            return _data.get(this).name
        },
        set: function(val) {
            _data.set(this, {name: val})
        }
    })
    return P3
})()

console.log(p3.name) // P3

p3.name = 'p33'
console.log(p3.name) // P3





// *********************************************************************************************************






// *********************************************************************************************************



// *********************************************************************************************************
// 算法题：求最大公共前缀，如 ['aaafsd', 'aawwewer', 'aaddfff'] => 'aa'
const arr3 = ['aabafsd', 'aabwwewer', 'aabddfff', 'aabddfff', 'aacbddfff']

const getPrefix = arr => {
    let len = arr[0].length;
    arr.map(item => {
        if(!item) return '';
        len = Math.min(item.length, len);
    })
    let k = 0;
    while(k < len) {
        let prefix = '';
        let str = '';
        arr.map(item => {
            str = item.substr(k, 1);
            prefix += str;
        })
        if (!prefix.split('').every(v => v === str)) {
            break;
        }
        k++;
    }
    return arr[0].substr(0, k);
}

console.log(getPrefix(arr3))

const getPrefix2 = arr => {
    // let len = arr[0].length;
    let prefix = arr[0];
    arr.map(item => {
        if(!item) return '';
        prefix = item.length < prefix.length ? item : prefix;
        // len = Math.min(item.length, len);
    })
    for (let i = 0; i < arr.length; i++) {
        while(arr[i].indexOf(prefix) != 0) {
            prefix = prefix.substr(0, prefix.length - 1)
        }
    }
    return prefix
}

console.log(getPrefix2(arr3))




// *********************************************************************************************************
// 千分位格式化数字
const num1 = 1234567890

const toThousandNum = num => {
    return num.toString().replace(/\d(?=(\d{3})+$)/g, '$&,')
}

console.log(toThousandNum(num1))


