// var name = 222
// var a = {
//   name: 111,
//   say: function() {
//     console.log(this.name)
//   }
// }

// var fun = a.say

// fun() // fun.call(window) 222
// a.say() // a.say.call(a) 111

// var b = {
//   name: 333,
//   say: function(fun) {
//     fun() // fun.call(window)
//   }
// }
// b.say(a.say) // 222
// b.say = a.say
// b.say() // b.say.call(b) 333


/**
 * GO: {
 *    test: undefined => function test() {}
 *    b: undefined => 345(from AO)
 *    c: undefined => 9(from AO)
 * }
 * AO: {
 *    a: undefined => 123
 *    b: undefined => 345
 *    c: undefined => 9
 * }
 */
// console.log(test) // function test() {}
// console.log(a) // a is not defined
// function test(a) {
//   console.log(c) // undefined
//   var a = b = 345
//   c = 9
//   if (false) {
//     var c = 789
//   }
//   console.log(a) // 345
//   console.log(c) // 9
// }
// test(123)
// console.log(b) // 345
// console.log(test) // function test() {}
// var test = 123
// var b = 456

/**
 * 找出一个网页中所有的不重复的标签
 */
// [...new Set([...document.querySelectorAll('*')].map(v => v.tagName))]
