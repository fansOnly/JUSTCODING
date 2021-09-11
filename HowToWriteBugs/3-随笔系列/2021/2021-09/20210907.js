/*
 * @Author: fansonly
 * @Date: 2021-09-07 10:46:17
 * @Description:
 * @LastEditTime: 2021-09-07 19:36:21
 */
function co(gen) {
  const ctx = this
  const args = [].slice.call(arguments, 1)
  return new Promise((resolve, reject) => {
    if (typeof gen === 'function') gen = gen.apply(ctx, args)
    if (!gen || typeof gen.next !== 'function') return resolve(gen)

    onFulfilled()

    function onFulfilled(res) {
      let ret
      try {
        ret = gen.next(res)
      } catch (error) {
        return reject(err)
      }
      next(ret)
      return null
    }
  })

  function onReject(err) {
    let ret
    try {
      ret = gen.throw(err)
    } catch (error) {
      return reject(err)
    }
    next(ret)
  }

  function next(ret) {
    if (next.done) return resolve(ret.value)

    const value = toPromise.call(ctx, ret.value)
    if (value && isPromise(value)) return value.then(onFulfilled, onReject)
    return onReject(new TypeError('You may only yield a function, promise, generator, array, or object, '
    + 'but the following object was passed: "' + String(ret.value) + '"'))
  }
  function toPromise(val) {
  }
  function isPromise(val) {
    return val.then && typeof val.then === 'function'
  }
}



const request = () => {
  return new Promise(resolve => {
    resolve(100)
  })
}

co(function* fn() {
  const result = yield request()
  console.log(result)
})





/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number[]}
 */
 var intersect = function(nums1, nums2) {
  nums1.sort((a, b) => a - b)
  nums2.sort((a, b) => a - b)
var res = []
let i = 0, j = 0
while(i < nums1.length && j < nums2.length) {
  if (nums1[i] == nums2[j]) {
      res.push(nums1[i])
      i++
      j++
  } else if (nums1[i] > nums2[j]) {
      j++
  } else {
      i++
  }
}
return res
};

var arr1 = [61,24,20,58,95,53,17,32,45,85,70,20,83,62,35,89,5,95,12,86,58,77,30,64,46,13,5,92,67,40,20,38,31,18,89,85,7,30,67,34,62,35,47,98,3,41,53,26,66,40,54,44,57,46,70,60,4,63,82,42,65,59,17,98,29,72,1,96,82,66,98,6,92,31,43,81,88,60,10,55,66,82,0,79,11,81]
var arr2 = [5,25,4,39,57,49,93,79,7,8,49,89,2,7,73,88,45,15,34,92,84,38,85,34,16,6,99,0,2,36,68,52,73,50,77,44,61,48]

console.log(intersect(arr1, arr2))



/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number[]}
 */
 var intersect = function(nums1, nums2) {
  if (nums1.length > nums2.length) {
      return intersect(nums2, nums1)
  }
  let map = new Map()
  for (let i = 0; i < nums1.length; i++) {
      const count = map.get(nums1[i]) || 0
      map.set(nums1[i], count + 1)
  }
  let res = []
  for (let i = 0; i < nums2.length; i++) {
      const count = map.get(nums2[i]) || 0
   if (count > 0) {
       res.push(nums2[i])
       map.set(nums2[i], count - 1)
   }
  }
  return res
  };
  var arr1 = [61,24,20,58,95,53,17,32,45,85,70,20,83,62,35,89,5,95,12,86,58,77,30,64,46,13,5,92,67,40,20,38,31,18,89,85,7,30,67,34,62,35,47,98,3,41,53,26,66,40,54,44,57,46,70,60,4,63,82,42,65,59,17,98,29,72,1,96,82,66,98,6,92,31,43,81,88,60,10,55,66,82,0,79,11,81]
  var arr2 = [5,25,4,39,57,49,93,79,7,8,49,89,2,7,73,88,45,15,34,92,84,38,85,34,16,6,99,0,2,36,68,52,73,50,77,44,61,48]
  console.log(intersect(arr1, arr2))



