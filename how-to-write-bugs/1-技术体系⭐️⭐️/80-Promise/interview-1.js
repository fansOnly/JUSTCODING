/**
 * 任务队列可不断的添加异步任务（异步任务都是Promise），
 * 但只能同时处理5个任务，5个一组执行完成后才能执行下一组，
 * 任务队列为空时暂停执行，当有新任务加入则自动执行。
 */
class Queue {
    constructor(limit = 5) {
        this.list = []
        this.limit = limit
        this.flag = false
        this.time = +new Date()
    }
    async sleep(time) {
        return new Promise(resolve => setTimeout(resolve, time))
    }
    async run() {
        while(this.list.length) {
            this.flag = true
            const runlist = this.list.splice(0, this.limit)
            this.time = +new Date()
            await this.runItem(runlist)
            await this.sleep(300)
        }
        this.flag = false
    }
    async runItem(list) {
        return new Promise(resolve => {
            while(list.length) {
                const fn = list.shift()

                fn.then(res => {
                    console.log(res) // 1,2,3,4,5   // 6,7
                }).finally(() => {
                    if (list.length === 0) {
                        resolve()
                    }
                })
            }
        })
    }
    push(task) {
        this.list.push(...task)
        !this.flag && this.run()
    }
}


const p1 = Promise.resolve(1)
const p2 = Promise.resolve(2)
const p3 = Promise.resolve(3)
const p4 = Promise.resolve(4)
const p5 = Promise.resolve(5)
const p6 = Promise.resolve(6)
const p7 = Promise.resolve(7)

const pqueue = new Queue()
pqueue.push([p1,p2,p3,p4,p5,p6])
pqueue.push([p7])
