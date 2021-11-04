const { SyncHook, SyncBailHook, AsyncParallelHook, AsyncSeriesHook } = require('tapable')


class Work {
    constructor() {
        /**
         * 初始化 hooks 容器
         */
        this.hooks = {
            /**
             * 同步钩子
             * 注册的事件顺序执行
             */
            // go: new SyncHook(['address']),
            /**
             * 同步钩子
             * 如果遇到返回值就会退出
             */
            go: SyncBailHook(['address']),
            /**
             * 异步钩子 - 异步并行
             */
            // home: new AsyncParallelHook(['name', 'age']),
            /**
             * 异步钩子，异步串行
             */
            home: new AsyncSeriesHook(['name', 'age']),
        }
    }
    tap() {
        // 注册事件
        // 同步钩子
        this.hooks.go.tap('etong', address => {
            console.log('etong', address)
            return 1
        })
        this.hooks.go.tap('eteng', address => {
            console.log('eteng', address)
        })

        /**
         * 异步钩子
         */
        this.hooks.home.tapAsync('nangang', (name, age, cb) => {
            setTimeout(() => {
                console.log('nangang', name, age)
                cb()
            }, 2000);
        })

        this.hooks.home.tapPromise('shushan', (name, age) => {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    console.log('shushan', name, age)
                    resolve()
                }, 1000);
            })
        })
    }
    start() {
        // 触发事件
        this.hooks.go.call('g4cf6')
        this.hooks.home.callAsync('jack', 20, () => {
            console.log('end...')
        })
    }
}


const work =  new Work()
work.tap()
work.start()
