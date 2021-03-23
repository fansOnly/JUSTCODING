/**
 * 数组乱序
 */
var arr = [1,2,3,4,5,6,7,8,9,10,11,13,56,83,453,542,234,4434];

const disorder = array => {
    const { length } = array;
    let current = length - 1;
    while (current > -1) {
        const random = Math.floor(length * Math.random());  // ;
        [array[current], array[random]] = [array[random], array[current]];
        current--;
    }
    return array
}

console.log(disorder(arr))
