// ************************************************************************************************************************
// a == 1 && a == 2 && a == 3
/**
 * 1 通过隐式转换
 */
const a = {
    i: 1,
    toString: function () {
        return a.i++;
    },
}
console.log(a == 1 && a == 2 && a == 3) // true

/**
 * 2 通过劫持对象的 getter
 */
var obj = {}
var val = 0;
// 可以将 b 直接挂在全局 window 上
Object.defineProperty(obj, 'b', {
    get: function () {
        return ++val
    }
})
console.log(obj.b == 1 && obj.b == 2 && obj.b == 3) // true


/**
 * 3 通过代理拦截
 */
var a = new Proxy({}, {
    i: 1,
    get() {
        return () => this.i++
    }
})
console.log(a == 1 && a == 2 && a == 3) // true


/**
 * 4 通过重写数组的 join() 方法
 * 数组的 tostring() 默认调用数组的 join() 方法
 */
var arr = [1, 2, 3]
arr.join = arr.shift

console.log(arr) // [ 1, 2, 3, join: [λ: shift] ]
console.log(arr == 1 && arr == 2 && arr == 3) // true


// ************************************************************************************************************************
/**
 * 解析url参数
 * @param {*} url 
 */
const parseUrlParams = url => {
    const params = url.split('?')[1];
    var reg = /([^?&=]+)(=*)([^?&=]*)/g;
    let res = {};
    params.replace(reg, function(match, prop, sym, val) {
        // console.log(match)
        // console.log(prop)
        // console.log(val)
        if (val == "") {
            val = true;
        } else if (val == '""') {
            val = "";
        } else if (/^\{.+\}$/.test(val)) {
            val = JSON.parse(val);
        } else if (/^\[.+\]$/.test(val)) {
            val = JSON.parse(val);
        }
        if (res[prop]) {
            res[prop] += ',' + val;
        } else {
            res[prop] = val;
        }
    })
    return res;
}

const url = 'http://www.baidu.com/search?name=1&age=10&age=20&male&hobby={"x":1}&z=&x=""&ss=[1,2,3]';
console.log(parseUrlParams(url))



// ************************************************************************************************************************
/**
 * 查找两位数之和
 */
var nums = [2, 9, 17, 11, 7, 2, 10]
var target = 9;

const test = (arr, target) => {
    let i = 0;
    while(i < arr.length) {
        const a = arr[i];
        const b = arr.indexOf(target - a);
        if (b != -1) {
            return [i, b];
        }
        i++;
    }
    return [-1, -1];
}

console.log(test(nums, target))
