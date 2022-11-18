/**
 * 普通实现
 */
const SERVER_URL = './server'

const xhr = new XMLHttpRequest()

xhr.open('GET', SERVER_URL, true)

xhr.onreadystatechange = function() {
    if (this.readyState !== 4) return
    if (this.status == 200) {
        handle(this.response)
    } else {
        console.error(this.responseText)
    }
}

xhr.onerror = function() {
    console.log(this.responseText)
}

xhr.responseType = 'json'
xhr.setRequestHeader('Accept', 'application/json')

xhr.send(null)


/**
 * 基于 promise实现
 */
function getJSON(url) {
    const promise = new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest()
        xhr.open('get', url, true)
        xhr.onreadystatechange = function() {
            if (this.readyState !== 4) return
            if (this.status == 200) {
                resolve(this.response)
            } else {
                reject(this.responseText)
            }
        }
        xhr.onerror = function() {
            reject(this.responseText)
        }
        xhr.responseType = 'json'
        xhr.setRequestHeader('Accept', 'application/json')
        xhr.send(null)
    })
    return promise
}
