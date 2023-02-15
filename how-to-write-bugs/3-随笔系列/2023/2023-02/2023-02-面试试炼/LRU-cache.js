class LRUCache {
  constructor(max) {
    this.max = max
    this.data = new Map()
  }

  set(key, value) {
    if (this.data.has(key)) {
      this.data.delete(key)
      this.data.set(key, value)
      return
    }
    const size = this.data.size
    if (size >= this.max) {
      const firstKey = this.data.keys().next().value
      this.data.delete(firstKey)
    }
    this.data.set(key, value)
  }

  get(key) {
    if (!this.data.has(key)) {
      return false
    }
    const value = this.data.get(key)
    this.data.delete(key)
    this.data.set(key, value)
    return value
  }
}

const t = new LRUCache(3)

t.set('a', 1)
t.set('b', 2)
t.set('c', 3)
console.log('01', t.data)
t.set('a', 1)
console.log('02', t.data)
t.set('d', 4)
console.log('03', t.data)
