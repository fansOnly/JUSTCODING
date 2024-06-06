/**
 * 1. new 绑定 - new Fn()
 * 2. 显式绑定 - call, apply, bind
 * 3. 隐式绑定 - obj.fn()
 * 4. 默认绑定 - fn()
 * 5. 箭头函数 - 固定不变
 */


{
  var length = 10;
  function fn() {
    return this.length + 1;
  }
  var obj = {
    length: 5,
    test1: function () {
      return fn();
    },
  };
  obj.test2 = fn;
  console.log(obj.test1());
  console.log(fn() === obj.test2());
}

//

{
  const name = "张三";
  const obj = {
    name: "李四",
    fn: function () {
      console.log(this.name);
    },
  };

  const obj1 = {
    name: "王二",
    foo: obj,
  };

  const obj2 = {
    name: "赵五",
    foo: obj1,
  };

  obj2.foo.foo.fn();
}

{
  const name = "张三";
  const obj = {
    name: "李四",
    fn: function () {
      console.log(this.name);
    },
  };

  const obj1 = {
    name: "王二",
    foo: obj.fn,
  };

  obj1.foo();
}
