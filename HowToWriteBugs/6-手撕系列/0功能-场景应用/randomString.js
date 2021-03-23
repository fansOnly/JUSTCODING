/**
 * 随机字符串
 * 一、利用 Math.random().toString(36)
 */
function generateRandStr(len) {
    let str = ''
    for (; str.length < len; str += Math.random().toString(36).substr(2)) {}
    return str.substr(0, len)
}

console.log(generateRandStr(10), generateRandStr(10).length)
console.log(generateRandStr(6), generateRandStr(6).length)


/**
 * 二、通过 for 循环
 */
function generateRandStr2(len) {
    const allChars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
    let str = ''
    for (let i = 0; i < len; i++) {
        const idx = ~~(Math.random() * allChars.length)
        str += allChars.charAt(idx)
    }
    return str
}

console.log(generateRandStr2(15), generateRandStr2(15).length)
