let a = 10
let b = 7

a ^= b
b ^= a
a ^= b
console.log(a, b)


console.log((4 ^ 5) >= 0);
console.log((4 ^ -5) >= 0);
console.log((-4 ^ -5) >= 0);


console.log(1 ^ 3)
console.log(11 ^ 11)


const isIntPower = n => (n & n - 2) === 0
console.log('isIntPower: ', isIntPower(64));
console.log('isIntPower: ', isIntPower(12));


const mathRound = n => (n > 0 ? n + 0.5 : n - 0.5) | 0
console.log('mathRound: ', mathRound(1.2), Math.round(1.2));
console.log('mathRound: ', mathRound(1.8), Math.round(1.8));
console.log('mathRound: ', mathRound(-1.8), Math.round(-1.8));


const isEven = n => (n & 1) === 0
console.log('isEven: ', isEven(3));
console.log('isEven: ', isEven(4));
