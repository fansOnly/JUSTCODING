class Dictionary {
  constructor() {
    this.items = {}
  }
  set(key, value) {
    this.items[key] = value
  }
  has(key) {
    return this.items.hasOwnProperty(key)
  }
  remove(key) {
    if (!this.has(key)) return false
    delete this.items[key]
    return true
  }
  get(key) {
    return this.has(key) ? this.items[key] : undefined
  }
  keys() {
    return Object.keys(this.items)
  }
  values() {
    return Object.values(this.items)
  }
  size() {
    return this.keys().length
  }
  clear() {
    this.items = {}
  }
}
