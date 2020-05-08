// URLSearchParams()
// new URLSearchParams(init)
// init: 一个 USVString 实例, 或者一个包含 USVString 的记录

// const href = 'http://www.baidu.com:8081/test/page/?a=1&b=2&c=3'
const href = '?a=1&b=2&c=3&a=8'

const searchParams = new URLSearchParams(href)

console.log(searchParams)  // { 'a' => '1', 'b' => '2', 'c' => '3', 'a' => '8' }

// append
searchParams.append('d', 4)
console.log(searchParams) // { 'a' => '1', 'b' => '2', 'c' => '3', 'a' => '8', 'd' => '4' }

// delete
searchParams.delete('b')
console.log(searchParams) // { 'a' => '1', 'c' => '3', 'a' => '8', 'd' => '4' }

// for of entries
for (let [key, val] of searchParams.entries()) {
    console.log(key + ' => ' + val) //  a => 1 c => 3 a => 8 d => 4
}

// foreach
searchParams.forEach((val, key) => {
    console.log(key + ' => ' + val) //  a => 1 c => 3 a => 8 d => 4
})

// get
console.log(searchParams.get('a')) // 1

// getAll
console.log(searchParams.getAll('a')) // ['1', '8']

// has
console.log(searchParams.has('a')) // true

// for of keys
for (let key of searchParams.keys()) {
    console.log(key) // a b a d
}

// for of values
for (let val of searchParams.values()) {
    console.log(val) // 1 3 8 4
}

// set
searchParams.set('d', 9)
console.log(searchParams) // { 'a' => '1', 'c' => '3', 'a' => '8', 'd' => '9' }

// 重复的参数会被重置成一个
searchParams.set('a', 6)
console.log(searchParams) // { 'a' => '6', 'c' => '3', 'd' => '9' }

// 没有该参数就会增加
searchParams.set('b', '20')
console.log(searchParams) // { 'a' => '6', 'c' => '3', 'd' => '9', 'b' => '20' }

// sort 根据健值排序
searchParams.sort()
console.log(searchParams) // { 'a' => '6', 'b' => '20', 'c' => '3', 'd' => '9' }

// toString()  转换成字符串
const params = searchParams.toString()
console.log(params) // a=6&b=20&c=3&d=9



// ********************************************************************************************************************************************
// ********************************************************************************************************************************************
// ********************************************************************************************************************************************
// ********************************************************************************************************************************************
// URL()
// new URL(url, [base])
// url: 表示相对或者绝对URL的DOMString, 如果 url 是相对URL, 则会将 base 作为基准URL, 如果是绝对URL, 则 base 无效
// base: 可选， 默认为 ''

const base = 'http://www.baidu.com:8081/test/page/a/b/c'

const url = new URL('', base)
console.log(url.href) //  http://www.baidu.com:8081/test/page/a/b/c

const url1 = new URL('/', base)
console.log(url1.href) // http://www.baidu.com:8081/

const url2 = new URL('e/f', base)
console.log(url2.href) // http://www.baidu.com:8081/test/page/a/b/e/f

const url3 = new URL('./e/f', base)
console.log(url3.href) // http://www.baidu.com:8081/test/page/a/b/e/f

const url4 = new URL('../e/f', base)
console.log(url4.href) // http://www.baidu.com:8081/test/page/a/e/f

const url5 = new URL('/a/e/f', base)
console.log(url5.href) // http://www.baidu.com:8081/a/e/f

const url6 = new URL('hehe', base)
console.log(url6.href) // http://www.baidu.com:8081/test/page/a/b/hehe

const base2 = 'http://www.baidu.com'

const url7 = new URL('//image.com', base2)
console.log(url7.href) // http://image.com/

const url8 = new URL('https://image.com', base2)
console.log(url8.href) // https://image.com/