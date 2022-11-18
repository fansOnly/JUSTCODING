/**
 * @param {number[]} nums
 * @param {number} k
 * @return {void} Do not return anything, modify nums in-place instead.
 */
 var rotate = function(nums, k) {
   k %= nums.length
  reverse(nums, 0, nums.length - 1)
  reverse(nums, 0, k - 1)
  reverse(nums, k, nums.length - 1)
};

function reverse(nums, start, end) {
  let temp
  while(start < end) {
      temp = nums[start]
      nums[start++] = nums[end]
      nums[end--] = temp
  }
}

var nums = [1,2,3,4,5,6,7]
rotate(nums, 3)
console.log(nums)
