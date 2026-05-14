const obj = {
  a: 1,
  b: '2',
  c: { c1: 'c1' },
  cc: {
    cc1: {
      ccc1: 'ccc1'
    }
  },
  d: ['d1', 'd2'],
  // e: function() {
  //   console.log('e')
  // },
  f: new Date(),
  g: new RegExp(),
  h: undefined,
  i: null,
  j: new Map().set('j1', 'j1'),
  k: new Set().add('k1').add('k2'),
}

const obj2 = structuredClone(obj)

console.log(obj2)

obj.a = 10