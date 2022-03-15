/*
 * @Author: fansonly
 * @Date: 2022-03-15 10:59:51
 * @Description:
 * @LastEditTime: 2022-03-15 11:41:53
 */

const reg = /(?!^[0-9]+$)(?!^[A-z]+$)(?!^[^A-z0-9]+$)^.{8,16}$/

console.log(reg.test('1236s2 a'))


const reg2 = /(?!.*\s)(?!^[\u4e00-\u9fa5]+$)(?!^[0-9]+$)(?!^[A-z]+$)(?!^[^A-z0-9]+$)^.{8,16}$/

console.log(reg2.test('aaaaa /=aa+aa1aaa'))
console.log(reg2.test('12345678+99s'))
