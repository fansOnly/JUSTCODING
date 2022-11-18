/**
 * 解析 URL
 * 一、new URL()
 */
function parseUrl(url) {
    const urlObj = new URL(url)
    return {
        protocol: urlObj.protocol,
        username: urlObj.username,
        password: urlObj.password,
        hostname: urlObj.hostname,
        port: urlObj.port,
        pathname: urlObj.pathname,
        search: urlObj.search,
        hash: urlObj.hash,
    }
}

const url = 'https://keith:miao@www.foo.com:80/file?test=3&miao=4#heading-0'

console.log(parseUrl(url))


/**
 * 二、解析 URL 参数
 */
function parseQueryString(url) {
    const queryString = url.split('?')[1]
    const params = queryString.match(/([^?=&]+)(=*[^&]*)/g)
    return params.reduce((acc, cur) => {
        const [key, val] = cur.split('=')
        acc[key] = val || true
        return acc
    }, {})
}

const url2 = 'http://www.google.com:80/test/index?name=test&password=12345&user_type=1&new&user_type=2'

console.log(parseQueryString(url2))
