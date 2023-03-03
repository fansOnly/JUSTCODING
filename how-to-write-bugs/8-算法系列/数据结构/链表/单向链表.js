class Node {
  constructor(item) {
    this.item = item
    this.next = null
  }
}

class LinkedList {
  constructor() {
    this.head = null
    this.length = 0
  }

  append(item) {
    const node = new Node(item)
    if (this.length === 0) {
      this.head = node
    } else {
      let current = this.head
      while (current.next) {
        current = current.next
      }
      current.next = node
    }
    this.length += 1
  }
  insert(pos, item) {
    if (pos < 0 || pos > this.length) return false
    const node = new Node(item)
    let current = this.head
    if (pos === 0) {
      node.next = current
      this.head = node
    } else {
      let i = 0
      let prev = null
      while (i < pos) {
        prev = current
        current = current.next
        i++
      }
      node.next = current
      prev.next = node
    }
    this.length += 1
    return true
  }
  get(pos) {
    if (pos < 0 || pos >= this.length) return null
    let i = 0
    let current = this.head
    while (i < pos) {
      current = current.next
      i++
    }
    return current.item
  }
  indexOf(item) {
    let pos = 0
    let current = this.head
    while (current) {
      if (current.item === item) {
        return pos
      }
      current = current.next
      pos++
    }
    return -1
  }
  update(pos, item) {
    if (pos < 0 || pos >= this.length) return false
    let current = this.head
    let i = 0
    while (i < pos) {
      current = current.next
      i++
    }
    current.item = item
    return true
  }
  removeAt(pos) {
    if (pos < 0 || pos >= this.length) return null
    let current = this.head
    if (pos === 0) {
      this.head = current.next
    } else {
      let prev = null
      let i = 0
      while (i < pos) {
        prev = current
        current = current.next
        i++
      }
      prev.next = current.next
    }
    this.length -= 1
    return current.item
  }
  remove(item) {
    let pos = this.indexOf(item)
    return this.removeAt(pos)
  }
  isEmpty() {
    return this.length === 0
  }
  size() {
    return this.length
  }
  toString() {
    let res = ''
    let current = this.head
    while (current) {
      res += `${current.item} `
      current = current.next
    }
    return res
  }
}

const list = new LinkedList()
list.append('aaa')
list.append('bbb')
list.append('ccc')
list.append('ddd')
console.log(list.toString())
console.log(list.length)

// list.insert(0, 'eee')
list.insert(2, 'fff')
// list.insert(4, 'ggg')
console.log(list.toString())

// console.log(list.get(3))

// console.log(list.indexOf('ss'))
// console.log(list.indexOf('eee'))

// list.update(3, 'fff')
// console.log(list.toString())

// console.log(list.removeAt(0))
// console.log(list.removeAt(2))
// console.log(list.removeAt(4))
// console.log(list.toString())


// console.log(list.remove('ss'))
// console.log(list.remove('aaa'))
// console.log(list.toString())
