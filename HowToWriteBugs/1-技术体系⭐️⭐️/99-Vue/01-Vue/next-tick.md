#### Vue 中 next-tick 的实现

+ 首先检查是否支持 Promise，则用 Promise - microTask

```js
const p = Promise.resolve()
p.then(callback)
```

+ 其次检查是否支持 MutationObserver - microTask

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
