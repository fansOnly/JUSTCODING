// jsonp
function jsonp({url, param, callback}) {
    return new Promise((resolve, reject) => {
        var script = document.createElement('script')
        window.callback = function(data) {
            resolve(data)
            document.body.removeChild('script')
        }
        var params = {...param, callback}
        let arr =[]
        for (let key in params){
            arr.push(`${key}=${param[key]}`)
        }
        script.src = `${url}?${arr.join('&')}`
        document.body.appendChild(script)
    })
}


// 
console.log(Function.prototype.__proto__)
console.log(Object.prototype)


// 实现 sleep
function sleep(delay) {
    var start = new Date().getTime()
    while(new Date().getTime() - start < delay) {
        continue
    }
}

function test() {
    console.log(1)
    sleep(1000)
    console.log(2)
}

// test()

const toThousand = num => {
    return num.toString().replace(/\d(?=(\d{3})+$)/g, '$&,')
}

console.log(toThousand(31231313))



// Promise.finally

Promise.prototype.finally = function(callback) {
    let P = this.constructor
    return this.then(
        value => P.resolve(callback()).then(() => value),
        reason => P.resolve(callback()).then(() => {throw reason})
    )
}
