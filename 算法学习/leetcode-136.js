/**
 * 136. 只出现一次的数字
 * 给你一个 非空 整数数组 nums ，除了某个元素只出现一次以外，其余每个元素均出现两次。找出那个只出现了一次的元素。
 * 你必须设计并实现线性时间复杂度的算法来解决此问题，且该算法只使用常量额外空间。
 * 
 * 示例 1 ：
 * 输入：nums = [2,2,1]
 * 输出：1
 * 
 * 示例 2 ：
 * 输入：nums = [4,1,2,1,2]
 * 输出：4
 * 
 * 示例 3 ：
 * 输入：nums = [1]
 * 输出：1
 * 
 * 提示：
 * 1 <= nums.length <= 3 * 10^4
 * -3 * 10^4 <= nums[i] <= 3 * 10^4
 * 除某个元素只出现一次以外，其余每个元素均出现两次。
 */

function singleNumber(nums) {
  let hash = new Set()
  for (let i = 0; i < nums.length; i++) {
    if (hash.has(nums[i])) {
      hash.delete(nums[i]);
    } else {
      hash.add(nums[i]);
    }
  }
  return hash.values().next().value;
}

function singleNumber(nums) {
  let res =  -1
  let hash = new Map()
  for (let i = 0; i < nums.length; i++) {
    if (hash.has(nums[i])) {
      hash.set(nums[i], hash.get(nums[i]) + 1);
    } else {
      hash.set(nums[i], 1);
    }
  }

  hash.forEach((value, key) => {
    if (value == 1) {
      res =  key;
    }
  });

  return res
}

console.log(singleNumber([2,2,1])); // 1
console.log(singleNumber([4,1,2,1,2])); // 4
console.log(singleNumber([1])); // 1