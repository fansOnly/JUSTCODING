# 二分查找

## 1、框架代码

1. 条件判断细节：mid 加1还是减1。while 使用 <= 还是 <。
2. mid 溢出优化：left。 + Math.floor((right - left) / 2)

```js
var binarySearch = function(nums, target) {
    var left = 0, right = nums.length - 1;

   while (...) {
        var mid = left + Math.floor((right - left) / 2);
        if (nums[mid] == target) {
            ...
        } else if (nums[mid] < target) {
            left = ...
        } else if (nums[mid] > target) {
            right = ...
        }
    }
    return ...;
}
```

## 2、解题思路

1. 搜索区间，[left, right] [left, right +1) => [0, length - 1] || [0, length)
2. 指针移动：[left, ..., mid, ..., right] => [left, ..., mid - 1] || [mid + 1, ..., right]