/**
 * 工厂模式之静态工厂模式
 * ex. 汽车生产组装：车标 + 颜色 组装
 */
class Factory {
    constructor(brand, color) {
        this.brand = brand
        this.color = color
    }
    carInfo() {
        return {
            brand: this.brand,
            color: this.color
        }
    }
    static makeCar(car) {
        let brand = '', color = []
        switch(car) {
            case '宝马X5':
                brand = 'BMW'
                color = ['白色', '黑色', '香槟色']
                break;
            case '奥迪A4':
                brand = 'Audi'
                color = ['白色', '黑色', '红色']
                break;
            case '奔驰S400':
                brand = 'Benz'
                color = ['白色', '黑色']
                break;
            case '保时捷911':
                brand = 'Porsche'
                color = ['白色', '黑色', '红色', '蓝色']
                break;
            default:
                break;
        }
        return new Factory(brand, color)
    }
}

const baoma = Factory.makeCar('宝马X5')
const b = baoma.carInfo()
console.log('b: ', b);


/**
 * 二、工厂方法模式
 * 父类作为抽象类，将创建对象的工作推迟到子类中
 */
class Car {
    constructor(brand, color) {
        if (new.target === Car) throw new TypeError('illegal operation.')
        this.brand = brand
        this.color = color
    }
    carInfo() {
        return {
            brand: this.brand,
            color: this.color
        }
    }
}
class CarFactory extends Car {
    constructor(brand, color) {
        super(brand, color)
    }
    makeCar(car) {
        let brand = '', color = []
        switch(car) {
            case '宝马X5':
                brand = 'BMW'
                color = ['白色', '黑色', '香槟色']
                break;
            case '奥迪A4':
                brand = 'Audi'
                color = ['白色', '黑色', '红色']
                break;
            case '奔驰S400':
                brand = 'Benz'
                color = ['白色', '黑色']
                break;
            case '保时捷911':
                brand = 'Porsche'
                color = ['白色', '黑色', '红色', '蓝色']
                break;
            default:
                break;
        }
        return new CarFactory(brand, color)
    }
}

const cfy = new CarFactory()
const aodi = cfy.makeCar('奥迪A4')
console.log(aodi.carInfo())


/**
 * 三、抽象工厂方法
 * 将子类的创建也抽象出来
 */
class Car2 {
    constructor() {
        if (new.target === Car) throw new TypeError('illegal operation.')
    }
}

class CarFactory2 extends Car2 {
    constructor() {
        super()
    }
    makeCar(car, type) {
        switch(car) {
            case '奔驰':
                return new BMWCarInfo(type)
            case '保时捷':
                return new PorscheCarInfo(type)
            default:
                break;
        }
    }
}

class CarInfo {
    constructor(type) {
        if (new.target === Car) throw new TypeError('illegal operation.')
        this.type = type
    }
}

class BMWCarInfo extends CarInfo {
    constructor(type) {
        super(type)
    }
    carInfo(model) {
        return `this is benchi - ${this.type} - ${model}`
    }
}

class PorscheCarInfo extends CarInfo {
    constructor(type) {
        super(type)
    }
    carInfo(model) {
        return `this is porsche - ${this.type} - ${model}`
    }
}

const car = new CarFactory2()
const benchi = car.makeCar('奔驰', '轿车')
console.log(benchi.carInfo('s400'))

const porsche = car.makeCar('保时捷', '跑车')
console.log(porsche.carInfo('911'))
