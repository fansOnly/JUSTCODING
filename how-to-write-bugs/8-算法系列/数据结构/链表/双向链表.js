class Node {
  constructor(item) {
    this.item = item
    this.prev = null
    this.next = null
  }
}

class LinkedList {
  constructor() {
    this.head = null
    this.tail = null
    this.length = 0
  }

  append(item) {
    const node = new Node(item)
    if (this.length === 0) {
      this.head = node
      this.tail = node
    } else {
      node.prev = this.tail
      this.tail.next = node
      this.tail = node
    }
    this.length += 1
  }
  insert(pos, item) {
    if (pos < 0 || pos > this.length) return false
    const node = new Node(item)
    if (this.length === 0) {
      this.head = node
      this.tail = node
    } else {
      if (pos === 0) {
        this.head.prev = node
        node.next = this.head
        this.head = node
      } else if (pos === this.length) {
        node.prev = this.tail
        this.tail.next = node
        this.tail = node
      } else {
        let i = 0
        let current = this.head
        while (i < pos) {
          current = current.next
          i++
        }
        current.prev.next = node
        node.prev = current.prev
        node.next = current
        current.prev = node
      }
    }
    this.length += 1
    return true
  }
  get(pos) {
    if (pos < 0 || pos >= this.length) return null
    let current = null, i = 0
    if (pos <= this.length / 2) {
      current = this.head
      while (i < pos) {
        current = current.next
        i++
      }
    } else {
      i = this.length - 1
      current = this.tail
      while (i > pos) {
        current = current.prev
        i--
      }
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
    let current = null, i = 0
    if (pos <= this.length / 2) {
      current = this.head
      while (i < pos) {
        current = current.next
        i++
      }
    } else {
      i = this.length - 1
      current = this.tail
      while (i > pos) {
        current = current.prev
        i--
      }
    }
    current.item = item
    return true
  }
  removeAt(pos) {
    if (pos < 0 || pos >= this.length) return null
    let current = this.head
    if (this.length === 1) {
      this.head = null
      this.tail = null
    } else {
      if (pos === 0) {
        this.head.next.prev = null
        this.head = this.head.next
      } else if (pos === this.length - 1) {
        current = this.tail
        this.tail.prev.next = null
        this.tail = this.tail.prev
      } else {
        let i = 0
        if (pos <= this.length / 2) {
          while (i < pos) {
            current = current.next
            i++
          }
        } else {
          current = this.tail
          i = this.length - 1
          while (i > pos) {
            current = current.prev
            i--
          }
        }
        current.prev.next = current.next
        current.next.prev = current.prev
      }
    }
    this.length -= 1
    return current.item
  }
  remove(item) {
    const pos = this.indexOf(item)
    return this.removeAt(pos)
  }
  isEmpty() {
    return this.length === 0
  }
  size() {
    return this.length
  }
  toString() {
    return this.backwardString()
  }
  forwardString() {
    let current = this.tail
    let res = ''
    while (current) {
      res += `${current.item} `
      current = current.prev
    }
    return res
  }
  backwardString() {
    let current = this.head
    let res = ''
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

// console.log(list)
console.log(list.toString())
console.log(list.forwardString())
console.log('=====================')

// list.insert(0, 'eee')
// list.insert(3, 'fff')
// list.insert(4, 'ggg')
// console.log(list.toString())
// console.log(list.forwardString())


// console.log(list.get(3))


// console.log(list.indexOf('sss'))
// console.log(list.indexOf('ddd'))


// list.update(0, '111')
// list.update(2, '222')
// list.update(3, '444')
// console.log(list.toString())
// console.log(list.forwardString())


// list.append('eee')
// list.append('fff')
// // console.log(list.removeAt(0))
// console.log(list.removeAt(2))
// // console.log(list.removeAt(5))
// console.log(list.toString())
// console.log(list.forwardString())


// console.log(list.remove('ccc'))
// console.log(list.toString())
// console.log(list.forwardString())
