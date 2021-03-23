/**
 * 代理模式
 * 通过中间代理实现某些逻辑
 * ex. 菜鸟驿站
 */
class CainiaoStation {
    constructor() {
        this.packages = new Map()
    }
    entry(name, no) {
        const handler = this.packages.get(name)
        if (!handler) {
            this.packages.set(name, no)
        } else if (handler && !Array.isArray(handler)) {
            this.packages.set(name, [handler, no])
        } else {
            handler.push(no)
        }
    }
    out(name, no) {
        const handler = this.packages.get(name)
        if (!handler) return
        if (Array.isArray(handler)) {
            const index = handler.indexOf(no)
            handler.splice(index, 1)
        } else {
            this.packages.delete(name)
        }
    }
}

const station = new CainiaoStation()

class Buyer {
    constructor(name) {
        this.name = name
    }
    buy(no, callback) {
        station.entry(this.name, no)
        callback && callback()
    }
    getPackage(no, callback) {
        station.out(this.name, no)
        callback && callback()
    }
}

const Lily = new Buyer('Lily')

Lily.buy('001', () => console.log('Lily买了编号001的商品'))
Lily.buy('002', () => console.log('Lily买了编号002的商品'))
Lily.buy('003', () => console.log('Lily买了编号003的商品'))


Lily.getPackage('001', () => console.log('Lily取出了编号001的商品'))
Lily.getPackage('003', () => console.log('Lily取出了编号003的商品'))
