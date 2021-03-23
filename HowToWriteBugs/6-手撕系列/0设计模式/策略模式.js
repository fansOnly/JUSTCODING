/**
 * 策略模式
 * 定义一系列的算法，将算大的实现和使用分离开
 * ex. 银行利息随着客户存款的增加递增
 */
class Bank {
    constructor (name) {
        this.name = name
    }
    save(money) {
        this.money = money
        if (money <= 5000) {
            this.interest = '0.5%'
        } else if (money > 5000 && money <= 2000) {
            this.interest = '1%'
        } else if (money > 20000 && money < 100000) {
            this.interest = '2%'
        } else {
            this.interest = '3%'
        }
    }
    print() {
        return `${this.name} 存了 ${this.money} 元，利息是 ${this.interest}。`
    }
}

const user = new Bank('小明')

user.save(50000)
console.log(user.print())
