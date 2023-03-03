class Set {
  constructor() {
    this.items = {}
  }

  add(value) {
    if (this.has(value)) return false
    this.items[value] = value
    return true
  }
  remove(value) {
    if (!this.has(value)) return false
    delete this.items[value]
    return true
  }
  has(value) {
    return this.items.hasOwnProperty(value)
  }
  clear() {
    this.items = {}
  }
  size() {
    return Object.keys(this.items).length
  }
  values() {
    return Object.keys(this.items)
  }

  union(target) {
    const set = new Set()
    const values = this.values()
    for (let i = 0; i < values.length; i++) {
      set.add(values[i])
    }
    const targetValues = target.values()
    for (let i = 0; i < targetValues.length; i++) {
      set.add(targetValues[i])
    }
    return set
  }

  intersection(target) {
    const set = new Set()
    const values = this.values()
    for (let i = 0; i < values.length; i++) {
      const value = values[i]
      if (target.has(value)) {
        set.add(value)
      }
    }
    return set
  }

  difference(target) {
    const set = new Set()
    const values = this.values()
    for (let i = 0; i < values.length; i++) {
      if (!target.has(value)) {
        set.add(value)
      }
    }
    return set
  }

  subset(target) {
    if (this.size() > target.size()) return false
    let flag = true
    const values = this.values()
    for (let i = 0; i < values.length; i++) {
      const value = values[i]
      if (!target.has(value)) {
        flag = false
        break
      }
    }
    return flag
  }
}
