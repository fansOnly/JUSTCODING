/**
 * 哈希表
 * 1. 数组可以通过索引在 O(1) 的时间复杂度内查找到对应元素，索引是一个非负整数。
 * 2. key 是唯一的，value 可以重复
 * 3. 哈希函数，把任意长度的输入（key）转化成固定长度的输出（索引）。
 * 3.1 函数复杂度决定了哈希表增删改查的复杂度，只要保证哈希函数的复杂度在 O(1)，且合理解决哈希冲突的问题，那么增删查改的复杂度就都是 O(1)。
 * 3.2 输入相同的 key，输出也必须要相同
 * 4. 哈希冲突：两个不同的 key 通过哈希函数得到了相同的索引
 * 4.1 拉链法
 * 4.2 开放寻址法
 * 5. 扩容和负载因子
 * 5.1 负载因子是一个哈希表装满的程度的度量。负载因子的计算公式也很简单，就是 size / table.length。其中 size 是哈希表里面的 key-value 对的数量，table.length 是哈希表底层数组的容量。
 * 5.2 当哈希表内元素达到负载因子时，哈希表会扩容。
 * 6. 哈希表中键的遍历顺序是无序的
 * 7. 不建议在 for 循环中增/删哈希表的 key，触发扩容时，哈希函数计算出来的索引也会变化，哈希表的遍历顺序也会变化
 * 8. key 必须是不可变的，推荐 string、number 类型
 */

// 拉链法实现
class HashMap {
  constructor() {
    this.BASE = 769
    this.data = new Array(this.BASE).fill(0).map(() => new Array())
  }


  add(key) {
    const hash = this.hash(key)
    const bucket = this.data[hash]
    for (const item of bucket) {
      if (item === key) {
        return
      }
    }
    bucket.push(key)
  }

  remove(key) {
    const hash = this.hash(key)
    const bucket = this.data[hash]
    for (let i = 0; i < bucket.length; i++) {
      if (bucket[i] === key) {
        bucket.splice(i, 1)
        return
      }
    }
  }

  contains(key) {
    const hash = this.hash(key)
    const bucket = this.data[hash]
    for (const item of bucket) {
      if (item === key) {
        return true
      }
    }
    return false
  }

  hash(key) {
    return key % this.BASE
  }
}