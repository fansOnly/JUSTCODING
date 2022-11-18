/**
 * 单例模式
 * 一个类仅有一个实例，并提供一个访问它的全局访问点
 * ex. 数据库连接
 */
class Db {
    constructor() {
        this.connections = []
    }
    static getInstance() {
        if (!this.instance) this.instance = new Db()
        return this.instance
    }
    connect(name, pass) {
        this.connections.push({name, pass})
    }
    status() {
        return this.connections
    }
}

const u1 = Db.getInstance()
const u2 = Db.getInstance()

console.log(u1 === u2) // true

u1.connect('test', '111111')
u2.connect('admin', '123456')

const status = u1.status()

status.map(v => {
    console.log(v)
})
