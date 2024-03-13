// Sum.prototype.add = function(num) {
//   this.total += num
//   return this
// }

// const s = new Sum(1)
// const r = s.add(2).add(3)
// console.log(r.total)


function sum(...args) {
  let total = args.reduce((a,b) => a + b, 0)

  function sumOf(...remainArgs) {
    total += remainArgs.reduce((a,b) => a + b, 0)
    return sumOf
  }

  sumOf.add = function() {
    return total
  }

  return sumOf
}

const result = sum(1,2)(3).add()
console.log('result: ', result);