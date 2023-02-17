function foo(a, b = 1, c) {
  console.log(foo.length)
  console.log(arguments.length)
}

foo(1, 2, 3)
