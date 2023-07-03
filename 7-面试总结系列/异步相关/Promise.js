/**
 * 1 - 3 - 5 - 6 - 4 - 2
 */
Promise.resolve().then(() => {
  console.log(1)
  return Promise.resolve(2)
}).then(res => {
  console.log(res)
})

Promise.resolve().then(() => {
  console.log(3)
  return 4
}).then(res => {
  console.log(res)
})

new Promise(resolev => {
  console.log(5)
  resolev(6)
}).then(res => {
  console.log(res)
})



/**
 * new Promise(resolve => resolve(p))
 * 推迟原因：浏览器会创建一个 PromiseResolveThenableJob 去处理这个 Promise 实例，这是一个微任务。
 * 等到下次循环到来这个微任务会执行，也就是PromiseResolveThenableJob 执行中的时候，因为这个Promise 实例是fulfilled状态，所以又会注册一个它的.then()回调
 * 又等一次循环到这个Promise 实例它的.then()回调执行后，才会注册下面的这个.then(),于是就被推迟了两个时序
 * begin - 1 - 2 - 3 - then - 4
 */
 var v = new Promise(resolve => {
  console.log("begin");
  resolve("then");
});

new Promise(resolve => {
  resolve(v);
}).then((v) => {
  console.log(v)
})

new Promise(resolve => {
  console.log(1);
  resolve();
})
  .then(() => {
    console.log(2);
  })
  .then(() => {
    console.log(3);
  })
  .then(() => {
    console.log(4);
  })

/**
 * Promise.resolve(p)
 * begin - 1 - then - 2 - 3 - 4
 */
var v = new Promise(resolve => {
  console.log("begin");
  resolve("then");
});

Promise.resolve(v).then(res => {
  console.log(res)
})

new Promise(resolve => {
  console.log(1);
  resolve();
})
  .then(() => {
    console.log(2);
  })
  .then(() => {
    console.log(3);
  })
  .then(() => {
    console.log(4);
  })
