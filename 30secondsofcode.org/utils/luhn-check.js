/**
 * luhnCheck
 * Implementation of the Luhn Algorithm used to validate a varity(类型) of identification numbers, such as credit card numbsers, IMEI numbers, National Provider identifier numbers etc.
 * 1. Use String.prototype.split(), Array.prototype.reverse() and Array.prototype.map() in combination with parseInt() to obtain(获得) an array of digits.
 * 2. Use Array.prototype.splicde(0, 1) to obtain the last digit.
 * 3. Use Array.prototype.reduce() to implement the Luhn Algorithm.
 * 4. Return true if sum is divisible(分割) by 10, false otherwise.
 */
const luhnCheck = num => {
    let arr = (num +'').split('').reverse().map(x => parseInt(x))
    let lastDigit = arr.splice(0, 1)[0]
    let sum = arr.reduce((acc, val, i) => (i % 2 !== 0 ? acc + val : acc + ((val * 2) % 9) || 9), 0)
    sum += lastDigit
    return sum % 10 === 0
}

console.log(luhnCheck('4485275742308327')); // true
console.log(luhnCheck(6011329933655299)); //  false
console.log(luhnCheck(123456789)); // false
