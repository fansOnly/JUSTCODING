
/**
 * Object.is
 * 解决 +0 和 -0 相等的问题
 * 解决 NaN 不等于自身的问题
 */
const ObjectIs = (x, y) => {
    if (x === y) {
        return x !== 0 || y !== 0 || 1 / x === 1 / y
    } else {
        return x !== x && y !== y
    }
}

console.log(ObjectIs(+0, -0)) // false
console.log(ObjectIs(NaN, NaN)) // true

/**
 * 简单的深拷贝
 */
const deepClone = (target, hash = new WeakMap()) => {
    if (typeof target !== 'object' || target === null) {
        return target
    }
    if (hash.has(target)) {
        return hash.get(target)
    }

    const cloneTarget = Array.isArray(target) ? [] : {}
    hash.set(target, cloneTarget)

    // 遍历Symbol类型的键
    const symbolKeys = Object.getOwnPropertySymbols(target)
    if (symbolKeys.length) {
        symbolKeys.forEach(symKey => {
            cloneTarget[symKey] = typeof target === 'object' && target[symKey] !== null ? deepClone(target[symKey]) : target[symKey]
        })
    }

    // 遍历其他类型的键
    for (const key in target) {
        if (Object.prototype.hasOwnProperty.call(target, i)) {
            cloneTarget[key] = typeof target === 'object' && target[key] !== null ? deepClone(target[key], hash) : target[key]
        }
    }
    return cloneTarget
}



/**
 * JsonP 跨域
 * script标签不遵循同源协议，可以用来进行跨域请求，优点就是兼容性好但仅限于GET请求
 */
const jsonp = ({url, params, callbackName}) => {
    const generateUrl = () => {
        let dataSrc = ''
        for (let key in params) {
            if (Object.prototype.hasOwnProperty.call(params, key)) {
                dataSrc += `${key}=${params[key]}&`
            }
        }
        dataSrc += `callback=${callbackName}`
        return `${url}?${dataSrc}`
    }
    return new Promise((resolve, reject) => {
        const scriptEle = document.createElement('script')
        scriptEle.src = generateUrl()
        document.body.appendChild(scriptEle)
        window[callbackName] = data => {
            resolve(data)
            document.body.removeChild(scriptEle)
        }
    })
}


/**
 * 实现 Ajax
 */
const ajaxReq = url => {
    return new Promise((resolve, reject) => {
        const xhr = XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject('Mscrosoft.XMLHttp')
        xhr.open('GET', url, false)
        xhr.setRequestHeader('Accept', 'application/json')
        xhr.onreadystatechange = function() {
            if (xhr.readyState !== 4) return
            if (xhr.status === 200 || xhr.status === 304) {
                resolve(xhr.responseText)
            } else {
                reject(new Error(xhr.responseText))
            }
        }
        xhr.send()
    })
}


/**
 * 图片懒加载
 * 通过判断图片是否进入滚动视野加载图片
 * 设置图片datasrc属性为图片真实路径
 */
const lazyLoad = () => {
    const imgs = document.getElementsByTagName('img')
    const len = imgs.length

    const viewHeight = document.documentElement.clientHeight
    const scrollHeight = document.body.scrollHeight || document.documentElement.scrollHeight

    for (let i = 0; i < len; i++) {
        const offsetHeight = imgs[i].offsetTop
        if (offsetHeight > viewHeight + scrollHeight) {
            const src = imgs[i].dataset.src
            imgs[i].src = src
        }
    }
}

window.addEventListener('scroll', lazyLoad, false)


/**
 * 渲染几万条数据不卡住页面
 * 渲染大数据时，合理使用createDocumentFragment和requestAnimationFrame，将操作切分为一小段一小段执行
 */
const loadLongData = data => {
    data = 10000
    const once = 20 // 单次加载数量
    const loopCount = Math.ceil(data / once) // 加载次数上限
    const renderCount = 0 // 加载次数

    const ul = document.querySelector('ul')

    function add() {
        const fragment = document.createDocumentFragment()
        for (let i = 0; i < once; i++) {
            const li = document.createElement('li')
            li.innerText = ~~(Math.random() * data)
            fragment.appendChild(li)
        }
        ul.appendChild(fragment)
        renderCount++
        loopRender()
    }

    function loopRender() {
        if (renderCount < loopCount) {
            window.requestAnimationFrame(add)
        }
    }

    loopRender()
}
