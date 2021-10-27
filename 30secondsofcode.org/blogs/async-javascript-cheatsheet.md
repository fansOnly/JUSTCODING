#### Asynchronous JavaScript Cheat Sheet

---

##### Promise basics

+ promises start in a pending state, neither fulfilled or rejected.
+ When the operation is completed, a promise will become fulfilled with a value.
+ If the operation fails, a promise will get rejected with an error.

##### Creatinf promises

+ The function passed on a ==new Promise== will execute synchronously.
+ Use ==resolve()== or ==reject()== to create promises from values.
+ ==Promise.resolve(val)== will fulfill the promise with ==val==.
+ ==Promise.reject(err)== will reject the promise with ==err==.
+ If you put a fulfilled promise into a fulfilled promise, they will collapse into one.

```javascript
// Resolving with a value, rejecting with an error
new Promise((resolve, reject) => {
    performOperation(val, err) {
        if (err) reject(err);
        else resolve(val);
    }
})
// Resolving without value, no need for reject
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))
```

##### Handling promises

+ ==Promsie.prototype.then()== accepts two optional arguments (==OnFulfilled==, ==OnRejected==).
+ ==Promsie.prototype.then()== will call ==OnFulfilled== once the promise is fufilled.
+ ==Promsie.prototype.then()== will call ==OnRejected== if the promise is rejected.
+ ==Promsie.prototype.then()== passes errors through if ==OnRejected== in undefined.
+ ==Promsie.prototype.catch()== accepts one argument (==OnRejected==).
+ ==Promsie.prototype.catch()== behaves like ==Promsie.prototype.then()== when the ==OnFullfiled== is ommited.
+ ==Promise.prototype.catch()== passes fulfilled values through.
+ ==Promise.prototype.finally()== accepts one argument (==OnFinally==).
+ ==Promise.prototype.finally()== calls ==OnFinally== with no arguments once any outcome is available.
+ ==Promise.prototype.finally()== passes through input promises.

```javascript
promisedOperation()
.then(
    val => val + 1, // Called if the promise is fulfilled
    err => {
        throw err // Called if the promise is rejected
    }
).catch(
    err => {
        console.log(val) // Called if the promise is rejected
    }
).finally(
    () => console.log('done') // Called once any outcome is available
)
```

+ All three of the above methods will not be executed at least until the next tick, even for promises that already have an outcome.

##### Combining promises

+ ==Promise.all()== turns an array promises into a promise of an array.
+ If any promise is rejected, the error will pass through.
+ ==Promise.race()== passes through the first settled promise.

```javascript
Promise.all(['p1', 'p2', 'p3'])
.then(['v1', 'v2', 'v3'] => {
    // Values always correspond to the order of promises,
    // not the order they resolved in (i.e. v1 correspond to p1)
})
Promise.race(['p1', 'p2', 'p3'])
.then(val => {
    // val will take the value of the first resovled promise
})
```

##### Async/await

+ Calling a ==async== function always results in a promise.
+ ==(async () => value)()== will resolve to value.
+ ==(async () => throw err)()== will reject with an error.
+ ==await== waits from a promise to be fufilled and returns its value.
+ ==await== can only be used in ==async== function.
+ ==await== also accepts non-promise values.
+ ==await== always waits at least until next tick before resolving, even when waiting already fufilled promises or non-promise values.

```javascript
async() => {
    try {
        const val = await fn()
        console.log(val)
    } catch(err) {
        console.log(err)
    }
}
```

> synchronously: 同步的
> ommited: 省略
> correspond: 对应
