/**
 * 期望id按顺序打印 0 1 2 3 4 ，且只能修改 start 函数。
 * id 的打印是个异步事件，在 setTimeout 回调执行，
 * 按照上面的代码，谁的倒计时先结束，id就先打印，
 * 那么想要id按顺序打印，就需要将多个异步事件同步执行，promise 的链式调用可以派上用场
 */

function start(id) {
    // 1
    this.promise = this.promise ? this.promise.then(() => execute(id)) : execute(id)
    // 2
    // this.list = this.list ? this.list : []
    // this.list.push(() => execute(id))
    // this.t;
    // if (this.t) clearTimeout(this.t)
    // this.t = setTimeout(() => {
    //     this.list.reduce((re, fn) => re.then(() => fn()), Promise.resolve())
    // })
}
for (let i = 0; i < 5; i++) {
    start(i);
}
function sleep() {
    const duration = Math.floor(Math.random() * 500);
    return new Promise(resolve => setTimeout(resolve, duration));
}
function execute(id) {
    return sleep().then(() => {
        console.log("id", id); // 0 1 2 3 4
    });
}



