// ************************************************************************************************************************
// 实现一个Person类，类里有eat、work、sleep三个方法，支持如下调用方式eat().work(10).sleep(5)

// 打印结果为
// eat()
// eat()->work(10) //等待10后打印
// eat()->work(10)->sleep(5) //等待5秒后打印


class Person {
    constructor() {
        this.queue = [];
        this.delay = 1000;
    }
    run = async() => {
        return await new Promise(resolve => {
            setTimeout(() => {
                resolve();
            }, this.delay)
        })
    }
    eat = food => {}
    work = delay => {}
    sleep = delay => {}
}


const p = new Person();
// p.eat('apple').work(3).sleep(5);



const reverse = str => {
    const strs = str.split('');
    let temp = '';
    for (let i = strs.length - 1; i >= 0; i--) {
        temp += strs[i];
    }
    return temp;
}

console.log(reverse('www.snowe.com'))