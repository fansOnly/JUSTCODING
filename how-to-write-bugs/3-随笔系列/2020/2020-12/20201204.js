// 位运算符 << ｜ &
// << 左移运算符: 符号位不变，右侧出现空位填充0，超出32位的丢弃
// 5 << 2   整体左移两位，右侧填充0，左侧超出的被丢弃
// 0000 0000 0000 0000 0000 0000 0000 (0101)   = 5
//                                     /
//                                   \/_  
// 0000 0000 0000 0000 0000 0000 00(01 01)00   = 20

// >> 右移运算符: 使用符号位填充空位，超出32位的丢弃
// 1000 >> 6  最右侧的8位右移丢弃，左侧填充0
// 0000 0000 0000 0000 0000 0001 1110 1000   = 1000
//                                   \
//                                   _\/
// 0000 0000 0000 0000 0000 0000 0000 0001   = 3

// 逻辑位运算符 ｜ 对二进制操作数逐位比较，有一项位1则返回1，全为0则返回0
// 逻辑位运算符 &  对二进制操作数逐位比较，有一项位0则返回0，全为1则返回1

const permission = {
    A: 1,
    B: 1 << 1,
    C: 1 << 2,
    D: 1 << 3
}
console.log(permission)

let pval = 0
// 赋予 A 的值
pval |= permission.A
console.log(pval) // 1
// 赋予 C 的值
pval |= permission.C
console.log(pval) // 5
// 赋予 D 的值
pval |= permission.D
console.log(pval) // 13

// 查看是否满足 ABCD 的某项值, 返回0则不满足
console.log(pval & permission.A) // 1
console.log(pval & permission.B) // 0
console.log(pval & permission.C) // 4
console.log(pval & permission.D) // 8
