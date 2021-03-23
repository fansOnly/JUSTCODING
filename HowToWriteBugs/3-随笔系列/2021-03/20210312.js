/**
 * 指定小数位数
 */
const toFixed = (n, fixed) => ~~(Math.pow(10, fixed) * n) / Math.pow(10, fixed)

console.log(toFixed(25.198726354, 5))

/**
 * 求平均值
 */
const avg = (...args) => args.reduce((a, b) => a + b) / args.length

console.log(avg(1,2,3))

/**
 * 数组可以添加对象属性，但是不会计算在length内
 */
const arr = [];
arr[0] = 1;
arr['2'] = '嘿嘿';
arr['cym'] = 'cym';
console.log(arr); // [1, '嘿嘿', cym: 'cym']
console.log(arr.length); // 2


/**
 * void 会返回ubdefined，但不会改变表达式结果
 */
function test() {
    return void setTimeout(() => {
        console.log(1)
    }, 3000);
}

test()


const formatNum = num => {
    return num.toString().replace(/(?!^)(?=(\d{3})+(?!\d))/g, ',')
}

console.log(formatNum(124567.111))



var length = 4;
function callback() {
  console.log(this.length); // What is logged?
}

const object = {
  length: 5,
  method() {
    arguments[0]();
  }
};

object.method(callback, 1, 2);
