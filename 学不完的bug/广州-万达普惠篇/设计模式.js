// ==========================================================================================
// ======================================== 设计模式 =========================================
// ==========================================================================================


// 1 单一职责原则 - 一个类应该只有一个引起它变化的原因
// 2 开放封闭原则 - 实体类(类/模块/函数等)是可以扩展的, 但是不能修改


// ======================================== 单例模式 ========================================

// 1 一个类只能构造出唯一实例, 实现共享/唯一
// a Redux/Vuex 中的 store
// b Jquery 中的 $
// c 业务场景中的购物车和登录框

class SingleLogin {
    constructor(name, password) {
        this.name = name;
        this.password = password;
    }
    static getInstance(name, password) {
        if (!this.instance) this.instance = new SingleLogin(name, password)
        return this.instance
    }
}


let obj1 = SingleLogin.getInstance('u1', '123')
let obj2 = SingleLogin.getInstance('u2', '321')

console.log(obj1 === obj2)
console.log(obj1)
console.log(obj2)


// ======================================== 工厂模式 ========================================

// 1 对创建对象逻辑的封装, 或者理解为对 new 的封装, 使用时不用再 new
// a $()
// b React.createElement()
// c Vue.component()

// 2 简单工厂模式
// a 优点: 实现对象创建和对象使用的分离
// b 缺点: 工厂类不够灵活, 新增时需要修改工厂类的代码

class User {
    constructor(name, auth) {
        this.name = name;
        this.auth = auth;
    }
}

class UserFactory {
    static createUser(name, auth) {
        console.log(name, auth)
        if (auth == 'admin') new User(name, 1);
        if (auth == 'user') new User(name, 2);
    }
}

let admin = UserFactory.createUser('admin')
let user = UserFactory.createUser('user')

console.log(admin)
console.log(user)

// 3 工厂方法模式
// a 定义一个核心工厂类, 专门用来定义工厂类的接口
// b 定义一个或多个工厂子类, 用来创建子类实例
// c 优点: 扩展性好, 新增时无需修改核心工厂类, 只需要新增一个新的工厂子类去创建

// demo ???
class Man {
    constructor(name) {
        this.name = name;
    }
    say() {
        return `this is a man, my name is ${this.name}`
    }
}

class Woman {
    constructor(name) {
        this.name = name;
    }
    say() {
        return `this is a woman, my name is ${this.name}`
    }
}

const persons = {
    'male': Man,
    'female': Woman,
}

class People {
    constructor(name, gender) {
        this.name = name;
        this.gender = gender;
        const Person = persons[gender];
        this.fn = new Person(this.name);
    }
}

const man = new People('lisi', 'male');
console.log(man)
console.log(man.fn.say())

const woman = new People('xiaohong', 'female');
console.log(woman)
console.log(woman.fn.say())

// 4 抽象工厂模式


// ======================================== 观察者模式 ========================================

// 1 观察者监听被观察者的变化, 被观察者发生变化时, 通知所有的观察者
// a Redux 的 subscribe
// b Vue 的双向绑定

// ps 区别于发布-订阅模式: 后者多了一个调度中心

class Observer {
    constructor(fn) {
        this.update = fn
    }
}

class Subject {
    constructor() {
        this.observers = []
    }
    addOberserver(observer) {
        this.observers.push(observer)
    }
    notify() {
        this.observers.forEach(observer => {
            observer.update();
        })
    }
}

const subject = new Subject()

const update = () => {
    console.log('通知...')
}

const ob1 = new Observer(update)
const ob2 = new Observer(update)

subject.addOberserver(ob1)
subject.addOberserver(ob2)
subject.notify();


// ======================================== 装饰器模式 ========================================

// 1 对类的包装, 动态的扩展类的功能
// a ES7 装饰器语法
// b React 高阶组件 HoC
// c react-redux connect() 语法

// es7
// function info(target) {
//     target.prototype.name = 'lili'
//     target.prototype.age = 15
// }

// @info
// class Man {}

// const m1 = new Man();
// console.log(m1.name)



// ======================================== 适配器模式 ========================================

// 1 将一个接口转化成客户希望的接口, 是接口不兼容的那些类可以一起工作
// ps usb 转接器, 电源适配器

class Old {
    test() {
        return 'old'
    }
}

class Target {
    constructor() {
        this.update = new Old()
    }
    test() {
        let old = this.update.test()
        return `适配 ${old}`
    }
}

const tar = new Target();
console.log(tar.test())


// ======================================== 代理模式 ========================================

// 1 为一个对象找一个替代对象, 以便对原对象进行访问
// 2 在访问者和目标对象之间添加一层代理, 通过代理做授权和控制
// 3 事件代理, Jquery 的 $.proxy, ES6的 Proxy
// ps 明星经纪人,

const obj3 = {
    name: 'obj3',
    age: 30
}

const proxy3 = new Proxy(obj3, {
    get: function(target, prop) {
        if (prop === 'name') {
            return 'proxy3'
        }
        return target[prop]
    },
    set: function(target, prop, value) {
        if (prop === 'age'){
            if (value > 30) {
                console.log('too old...')
                return
            }
            target[prop] = value
        }
    }
})

console.log(proxy3 === obj3)

console.log(proxy3)
console.log(proxy3.name)
console.log(proxy3.age)

// 设置属性被拦截, 操作失败
proxy3.age = 50;
console.log(proxy3.age)

proxy3.age = 20;
console.log(proxy3.age)

console.log(proxy3)
console.log(proxy3)