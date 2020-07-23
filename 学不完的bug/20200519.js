// ************************************************************************************************************************
// a == 1 && a == 2 && a == 3
// 通过隐式转换
const a = {
    i: 1,
    toString: function () {
        return a.i++;
    },
    //   valueOf: function () {
    //     return a.i++;
    //   }
}

console.log(a == 1 && a == 2 && a == 3)



// 通过劫持对象的 getter
var obj = {}
var val = 0;

Object.defineProperty(obj, 'b', {
    get: function () {
        return ++val
    }
})

console.log(obj.b == 1 && obj.b == 2 && obj.b == 3)


// ************************************************************************************************************************
// 解析url参数

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
// 查找两位数之和
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