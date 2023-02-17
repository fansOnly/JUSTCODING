/**
 * 闭包陷阱
 */
function fun(n, o) {
  console.log(o)
  return {
    fun: function (m) {
      return fun(m, n)
    }
  }
}
var a = fun(0); a.fun(1); a.fun(2); a.fun(3) //undefined,?,?,?
// a = fun(0, undefined) => a.fun = fun(m, 0)
// a.fun(1, 0)
// a.fun(2, 0)
// a.fun(3, 0)

var b = fun(0).fun(1).fun(2).fun(3) //undefined,?,?,?
// b = fun(0, undefined).fun(1, 0).fun(2, 1).fun(3, 2)

var c = fun(0).fun(1); c.fun(2); c.fun(3) //undefined,?,?,?
// c = fun(0, undefined).fun(1, 0) => c.fun = fun(m, 1)
// c.fun(2, 1)
// c.fun(3, 1)
