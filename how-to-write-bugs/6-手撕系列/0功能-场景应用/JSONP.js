/**
 * JSONP 解决跨域
 * script 标签跨域跨域
 * 只支持 get 请求
 */
function JSONP({url, params, callbackName}) {
    const generateUrl = () => {
        let queryString = ''
        for (let key in params) {
            if (Object.prototype.hasOwnProperty.call(params, key)) {
                queryString += `${key}=${params[key]}&`
            }
        }
        queryString += `callback=${callbackName}`
        return `?${url}${queryString}`
    }
    return new Promise((resolve, reject) => {
        const scriptEle = document.createElement('script')
        scriptEle.url = generateUrl()
        document.body.appendChild(scriptEle)
        window[callbackName] = data => {
            resolve(data)
            document.body.removeChild(scriptEle)
        }
    })
}

JSONP('http://', {a: 1}, 'cb')
