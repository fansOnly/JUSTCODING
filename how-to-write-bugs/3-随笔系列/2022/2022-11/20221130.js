const getParamFromUrl = (url) => {
    if (!url) return {}
    const queryString = url.split('?')[1]
    if (!queryString) return {}
    const reg = /([^?=&]+)(=*[^&=]*)/g
    const matches = queryString.match(reg)
    console.log('matches: ', matches)
    return matches.reduce((acc, cur) => {
        const [key, val = ''] = cur.split('=')
        acc[key] = val
        return acc
    }, {})
}


getParamFromUrl('https://www.baidu.com?a=')
