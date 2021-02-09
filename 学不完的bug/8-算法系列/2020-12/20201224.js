/**
 * 给定一个只包括 '('，')'，'{'，'}'，'['，']' 的字符串，判断字符串是否有效。
 * 有效字符串需满足：
 * 左括号必须用相同类型的右括号闭合。左括号必须以正确的顺序闭合。
 * 注意空字符串可被认为是有效字符串。
 */
function isValid(str) {
    const stucks = []
    for (let i = 0; i < str.length; i++) {
        const char = str.charAt(i)
        if (['(', '{', '['].includes(char)) {
            stucks.push(char)
        }
        if (!stucks.length) return false
        console.log('stucks: ', stucks);
        if (char === ')' && stucks.pop() !== '(') return false
        if (char === '}' && stucks.pop() !== '{') return false
        if (char === ']' && stucks.pop() !== '[') return false
    }
    return stucks.length === 0
}

console.log(isValid('(1111)')) // true


/**
 * 打平多维数组
 */
function flatten(arr, depth = 1) {
    let res = []
    for (let i = 0; i < arr.length; i++) {
        if (Array.isArray(arr[i]) && depth > 0) {
            res.push(...flatten(arr[i], depth - 1))
        } else {
            res.push(arr[i])
        }
    }
    return res
}

function flatten2(arr, depth = 1) {
    return arr.reduce((acc, cur) => acc.concat(Array.isArray(cur) && depth > 1 ? flatten2(cur, depth - 1) : cur), [])
}

console.log(flatten([1, [2, [3, [4, 5, [0]]]], 6], 2))
console.log(flatten2([1, [2, [3, [4, 5, [0]]]], 6], 2))
