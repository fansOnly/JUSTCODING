// 判断一个字符串中出现次数最多的字符，并统计次数
const str ='sadasjdlkajdqweqasdsadaaddssssssssssssassdsadasdaajsjadhkaaaaadddddddddakuiauiqwqewyw'

let obj = {}

for (let i = 0; i < str.length; i++) {
    if (!obj[str.charAt(i)]) {
        obj[str.charAt(i)] = 1
    } else {
        obj[str.charAt(i)]++
    }
}

console.log(obj)

let max = 0
let char = []

for (let key in obj) {
    if (obj[key] > max) {
        max = obj[key]
        char = [key]
    } else if (obj[key] == max) {
        char.push(key)
    }
}

console.log(char, max) // ['s'] 21
