/**
 * 设计模式之适配器模式
 * 场景：充电器转接头
 */
class Charge {
    constructor(ampare) {
        this.ampare = ampare
    }
    start() {
        if (this.ampare === '3A') {
            console.log('start charging.')
        } else {
            console.log(`can't charge with ${this.ampare}.`)
        }
    }
}

class Adapter {
    constructor(ampare) {
        if (ampare !== '3A') {
            this.ampare = '3A'
        }
    }
    start() {
        console.log(`${this.ampare} is now start charging with adapter by transfored to 3A.`)
    }
}

const charger = new Charge('3A')
charger.start()

const newCharger = new Adapter('5A')
newCharger.start()
