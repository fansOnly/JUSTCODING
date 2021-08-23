for (let i = 0; i < 3; i++) {
  let i = 'abc';
  console.log(i);
}
// 情况二
for (var i = 0; i < 3; i++) {
  var i = 'abc';
  console.log(i);
}
// 情况三
for (let i = 0; i < 3; i++) {
  var i = 'abc';
  console.log(i);
}
// 情况四
for (var i = 0; i < 3; i++) {
  let i = 'abc';
  console.log(i);
}



// var n = 2 // -> 4 -> 8
// var obj = {
//     n: 3,    // 6
//     fn: (function(n){
//         n*=2
//         this.n+=2    // window 下的 n 变成 4
//         var n = 5    // 这一步不会再重新声明，因为已经参数赋值，就不会再声明而是直接赋值 n = 5
//         console.log("window.n", window.n)
//         return function (m) {
//             console.log("n:", n, "m", m)    // n:5  m:3  这里的 n 向上查找是 5   //
//             this.n*=2    // fn(3): 2 * 4 =8  //  obj.fn(3): 2 * 3 = 6
//             console.log(m + (++n))    // 3 + (++5) ++n 导致上级作用域的n变成了6    // 3 + (++6)
//         }
//     })(n)
// }

// var fn = obj.fn;
// fn(3)    // 9
// obj.fn(3)    // 10
// console.log(n, obj.n)



var n = 2
var obj = {
    n: 3,
    fn: (function(n){
        n*=2
        this.n+=2
        var n = 5
        console.log("window.n", window.n)
        return function (m) {
            console.log("n:", n, "m", m)
            this.n*=2
            console.log(m + (++n))
        }
    })(n)
}

var fn = obj.fn;
fn(3)
obj.fn(3)
console.log(n, obj.n)
