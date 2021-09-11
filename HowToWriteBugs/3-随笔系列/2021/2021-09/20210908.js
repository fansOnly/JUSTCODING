/*
 * @Author: fansonly
 * @Date: 2021-09-08 08:58:47
 * @Description:
 * @LastEditTime: 2021-09-09 08:30:58
 */

/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
 var twoSum = function(nums, target) {
  let map = new Map()
   for (let j = 0; j < nums.length; j++) {
       const i = map.get(target - nums[j]) >= 0 ? map.get(target - nums[j]) : -1
       if (i >= 0 && i !== j) {
           return [i, j]
       }
       map.set(nums[j], j)
      }
  return [-1, -1]
};

console.log(twoSum([2,7,11,15], 9))




/**
 * @param {number[][]} matrix
 * @return {void} Do not return anything, modify matrix in-place instead.
 */
 var rotate = function(matrix) {
  const length = matrix.length
  const temp = new Array(length).fill(0).map(() => new Array(length).fill(''))
  for (let i = 0; i < length; ++i) {
      for (let j = 0; j < length; ++j) {
          temp[j][length - i - 1] = matrix[i][j]
      }
  }
  matrix = temp
}

var arr = [[1,2,3],[4,5,6],[7,8,9]]
rotate(arr)
console.log('arr: ', arr);
