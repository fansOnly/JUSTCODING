/*
 * @Author: fansonly
 * @Date: 2022-04-28 15:40:01
 * @Description:
 * @LastEditTime: 2022-04-28 18:10:48
 */

Function.prototype.myCall = function(context, args) {
  let fn = Symbol()
  context = context || window
  context[fn] = this
  const res = context[fn](args)
  delete context[fn]
  return res
}

Function.prototype.myBind = function(context, ...args) {
  const self = this
  function noop() {}
  let fBound = function(...args2) {
    return self.apply(self instanceof fBound ? this : context, args.concat(args2))
  }
  fBound.prototype = new noop()
  return fBound
}

function instance(left, right) {
  if (left === null || typeof left !== 'object') return false
  const prototype = right.prototype;
  while (left.__proto__) {
    if (left.__proto__ === prototype) return true
    left = left.__proto__
  }
  return false
}

console.log(instance([], Array))
console.log(instance([], Object))
console.log(instance('', Object))


function create(ctor) {
  function F() {}
  F.prototype = ctor
  return new F()
}


// 过滤 XSS
// function FilterXss(content) {
//   let elem = document.createElement("div");
//   elem.innerText = content;
//   const result = elem.innerHTML;
//   elem = null;
//   return result;
// }

// const str = '<p>sadasdasdadds<script src="window.location.href=https://www.baidu.com"></script></p>'
// console.log(FilterXss(str))


function A(a) {
  console.log(a) // 1
  A = function (b) {
    console.log(a) // 2
      console.log(a + b++) // 4
  }
  console.log(a++) // 1
}
A(1)
A(2)


function f() {
  [1].reduce(v => {
    console.log('v', v)
  })
}

f()
