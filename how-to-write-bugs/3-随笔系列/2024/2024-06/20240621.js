const obj = {
  a: 1,
  b: 'b',
  c: [1,2,3, () => {}, Symbol(), undefined,,new RegExp()],
  d: { d1: 'd1', d2: () => {}},
  e: function() {},
  f: new Date(),
  g: Symbol(),
  h: new RegExp(),
  i: undefined,
  j: null
}

console.log(JSON.stringify(obj))