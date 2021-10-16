var name = "null";
var age = 38;
var length = 10;
var say = "说话";

function demo(arg) {

  console.log(obj1, arg);

  function arg() {}

  var obj1 = {
    name: "熊大",
    age: 88,
    say: function () {
      return (name, age) => {
        console.log(`我是${this.name}, 年龄${age}`);
      };
    },
  };

  var length;
  console.log(length);
  length = 108;
  console.log(length);

  var obj2 = {
    name: "熊二",
    age: 58,
    say: obj1.say(),
  };

  if (
    console.log("undefined") ||
    (!!"" + "1" && typeof typeof null && !!length)
  ) {
    setTimeout(() => {
      obj1.say()("熊三", 88);
    });
    obj2.say("光头强", 77);
  } else {
    setTimeout(() => {
      obj2.say("肥波", 199);
    });
  }

  new Promise((resolve, reject) => {
    resolve(188);
  }).then((age) => {
    obj2.say("光头强", age);
  });

}

demo(18);








/**
 * 基于atob和btoa的base64编码和解码
 */
function utf8_to_b64(str) {
  return window.btoa(unescape(encodeURIComponent(str)))
}
utf8_to_b64('✓ à la mode')

function b64_to_utf8(str) {
  return decodeURIComponent(escape(window.atob(str)))
}
b64_to_utf8('4pyTIMOgIGxhIG1vZGU=')


/**
 * 非正则替换的html代码encode和decode
 */
function htmlencode(s) {
  let div = document.createElement('div')
  div.appendChild(document.createTextNode(s))
  const result = div.innerHTML
  div = null
  return result
}

htmlencode("<div>3>5 & 666</div>");

function htmldecode(s) {
  let div = document.createElement('div')
  div.appendChild(document.createTextNode(s))
  const result = div.innerText || div.textContent
  div = null
  return result
}

htmldecode("&lt;div&gt;3&gt;5 &amp; 666&lt;/div&gt;")






/**
 * 基于URL或者Crypto.getRandomValues生成UUID
 */
function getUUID() {
  const url = URL.createObjectURL(new Blob([]))
  const uuid = url.substring(url.lastIndexOf('/') + 1)
  URL.revokeObjectURL(url)
  return uuid
}

getUUID()

function uuidv4() {
  return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c => (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16))
}



/**
 * 基于sendBeacon的安全的数据上报
 */
function report(url, data) {
  if (typeof navigator.sendBeacon !== 'function') {
    return console.error("sendBeacon不被支持");
  }
  navigator.sendBeacon(url, data)
}



/**
 * Promise顺序执行
 * 让Promise顺序的执行，并支持初始化参数和结果作为参数传递
 */
function runPromises(promiseCreators, initData) {
  return promiseCreators.reduce((promise, next) => {
    return promise.then(data => next(data))
  }, Promise.resolve(initData))
}

var promise1 = function (data = 0) {
  return new Promise(resolve => {
      resolve(data + 1000);
  });
}
var promise2 = function (data) {
  return new Promise(resolve => {
      resolve(data -500);
  });
}

runPromises([promise1, promise2], '00000').then(res => console.log(res))



/**
 * 延时执行delay
 */
function delay(fn = ()=>{}, delay = 5000, context = null) {
  let runned = false
  let ticket = null
  return {
    run (...args) {
      return new Promise((resolve, reject) => {
        if (runned) return
        runned = true
        ticket = setTimeout(async () => {
          try {
            const result =  await fn.apply(context, args)
            resolve(result)
          } catch (error) {
            reject(error)
          }
        }, delay);
      })
    },
    cancel() {
      clearTimeout(ticket)
    }
  }
}

const { run, cancel } = delay(function(msg) {
  console.log(msg)
})

run('hello 123.')
run('hello 123.')



/**
 * for in   for of
 */
// 原型上增加方法
Array.prototype.gogo = function(){
  console.log("gogo");
}

var a = [1,2,3];

// key值2不可以枚举
Object.defineProperty(a, 2, {
  enumerable: false
});
Object.defineProperty(a, "2", {
  enumerable: false
});

for(let p in a){
  // 索引被遍历出来是字符串类型
  console.log(p, typeof p); // 0 string; 1 string; gogo string
}

console.log("---")

for(let v of a){
  console.log(v);  // 1 2 3
}


































































var name = "null";
var age = 38;
var length = 10;
var say = "说话";


// 2. 运行demo的前一刻发生了预编译环节，预编译发生在函数运行的前一刻。
//    - 第一步，生创建AO（Activation Object）对象：可以理解为demo这个函数拥有的一个冰箱，在执行内部代码时就通过这个冰箱来取东西（变量，函数...）。
//    AO: {
//
//    }
//    - 第二步，将形参和变量声明当作AO的属性名，值为undefined。
//    AO: {
//      arg: undefined,
//      obj1: undefined,
//      length: undefined,
//      obj2: undefined,
//    }
//    - 第三步，将形参和实参相统一。
//    AO: {
//      arg: 18,
//      obj1: undefined,
//      length: undefined,
//      obj2: undefined,
//    }
//    - 第四步，在函数体里找函数声明，将值赋为函数体。
//    AO: {
//      arg: function arg() {},
//      obj1: undefined,
//      length: undefined,
//      obj2: undefined,
//    }

// 预编译后，开始解释执行demo
function demo(arg) {

  // 3. 上面说到AO就是这个函数的冰箱，在访问变量时首先去AO里面去找，如果没有再沿着上一层的AO找，一直递归下去，所以此时冰箱（AO）里面的obj1为undefined，arg在预编译时已经变成了函数体。
  //     所以打印：undefined, function arg() {}。
  console.log(obj1, arg);

  // 4. 这句代码还看不看？当然不看，因为在预编译第四部的时候已经提升了。
  function arg() {}

  // 5. 将obj1的值赋值为代码中的对象。
  var obj1 = {
    name: "熊大",
    age: 88,
    say: function () {
      return (name, age) => {
        console.log(`我是${this.name}, 年龄${age}`);
      };
    },
  };

  // 6. 同理，预编译的第二部已经提升了，直接进入下一行。
  var length;
  // 7. 冰箱（AO）里的length是什么？打印：undefined。
  console.log(length);
  // 8. 将AO中的length赋值为108。
  length = 108;
  // 9. 此时AO中的length的值为108，打印108。
  console.log(length);

  // 10. 将obj2赋值为代码中的对象。
  var obj2 = {
    name: "熊二",
    age: 58,
    // 14. 仔细看，赋值的say方法是obj1调用后的say，所以方法内的this指向为obj1，并非是obj2。
    say: obj1.say(),
  };

  // 11. 开始进入到if，首先判断console.log的返回值，要知道一个函数的返回值是不是要运行它？所以控制台输出字符串类型的undefined，返回值为原始类型undefined。
  //     || 运算符不成立进入到(!!"" + "1" && typeof typeof null && !!length)。
  //     !!"" + "1" === 字符串false1（强制类型转换）。
  //     typeof typeof null === typeof "object" === 字符串string
  //     判断成立进入到if语句中
  if (
    console.log("undefined") ||
    (!!"" + "1" && typeof typeof null && !!length)
  ) {
    // 12. setTimeout？里面的代码需要看吗？不需要！啥时候执行再看，直接扔到计时器线程去计时吧，时间到了在事件队列里呆着吧，等我啥时候JS引擎空闲了再去执行事件队列中的回调函数。
    //     什么？！你还不知道JS中的事件循环？别急，三天内我会出一篇精解版来教你事件循环，不会包赔！
    setTimeout(() => {
      // 21. 来吧，可算到我了，在宏队列里都等十年了，开始执行，与15同理，打印熊大，年龄88。至此，队列中的所有回调全部执行完毕。
      obj1.say()("熊三", 88);
    });
    // 13. 同步代码，进入到Obj2的say方法。⬆️
    // 15. 在了解了obj2的say方法中的this指向后，所以打印什么？
    //     (name, age) => {
    //        console.log(`我是${this.name}, 年龄${age}`);
    //     };
    //     打印this.name，this为obj1，所以打印熊大，年龄为传入的age，77。
    obj2.say("光头强", 77);
  } else {
    setTimeout(() => {
      obj2.say("肥波", 199);
    });
  }

  // 16. 进入到Promise。
  new Promise((resolve, reject) => {
    // 17. Promise内的代码都是同步的，如果我在这里加个console.log会立刻执行。resolve传入参数188。
    //     resolve后Promise的状态变成已决状态。将then放入到微队列中，等待执行。
    resolve(188);
  }).then((age) => {
    // 20. 先看微队列，与第15步同理，打印熊大，年龄为age，188。微队列中无可执行回调，去看宏队列。⬆️
    obj2.say("光头强", age);
  });

  // 18. 发现demo执行完毕，demo的AO出栈。
}

// 1. GO预编译完成，执行到demo()后开始执行demo。
demo(18);

// 19. GO（Global Object）发现无执行代码，出栈，此时JS执行线程空闲。此时结束了吗？
//     并没有，还记得我们上面放入的setTimeout和Promise.then的回调函数吗？他们都在事件列队中的宏/微任务等待执行呢。
