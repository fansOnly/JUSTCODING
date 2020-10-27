#### 调度中心 Dep

+ 为每一个响应属性绑定一个 dep 实例，里面包含多个观察者 watcher 对象
+ 同一时间内只能有一个 watcher 实例

---

##### 一、属性

+ 监视器目标对象
+ Dep 的 id 编号
+ 订阅者列表

##### 二、方法

+ addSub：添加观察者
+ removeSub：移除观察者
+ depend：添加目标依赖
+ notify：通知观察者列表中的观察者并执行各自的 update 方法

```js
let uid = 0

class Dep {
    static target: ?Watcher;
    id: number;
    subs: Array<Watcher>;

    constructor() {
        this.id = uid++
        this.subs = []
    }

    addSub(sub: Watcher) {
        this.subs.push(sub)
    }

    removeSub(sub: Watcher) {
        remove(this.subs, sub)
    }

    depend() {
        if (Dep.target) {
            Dep.target.addDep(this)
        }
    }

    notify() {
        const subs = this.subs.slice()
        if (process.env.NODE_ENV === 'production' && !config.async) {
            subs.sort((a, b) => a.id - b.id)
        }
        for (let i = 0, len = subs.length; i < len; i++) {
            subs[i].update()
        }
    }
}

// 同一时间内只能有一个 watcher 实例
Dep.target = null
let targetStack = []

function pushTarget(target: ?Watcher) {
    targetStack.push(target)
    Dep.target = target
}

function popStack() {
    targetStack.pop()
    Dep.target = targetStack[targetStack.length - 1]
}

function remove(arr: Array<any>, item: <any>): Array<any> | void {
    if (arr.length) {
        const index = arr.indexOf(item)
        if (index > -1) {
            return arr.splice(index, 1)
        }
    }
}
```
