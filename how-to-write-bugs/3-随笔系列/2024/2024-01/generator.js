function* gen() {
  const a = yield 1;
  console.log(a, "this is a");
  const b = yield 2;
  console.log(b, "this is b");
  const c = yield 3;
  console.log(c, "this is c");
  return "resultValue";
}

let g = gen();

const g1 = g.next(); // 不打印
console.log("g1: ", g1); // { value: 1, done: false }
const g2 = g.next("param-a"); // param-a this is a
console.log("g2: ", g2); // { value: 2, done: false }
const g3 = g.next("param-b"); // param-b this is b
console.log("g3: ", g3); // { value: 3, done: false }
const g4 = g.next("param-c"); // param-c this is c
console.log("g4: ", g4); // { value: 'resultValue', done: true }

/**
 * polyfill
 */
const generatorRuntime = {
  // 用于内部实现 GeneratorFunctionPrototype 的继承，这里忽略
  mark(fn) {
    return fn;
  },
  wrap(fn) {
    const _context = {
      next: 0, // 下一个指针
      sent: "", // 接受 next 的参数，作为上一次 yield 的返回值
      done: false, // 是否结束
      stop() {
        this.done = true;
      },
    };
    return {
      next(param) {
        _context.sent = param;
        const value = fn(_context);
        return {
          value,
          done: _context.done,
        };
      },
    };
  },
};
