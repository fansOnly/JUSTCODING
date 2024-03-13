
// function jsonp({url, params, cb}) {
//   const generateUrl = () => {
//     let paramsStr = ''
//     for (const key in params) {
//       paramsStr += `key = ${params[key]}&`
//     }
//     return url + '?' + paramsStr + `callback=${cb}`
//   }

//   return new Promise(resolve => {
//     const script = document.createElement('script')
//     script.src = generateUrl()
//     document.appendChild(script)

//     window[cb] = data => {
//       resolve(data)
//       document.removeChild(script)
//     }
//   })
// }





// function curry(fn, ...args) {
//   const length = fn.length
//   return function(...rest) {
//     const allArgs = [...args, ...rest]
//     return allArgs.length < length ? curry.call(null, fn, ...allArgs) : fn.call(this, ...allArgs)
//   }
// }

// const add = (a, b, c) => a + b + c
// const add2 = curry(add, 1)
// console.log(add2(2)(3))






// const a = Infinity
// console.log(a === a - 1)
// console.log(a === a + 1)





// const a = {
//   i: 0,
//   toString() {
//     return ++ this.i
//   },
//   valueOf() {
//     return ++ this.i
//   }
// }

// // 数据劫持  Object.defineProperty

// console.log(a == 1 && a == 2 &&  a == 3)







// const toThousands = (number, fixed = 2) => {
//   let [integer, decimal = '00'] = String(Number(number).toFixed(fixed)).split('.')
//   integer = integer.replace(/(?!^)(?=(\d{3})+$)/g, ',')
//   return integer + '.' + decimal
// }

// console.log(toThousands(1234567.129))
// console.log(toThousands(123456))






// function compose(...fns) {
//   return function(x) {
//     return fns.reduce((arg, fn) => {
//       return fn(arg)
//     }, x)
//   }
// }

// const f1 = (n) => n + 1
// const f2 = (n) => n * 2
// const f3 = (n) => n * 3

// const fn = compose(f1, f2, f3)
// console.log(fn(3))


// // 洋葱中间件模型
// function compose(middlewares) {
//   return function(context, next) {
//     let index = -1;
//     function dispatch(i) {
//       index = i
//       const fn = middlewares[i]
//       if (i === middlewares.length) fn = next
//       if (!fn) return Promise.resolve()
//       try {
//         return Promise.resolve(fn(context, dispatch.bind(null, index + 1)))
//       } catch (error) {
//         return Promise.reject(error)
//       }
//     }

//     return dispatch(0)
//   }
// }






// // 惰性载入函数
// function addHandler(element, type, handler) {
//   if (element.addEventListener) {
//     addHandler = function (element, type, handler) {
//       element.addEventListener(type, handler, false);
//     };
//   } else if (element.attachEvent) {
//     addHandler = function (element, type, handler) {
//       element.attachEvent("on" + type, handler);
//     };
//   } else {
//     addHandler = function (element, type, handler) {
//       element["on" + type] = handler;
//     };
//   }
//   // 保证首次调用能正常执行监听
//   return addHandler(element, type, handler);
// }



// Number,String,Boolean,Null,Undefined,Symbol,BigInt
// Object(Array,function,Date,RegExp...)





// var x=1
// switch(x++)
// {
//   case 0: ++x
//   console.log('x1: ', x);
//   case 1: ++x
//   console.log('x2: ', x); // 3
//   case 2: ++x
//   console.log('x3: ', x); // 4
// }

// console.log(x) 