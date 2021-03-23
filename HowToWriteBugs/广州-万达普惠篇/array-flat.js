// 数组扁平化
const arr1 = [1,[2,3,[4,5],6],7,8,[9,0,11]];

// 1 Array.flat
const flatByArray = arr => arr.flat(Infinity);
console.log('flat by Array.flat =>', flatByArray(arr1))

// 2 flatByJson
const flatByJson = arr => JSON.parse(`[${JSON.stringify(arr).replace(/(\[|\])/g, '')}]`);
console.log('flat by json =>', flatByJson(arr1));


// 3 递归
const flatByIterable = arr => {
    let res = [];
    for (const val of arr) {
        Array.isArray(val) ? res = res.concat(flatByIterable(val)) : res.push(val);
    }
    return res;
}
console.log('flat by interable =>', flatByIterable(arr1))

// 4 reduce
const flatByReduce = arr => arr.reduce((prev, cur) => Array.isArray(cur) ? prev.concat(flatByReduce(cur)) : prev.concat(cur), []);
console.log('flat by reduce =>', flatByReduce(arr1))

// 5 while
const flatByWhile = arr => {
    while(arr.some(item => Array.isArray(item))) {
        arr = [].concat(...arr)
    }
    return arr
}

console.log('flat by while =>', flatByWhile(arr1));