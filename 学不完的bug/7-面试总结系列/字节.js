// ================================================================================================================
// ================================================ 一面 ===========================================================
// ================================================================================================================

// *********************************************************************************************************
// 笔试题：写一个处理加法可能产生精度的函数，比如 0.1 + 0.2 = 0.3

const decimalAdd = (a, b, accuracy = 1000) => {
    return (a * accuracy + b * accuracy) / accuracy
}

console.log(0.1 + 0.2) // 0.30000000000000004
console.log(decimalAdd(0.1, 0.2)) // 0.3


// *********************************************************************************************************
// 1000000000 + 1000000000 允许返回字符串 处理大数
const bigIntAdd = (a, b) => {
    let listA = a.toString().split('');
    let listB = b.toString().split('');
    let lenA = listA.length, lenB = listB.length;
    const len = Math.max(lenA, lenB);
    if (lenA < len) {
        listA = new Array(len - lenA).fill('0').concat(listA)
    }
    if (lenB < len) {
        listB = new Array(len - lenB).fill('0').concat(listB)
    }
    const listC = listA.map((v, i) => parseInt(v) + parseInt(listB[i]))
    let carry = 0;  // 进位值, 最多为1
    const listD = listC.reduceRight((acc, cur) => {
        cur = cur + carry
        if (cur >= 10) {
            // carry = parseInt((cur).toString().substr(0, 1));
            carry = 1;
            acc.push(cur - 10 * carry);
        } else {
            carry = 0;
            acc.push(cur);
        }
        return acc
    }, []);
    return listD.reverse().join('');
}

const bigIntAdd2 = (str1, str2) => {
    let res = '', temp = 0;
    const list1 = str1.split('');
    const list2 = str2.split('');
    while(list1.length || list2.length || temp) {
        // 按位运算符
        temp += ~~list1.pop() + ~~list2.pop();
        res = temp % 10 + res;
        temp = temp > 9;
    }
    return res.replace(/^0+/, '');
}

console.log(bigIntAdd('123456789', '1230470')) // 246501859
console.log(bigIntAdd2('123456789', '1230470')) // 246501859

// *********************************************************************************************************
// 实现一个 new
// 1 创建一个对象
// 2 将对象的__proto__指向构造函数的 prototype
// 3 将这个对象作为构造函数的this
// 4 返回这个对象

function myNew(Con, ...args) {
    const obj = Object.create(Con.prototype)
    let result = Con.call(obj, args);
    return result !== null && typeof result === 'obj' ? result : obj;
}




// *********************************************************************************************************
// 打印九九乘法表

const print99 = (len = 9)  => {
    // const arr = Array.from({length: 10}).map((v, i) => i)
    const arr = new Array(10).fill().map((v, i) => i)
    let res = '';
    for (let i = 1; i <= len; i++) {
        for (let j = 1; j <= i; j++) {
            res += `${j} * ${i} = ${j * i} `;
        }
        res += '\n';
    }
    return res;
}

console.log(print99());
