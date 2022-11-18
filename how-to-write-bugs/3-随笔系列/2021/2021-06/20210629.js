/**
 * @description: 对一维 json 数组进行归档（根据 key）
 * @param {Array} arr:一维数组
 * @param {String} key：key 字符串
 */
const archive = (arr, key) => {
  return Array.from(new Set(arr.map(v => v[key]))).reduce((acc, cur) => {
    acc.push(arr.filter(v => v[key] == cur))
    return acc
  }, [])
}

let books = [{ date: '1月', name: '地理书' }, { date: '1月', name: '历史书' }, { date: '2月', name: '化学书' }]
console.log(archive(books, 'date'))



/**
 * @description: 一维数组转二维数组 (分组)
 * @param {Array} arr:数组
 * @param {Number} num: 平分基数（num 个为一组进行分组（归档））
 */
const group = (arr, num) => {
  return arr.reduce((acc, cur, index) => {
    if (index == acc.length * num) {
      acc.push(arr.slice(index, index + num))
    }
    return acc
  }, [])
}

const group2 = function (arr, num) {
  console.log([...Array(Math.ceil(arr.length / num)).keys()])
  return [...Array(Math.ceil(arr.length / num)).keys()].reduce((p, _, i) => (p.push(arr.slice(i * num, (i + 1) * num)), p), [])
}

console.log(group([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 2))
console.log(group([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 3))






async function async1() {
  console.log("a");
  const res = await async2();
  console.log("b");
}

async function async2() {
  console.log("c");
  return 2;
}

console.log("d");

setTimeout(() => {
  console.log("e");
}, 0);

async1().then(res => {
  console.log("f")
})

new Promise((resolve) => {
  console.log("g");
  resolve();
}).then(() => {
  console.log("h");
});

console.log("i");



/**
 * bind
 * 1 绑定原型方法
 * 2 改变 this 指向
 * 3 考虑柯里化
 * 4 考虑构造函数
 * 5 保留构造函数的原型
 */
Function.prototype._bind = function (thisArg) {
  const self = this
  const args = [...arguments].slice(1)
  var fbound = function () {
    const allArgs = [...args, ...arguments]
    if (new.target !== undefined) {
      const result = self.apply(this, allArgs)
      return result instanceof 'object' ? result : this
    } else {
      return self.apply(thisArg, allArgs)
    }
  }
  if (self.prototype) {
    fbound.prototype = Object.create(self.prototype)
    fbound.prototype.constructor = self
  }
  return fbound
}



/**
 * Promise 题
 * 1 reject 捕获上一个 Promise 执行的结果
 * 2 catch 会捕获前面整条 Promise 链路上的错误
 * 3
 */

Promise.resolve()
  .then(function success(res) {
    throw new Error('error')
  }, function fail1(e) {
    console.error('fail1: ', e)
  })
  .catch(function fail2(e) {
    console.error('fail2: ', e) // output
  })

Promise.resolve()
  .then(function success1(res) {
    throw new Error('error')
  }, function fail1(e) {
    console.error('fail1: ', e)
  })
  .then(function success2(res) {
  }, function fail2(e) {
    console.error('fail2: ', e) // output
  })


process.nextTick(() => {
  console.log('nextTick')
})
Promise.resolve()
  .then(() => {
    console.log('then')
  })
setImmediate(() => {
  console.log('setImmediate')
})
console.log('end')



const p1 = Promise.resolve(1)
const p2 = Promise.reject(2)

const p5 = Promise.all([p2, p1])

p5.then(res => {
  console.log(res)
}).catch(err => {
  console.log(err) // 2
})
