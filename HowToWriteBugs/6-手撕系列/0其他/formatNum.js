/**
 * 格式化数字
 * @param {*} num
 * x(?!y) 正向否定查找 x后面不跟着y时匹配x
 * x(?=y) 先行断言  x后面紧跟着y匹配x
 */
// 处理小数
const formatNum = num => {
    return num.toString().replace(/(?!^)(?=(\d{3})+\.)/g, ',')
}

console.log(formatNum(1234567.1))

// 处理整数
function formatPrice(price, sym = ',') {
    return String(price).replace(/\B(?=(\d{3})+(?!\d))/g, sym);
}

console.log(formatPrice(123456.111))

// 处理整数
const formatMoney = num => {
    return String(num).replace(/\d(?=(\d{3})+$)/g, '$&,')
}

console.log(formatMoney(1234111))


/**
 * 脱敏处理
 */
const encryptStr = (str, start = 3, end = 4) => {
    const encryptReg = new RegExp('(\\d{' + start + '})\\d*(\\d{' + end + '})')
    return String(str).replace(encryptReg, '$1****$2')
}

console.log(encryptStr(18811228888, 3, 4))
