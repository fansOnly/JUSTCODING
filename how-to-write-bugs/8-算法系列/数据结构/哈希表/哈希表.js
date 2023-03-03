/**
 * 哈希表实现
 * 基于链地址法实现
 * 三维数组
 * [[[k, v], [k, v]], [[k, v], [k, v]], [[k, v], [k, v]]]
 */
class HashMap {
  constructor() {
    this.storage = [] // 数组
    this.count = 0 // 数组元素个数
    this.min = 7
    this.limit = 7 // 数组长度
  }

  put(key, value) {
    const index = this.hashFunc(key, this.limit)
    let bucket = this.storage[index]
    if (!bucket) {
      bucket = []
      this.storage[index] = bucket
    }
    for (let i = 0; i < bucket.length; i++) {
      const tuple = bucket[i]
      if (tuple[0] === key) {
        tuple[1] = value
        return
      }
    }

    bucket.push([key, value])
    this.count++

    // 判断是否需要扩容
    if (this.count > this.limit * 0.75) {
      const newLimit = this.getClosePrimeNum(this.limit * 2)
      this.resize(newLimit)
    }
  }

  get(key) {
    const index = this.hashFunc(key, this.limit)
    const bucket = this.storage[index]
    if (!bucket) return null
    for (let i = 0; i < bucket.length; i++) {
      const tuple = bucket[i]
      if (tuple[0] === key) {
        return tuple[1]
      }
    }
    return null
  }

  remove(key) {
    const index = this.hashFunc(key, this.limit)
    const bucket = this.storage[index]
    if (!bucket) return null
    for (let i = 0; i < bucket.length; i++) {
      const tuple = bucket[i]
      if (tuple[0] === key) {
        bucket.splice(i, 1)
        this.count--
        // 缩小容量
        if (this.limit > this.min && this.count < this.limit * 0.25) {
          const newLimit = this.getClosePrimeNum(Math.floor(this.limit / 2))
          this.resize(newLimit)
        }
        return tuple[1]
      }
    }
    return null
  }

  // 哈希表扩容
  resize(newLimit) {
    const oldStorage = this.storage
    this.storage = []
    this.count = 0
    this.limit = newLimit

    for (let i = 0; i < oldStorage.length; i++) {
      const bucket = oldStorage[i]
      if (!bucket) continue
      for (const j = 0; j < bucket.length; j++) {
        const tuple = bucket[j]
        this.put(tuple[0], tuple[1])
      }
    }
  }

  isEmpty() {
    return this.count === 0
  }

  size() {
    return this.count
  }

  getClosePrimeNum(num) {
    while (!this.isPrimeNum(num)) {
      num++
    }
    return num
  }

  hashFunc(str, size) {
    let hashCode = 0
    for (let i = 0; i < str.length; i++) {
      // 37 是业界使用较多的质数
      hashCode = 37 * hashCode + str.charCodeAt(i)
    }

    return hashCode % size
  }

  isPrimeNum(num) {
    // 开平方根，减少循环次数，提升效率
    const sqrt = parseInt(Math.sqrt(num))
    for (let i = 2; i <= sqrt; i++) {
      if (num % i === 0) return false
    }
    return true
  }
}

const hashmap = new HashMap()
hashmap.put('key1', 'aaa')
hashmap.put('key2', 'bbb')
hashmap.put('key3', 'ccc')

console.log(hashmap.get('key2'))

hashmap.put('key2', 'b1b1b1')
console.log(hashmap.get('key2'))

hashmap.remove('key2')
console.log(hashmap.get('key2'))

console.log(hashmap.getClosePrimeNum(14))
