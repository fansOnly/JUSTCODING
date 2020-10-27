#### Promise.resolve() 与 new Promise(r => r(v))

#### 一、Promise.resolve(v)

+ 参数是一个 Promise 实例，Promise 会原封不动的返回这个实例

+ 参数是一个 thenable 对象，会将这个对象转换为 Promise 对象，并立即执行对象的 then 方法

```js
const thenable = {
    then(resolve, reject) {
        resolve('thenable')
    }
}
const p = Promise.resolve(thenable)
p.then(val => {
    console.log(val) // thenable
})
console.log(p) // Promise {fulfilled: 'thenable'}
```

+ 参数是一个非 thenable 对象或者不是对象，会返回一个 Promise 对象，状态为 resolved

```js
const p = Promise.resolve('hello')
p.then(val => {
    console.log(val) // hello
})
console.log(p) // Promise {fulfilled: 'hello'}
```

+ 参数为空，会返回一个 Promise 对象，状态为 resolved

> 立即 resolve 的 Prosmie，是在本轮事件循环结束时执行

---

#### 二、特殊情况：resolve 一个 promise 对象

+ new Promise(resolve => resolve(promise))

```js
let v = new Promise(resolve => {
    console.log("begin"); // 1 - begin
    resolve("then");
});
// 1.在 promise 里面 resolve 一个状态为 fulfilled 的 promise
// 2.浏览器会创建一个 PromiseResolveThenableJob 处理 Promise 实例，产生一个微任务
// 3.下个事件循环来到这个微任务，因为实例是 fulfilled 状态，会注册一个 then 回调
// 4.下个事件循环，执行完 then 回调，才会注册当前 new Promise 的 then 回调
// 5.下个事件循环，执行当前注册的 then 回调
new Promise(resolve => {
    resolve(v);
}).then((v) => {
    console.log(v) // 5 - then，执行被推迟了两个微任务的顺序
});
new Promise(resolve => {
    console.log(1); // 2 - 1
    resolve();
}).then(() => {
    console.log(2); // 3 - 2
}).then(() => {
    console.log(3); // 4 - 3
}).then(() => {
    console.log(4); // 6 - 4
});
```

+ Promise.resolve(promise)

```js
let v = new Promise(resolve => {
    console.log("begin"); // 1 - begin
    resolve("then");
});
// Promise 会原封不动的返回这个实例
Promise.resolve(v).then(v => {
    console.log(v) // 3 - then，正常顺序执行
})
new Promise(resolve => {
    console.log(1); // 2 - 1
    resolve();
}).then(() => {
    console.log(2); // 4 - 2
}).then(() => {
    console.log(3); // 5 - 3
}).then(() => {
    console.log(4); // 6- 4
});
```

---

#### 三、总结

+ resolve 的作用是将 promise 的状态变更为 fulfilled，并没有调用它

+ then 方法只有在 promise 的状态为 fulfilled 的时候才会被调用

+ promise 调用 then 的时候会将里面的回调函数推入微任务
