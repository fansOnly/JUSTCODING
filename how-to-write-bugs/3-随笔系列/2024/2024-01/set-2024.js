/**
 * Set 的新特性
 * 2024
 * Stage 3
 * polyfill
 */

const s1 = new Set([1,2,3,4,5,6,7])
const s2 = new Set([2,7,8,9,0,5,11,12,13])

const r1 = s1.intersection(s2)
console.log('r1: ', r1);