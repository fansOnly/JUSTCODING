/*
 * @Author: fansonly
 * @Date: 2022-02-28 09:52:52
 * @Description:
 * @LastEditTime: 2022-02-28 09:59:15
 */
const validateJsonString = str => {
  return /^\{(\"(.+)\"\:(.+))\}/.test(str)
}

console.log(validateJsonString('asdasdasd'))
console.log(validateJsonString('{"a": "1"}'))
console.log(validateJsonString('{"a": 1,"b-a" :null}'))
console.log(JSON.parse('{"a": 1,"b-a" :null}'))
// console.log(JSON.parse('asdasdasd'))
