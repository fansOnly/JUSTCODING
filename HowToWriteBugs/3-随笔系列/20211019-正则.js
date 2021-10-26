/**
 * 数字千位分隔
 */
const formatNumber = (num, fixed = 2, sys = ',') => {
  if (isNaN(Number(num))) {
    throw TypeError('num should be a valid num or string.')
  }

  const pn = Number(num) > 0 ? '' : '-'
  let [integer, decimal] = String(num).split('.')
  integer = integer.replace(/^[\-\+]/, '').replace(/(?!^)(?=(\d{3})+$)/g, sys)
  decimal = decimal ? decimal.length > fixed ? decimal.substr(0, fixed) : decimal.padEnd(fixed, '0') : '0'.repeat(fixed)

  return pn + integer + '.' + decimal
}


let num = 123456789012.345
console.log(formatNumber(num, 5))


/**
 * 手机号脱敏
 */
const phoneDesentitation = (num, sys = '*') => {
  return String(num).replace(/^(\d{3})(\d{4})(\d{4})$/, `$1${sys.repeat(4)}$3`)
}

console.log(phoneDesentitation(13345678989))


/**
 * 格式化手机号码
 */
const formatPhone = (num, sys = '-') => {
  return String(num).replace(/(?=(\d{4})+$)/g, sys)
}

console.log(formatPhone(13345678989))


/**
 * 验证密码强度
 * 密码长度是6-12位，
 * 由数字、小写字母和大写字母组成
 * 但必须至少包括2种字符
 *
 * 必须包含两种字符，有下面四种排列组合方式
 * 1. 数字和小写字母组合
 * 2. 数字和大写字母组合
 * 3. 小写字母与大写字母组合
 * 4. 数字、小写字母、大写字母一起组合（但其实前面三种已经覆盖了第四种了）
 */
const validatePass = str => {
  return /((?=.*\d)((?=.*[a-z])|(?=.*[A-Z])))|(?=.*[a-z])(?=.*[A-Z])^[a-zA-Z\d]{6,12}$/.test(str)
}

console.log(validatePass('123456'))
console.log(validatePass('aaaaaa'))
console.log(validatePass('AAAAAA'))
console.log(validatePass('1a1a1a'))
console.log(validatePass('1A1A1A'))
console.log(validatePass('aAaAaA'))
console.log(validatePass('1aA1aA1aA'))



/**
 * 提取重复数字
 */
const collectRepeatStr = str => {
  const reg = /(.+)\1+/g
  let result = []
  String(str).replace(reg, ($0, $1) => {
    console.log('$0: ', $0);
    $1 && result.push($1)
  })
  return result
}

console.log(collectRepeatStr(12323454545666))


/**
 * 提取空格
 */
const trim = str => {
  return str.replace(/^\s*|\s*$/g, '')
}

console.log(trim('    123 567    '))


/**
 * 转义 html
 */
const escapeHtml = html => {
  const escapeMaps = {
    '&': 'amp',
    '<': 'lt',
    '>': 'gt',
    '"': 'quot',
    "'": '#39'
  }

  const escapeReg = new RegExp(`[${Object.keys(escapeMaps).join('')}]`, 'g')

  return html.replace(escapeReg, match => `&${escapeMaps[match]};`)
}

console.log(escapeHtml(`
  <div>
    <p>hello 'world'</p>
  </div>
`))


/**
 * 反转义 html
 */
const unescapeHtml = str => {
  const unescapeMaps = {
    'amp': '&',
    'lt': '<',
    'gt': '>',
    'quot': '"',
    '#39': "'"
  }
  const unescapeReg = /&([^;]+);/g
  return str.replace(unescapeReg, (match, key) => {
    return unescapeMaps[key] || match
  })
}

console.log(unescapeHtml(`
&lt;div&gt;
    &lt;p&gt;hello &#39;world&#39;&lt;/p&gt;
  &lt;/div&gt;
`))


/**
 * 驼峰命名转化
 */
const camelCase = str => {
  return str.replace(/[\s_-]+(.)?/g, (_, char) => char ? char.toUpperCase() : '')
}

console.log(camelCase('aa-_-bc'))
console.log(camelCase('--bc'))


/**
 * 首字母大写
 */
const capitalize = str => {
  return str.toLowerCase().replace(/(?:^|\s+)\w/g, match => match.toUpperCase())
}

console.log(capitalize('hello world'))
console.log(capitalize(' hello  WORLD'))


/**
 * 获取页面的全部 img 标签
 *
 * 1. img标签到src之间的部分，只要不是>，其他的啥都可以
 * 2. 括号内的部分，也就是我们要提取的url部分，作为一个捕获分组存在，方便直接获取
 * 2.1 (?:https?:)? 表示支持协议头为http:或者https:
 * 2.2 括号外面的？，表示可以没有协议头，即支持//xxx.juejjin.com/a.jpg形式的链接
 * 2.3 接着是两个斜线
 * 2.4 因为src="" 双引号内的部分即为链接，所以[^"]+ 表示除了"其他部分都行
 * 3. 接着就是"到img结束标签>之间的部分了，除了>之外，啥都可以 [^>]*?
 */
const matchImgs = html => {
  const reg = /<img[^>]+src="((?:https?:)?\/\/[^"]+)"[^>]*?>/gi

  const result = []

  html.replace(reg, (match, $1) => {
    $1 && result.push($1)
  })

  return result
}

console.log(matchImgs(`
<a class="nav-bar-title" href="/" aria-label="Vite中文网, back to home" data-v-c0a2c60c data-v-7a4ac696><img class="logo" src="https://xxx.juejin.com/a.jpg" alt="Logo" data-v-7a4ac696> Vite中文网</a>
`))


/**
 * 通过 name 获取 query 参数
 *
 * 1. name前面只能是?或者&
 * 2. value的值可以除了是&以为的任意东西
 * 3. value后面只能是跟着&或者是结束位置
 */
const getQueryByName = (url, name) => {
  const reg = new RegExp(`([?&]${name}=)([^&]*)&?`, 'g')
  const result = []
  url.replace(reg, (match, p1, p2) => {
    result.push(decodeURIComponent(p2))
  })
  return result
}

const getQueryByName3 = (url, name) => {
  const reg = new RegExp(`([?&]${name}=)([^&]*)&?`, 'g')
  let result = ''
  url.replace(reg, (match, p1, p2) => {
    result = decodeURIComponent(p2)
  })
  return result
}

const getQueryByName2 = (url, name) => {
  const reg = new RegExp(`[?&]${name}=([^&]*)(?:&|$)`)
  return decodeURIComponent(url.match(reg)[1])
}


console.log(getQueryByName('https://juejin.cn/?sex=boy&name=前端胖头鱼&age=100&name=111&p=3', 'name'))
console.log(getQueryByName3('https://juejin.cn/?sex=boy&name=前端胖头鱼&age=100&name=111&p=3', 'name'))
console.log(getQueryByName2('https://juejin.cn/?sex=boy&name=前端胖头鱼&age=100&name=111&p=3', 'name'))


/**
 * 24 小时制时间
 *
 * 「时」
 * 第一位可以是012
 * 第二位
 * 2.1 当第一位是01时，第二位可以是任意数字
 * 2.2 当第二位是2时，第二位只能是0、1、2、3
 * 「分」
 * 第一位可以是0、1、2、3、4、5
 * 第二位可以是任意数字
 */
const is24Time = str => {
  const check24TimeRegExp = /^(?:(?:0?|1)\d|2[0-3]):(?:0?|[1-5])\d$/

  return check24TimeRegExp.test(str)
}

console.log(is24Time('1:20'))
console.log(is24Time('11:20'))



/**
 * 匹配日期格式
 *
 * 「日期格式主要分为三个部分」
 * 1. yyyy年部分
 * 这部分只要是四个数字就可以\d{4}
 * 2. mm月份部分
 * 2.1 一年只有12个月，前10个月可以用0\d
 * 2.2 10月份及其以后以后 1[0-2]
 * 3. dd日部分
 * 3.1 一个月最多是31日
 * 3.2 最小是1号
 * 「分隔符」
 * 需要注意的是分割符必须一样不能-./三种混用，比如2021.08-22
 */
const isDate = str => {
  const checkDateRegExp = /^\d{4}([-\/\.])(?:0[1-9]|1[0-2])\1(?:0[1-9]|[12]\d|3[01])$/

  return checkDateRegExp.test(str)
}

console.log(isDate('2021-10-20'))
console.log(isDate('2021-01-20'))
console.log(isDate('2021/10/20'))
console.log(isDate('2021-10/20'))
console.log(isDate('2021-10/32'))




/**
 * 匹配16进制的颜色值
 */
const isColor = str => {
  const checkColorRegExp = /^#(?:[\da-zA-Z]{6}|[\da-zA-Z]{3})/g

  str.match(checkColorRegExp, (match, p, index) => {
    console.log('p: ', p);
    console.log('match: ', match);
    console.log('index: ', index);

  })

  return checkColorRegExp.test(str)
}

console.log(isColor('#ffffff'))
console.log(isColor('#fff'))
console.log(isColor('#f1f1f1'))
console.log(isColor('#f1f'))



/**
 * 手机号正则匹配
 * ^(?:\+?86)?1(?:3\d{3}|5[^4\D]\d{2}|8\d{3}|7(?:[235-8]\d{2}|4(?:0\d|1[0-2]|9\d))|9[0-35-9]\d{2}|66\d{2})\d{6}$
 */



/**
 * 单词大小写反转
 */
const stringCaseReverse = str => {
  const stringCaseReverseRegExp = /[a-z]/ig

  return str.replace(stringCaseReverseRegExp, char => {
    return char.toUpperCase() === char ? char.toLowerCase() : char.toUpperCase()
  })
}

console.log(stringCaseReverse('hello WORLD, hAHa...'))



/**
 * windows 下的文件夹和文件路径
 *
 * windows下的文件规则大概由这几部分构成
 * 1.1 磁盘符:\文件夹\文件夹\文件
 * 1.2 磁盘符：只能是英文构成  [a-zA_Z]:\\
 * 2.1 文件夹名字：不包含一些特殊符号且可出现任意次,最后的\可以没有 ([^\\:*<>|"?\r\n/]+\\?)*
 * 2.2 文件名字：([^\\:*<>|"?\r\n/]+)\.\w+，但是文件可以没有
 */
const isWindowsPath = str => {
  const windowsPathRegExp = /^[a-zA-Z]:\\(?:[^\\:*<>|"?\r\n/]+\\?)*(?:(?:[^\\:*<>|"?\r\n/]+)\.\w+)?$/
  return windowsPathRegExp.test(str)
}

console.log(isWindowsPath('C:\\Documents\\Newsletters\\Summer2018.pdf'))
console.log(isWindowsPath('C:\\Documents\\Newsletters\\'))
console.log(isWindowsPath('C:\\Documents\\Newsletters'))
console.log(isWindowsPath('C:\\'))



/**
 * 试卷分数
 * 大于等于0，小于等于150，小数位只支持.5
 */
const isValidScore = str => {
  const scoreRegExp = /^((?:[1-9]?\d|1[0-4]\d)(?:\.5)?|150)$/
  return scoreRegExp.test(str)
}

console.log(isValidScore(0))
console.log(isValidScore(60.4))
console.log(isValidScore(150))
console.log(isValidScore(145.5))
console.log(isValidScore(150.5))


/**
 * 判断版本号
 *
 * 要求版本号必须是X.Y.Z格式，其中XYZ都是至少一位的数字
 */
const isValidVersion = str => {
  const versionRegExp = /^(?:\d+\.){2}\d+$/
  return versionRegExp.test(str)
}

console.log(isValidVersion('1.1.1'))
console.log(isValidVersion('1.001.1'))
console.log(isValidVersion('1.001.1.5'))
console.log(isValidVersion('1.001'))
