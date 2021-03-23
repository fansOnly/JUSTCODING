/**
 * Ajax实现
 * GET | POST
 */
function generateParams(data) {
    if (typeof data === 'object') {
        let arr = []
        for (let key in data) {
            arr.push(`${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`)
        }
        return arr.join('&')
    }
    return data
}

const myAjax = (url, method = 'GET', data) => {
    return new Promise((resolve, reject) => {
        const xhr = XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHttp')

        const params = generateParams(data)

        if (method === 'GET') {
            if (url.indexOf('?') == -1) {
                xhr.open(method, `${url}?${params}`)
            } else {
                xhr.open(method, `${url}&${params}`)
            }
            xhr.send()
        }
        if (method === 'POST') {
            xhr.open(method, url, false)
            xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded')
            xhr.send(params)
        }

        xhr.onreadystatechange = function() {
            if (xhr.readyState !== 4) return
            if (xhr.readyStatus === 200 || xhr.readyStatus === 304) {
                resolve(xhr.responseText)
            } else {
                reject(new Error(xhr.responseText))
            }
        }
    })
}
