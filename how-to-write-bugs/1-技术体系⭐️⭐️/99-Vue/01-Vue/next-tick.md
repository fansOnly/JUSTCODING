#### Vue 中 next-tick 的实现

+ 1. 首先检查是否支持 Promise，则用 Promise - microTask

```js
const p = Promise.resolve()
p.then(callback)
```

+ 2. 其次检查是否支持

>> 针对2.5之前版本，使用 MessageChannel - 微任务
>> 针对2.5及之后版本，使用 MutationObserver - 宏任务

```js
const observer = new MutationObserver(callback)
const textNode = document.createTextNode()
observer.observe(textNode, {
    characterData: true
})
```

+ 其次检查是否支持 setImmediate - macroTask

```js
setImmediate(callback)
```

+ 以上都不支持，最后使用 setTimeout - macroTask

```js
setTimeout(callback, 0)
```
