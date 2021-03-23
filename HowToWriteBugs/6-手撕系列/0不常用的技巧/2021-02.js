/**
 * RGB→转换为十六进制 - ??
 */
const rgb2hex = ([r, g, b]) => {
    return `#${(1 << 24) + (r << 16) + (g << 8) + b}`.toString(16).substr(1)
}

console.log(rgb2hex([255, 255, 255]))

/**
 * 十六进制转换为RGB - ??
 */
const hex2rgb = hex => {
    return [1, 3, 5].map((h) => parseInt(hex.substring(h, h + 2), 16))
}

console.log(hex2rgb('#000000'))


/**
 *  用参数生成路径
 */
const generatePath = (route, obj) => {
    return route.replace(/(\:[a-z]+)/g, v => obj[v.substr(1)])
}

// /app/product/1001
console.log(generatePath('/app/:page/:id', {
    page: 'product',
    id: 1001
}))


/**
 * 数字补零
 */
const fixWithZero = num => {
    return num.toString().padStart(2, '0')
}

console.log(fixWithZero(1))


/**
 * es5 VS es6
 */
console.log([NaN].indexOf(NaN)) // -1
console.log([NaN].includes(NaN)) // true

console.log(isNaN('NaN')) // true
console.log(Number.isNaN('NaN')) // false

console.log(NaN === NaN) // false
console.log(Object.is(NaN, NaN)) // true

console.log(+0 === -0) // true
console.log(Object.is(+0, -0)) // false
