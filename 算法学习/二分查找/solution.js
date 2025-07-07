/**
 * 二分查找一个数
 * 给定一个 n 个元素有序的（升序）整型数组 nums 和一个目标值 target  ，写一个函数搜索 nums 中的 target，如果 target 存在返回下标，否则返回 -1。
 * 时间复杂度 O(log n)
 */
function search(nums, target) {
  let left = 0;
  let right = nums.length - 1
  while (left <= right) {
    const mid = left + Math.floor((right - left) / 2)
    if (target > nums[mid]) {
      left = mid + 1
    } else if (target < nums[mid]) {
      right = mid - 1
    } else {
      return mid
    }
  }
  return -1
}

// 测试
// console.log(search([-1,0,3,5,9,12], 9)) // 4
// console.log(search([-1,0,3,5,9,12], 2)) // 4


/**
 * 寻找左侧边界的二分查找1
 * [left, right)
 */
function searchLeft(nums, target) {
  if (nums.length === 0) return -1
  if (target < nums[0] || target > nums[nums.length - 1]) return -1
  let left = 0
  let right = nums.length
  while (left < right) {
    const mid = left + Math.floor((right - left) / 2)
    if (nums[mid] === target) {
      right = mid
    } else if (nums[mid] > target) {
      right = mid
    } else if (nums[mid] < target) {
      left = mid + 1
    }
  }

  return nums[left] === target ? left : -1
}

// console.log(searchLeft([1, 2, 3, 5, 5, 5, 5, 5, 5, 5, 5, 6, 7, 8, 9], 5)) // 3
// console.log(searchLeft([1, 2, 3, 5, 5, 5, 5, 5, 5, 5, 5, 6, 7, 8, 9], 4)) // -1

/**
 * 寻找左侧边界的二分查找2
 * [left, right]
 */
function searchLeft2(nums, target) {
  if (nums.length === 0) return -1
  if (target < nums[0] || target > nums[nums.length - 1]) return -1
  let left = 0
  let right = nums.length - 1
  while (left <= right) {
    const mid = left + Math.floor((right - left) / 2)
    if (nums[mid] === target) {
      right = mid - 1
    } else if (nums[mid] > target) {
      right = mid -1
    } else if (nums[mid] < target) {
      left = mid + 1
    }
  }

  return nums[left] === target ? left : -1
}

// console.log(searchLeft2([1, 2, 3, 5, 5, 5, 5, 5, 5, 5, 5, 6, 7, 8, 9], 5)) // 3
// console.log(searchLeft2([1, 2, 3, 5, 5, 5, 5, 5, 5, 5, 5, 6, 7, 8, 9], 4)) // -1


/**
 * 寻找右侧边界的二分查找1
 * [left, right]
 */
function searchRight(nums, target) {
  if (nums.length === 0) return -1
  if (target < nums[0] || target > nums[nums.length - 1]) return -1
  let left = 0
  let right = nums.length - 1
  while (left <= right) {
    const mid = left + Math.floor((right - left) / 2)
    if (nums[mid] === target) {
      left = mid + 1
    } else if (nums[mid] < target) {
      left = mid + 1
    } else if (nums[mid] > target) {
      right = mid - 1
    }
  }
  return nums[right] === target ? right : -1
}
console.log(searchRight([1, 2, 3, 5, 5, 5, 5, 5, 5, 5, 5, 6, 7, 8, 9], 5)) // 10
console.log(searchRight([1, 2, 4, 5], 3)) // -1