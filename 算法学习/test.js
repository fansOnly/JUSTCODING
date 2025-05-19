var Node = function(val) {
  this.val = val
  this.next = null
}

var MyLinkedList = function() {
  this.head = new Node(null)
  this.head.next = null
  this.size = 0
};

/** 
* @param {number} index
* @return {number}
*/
MyLinkedList.prototype.get = function(index) {
  const node = this.getNode(index)
  return node !== null ? node.val : -1
};

MyLinkedList.prototype.getNode = function(index) {
  if (index < 0 || index >= this.size) {
      return null
  }
  let cur = this.head.next
  for (let i = 0; i < index; i++) {
      cur = cur.next
  }
  return cur
}

/** 
* @param {number} val
* @return {void}
*/
MyLinkedList.prototype.addAtHead = function(val) {
  const newNode = new Node(val)
  const _next = this.head.next
  this.head.next = newNode
  newNode.next = _next
  
  this.size++
};

/** 
* @param {number} val
* @return {void}
*/
MyLinkedList.prototype.addAtTail = function(val) {
  const newNode= new Node(val)
  const tail = this.getNode(this.size - 1)
  if (tail) {
      tail.next = newNode
  } else {
      this.head.next = newNode
  }

  this.size++
};

/** 
* @param {number} index 
* @param {number} val
* @return {void}
*/
MyLinkedList.prototype.addAtIndex = function(index, val) {
  if (index < 0 || index > this.size) return null
  if (index === this.size) {
      return this.addAtTail(val)
  }
  const newNode = new Node(val)
  const target = this.getNode(index)
  const prev = this.getNode(index - 1)
  if (prev) {
      prev.next = newNode
  } else {
      this.head.next = newNode
  }
  newNode.next = target

  this.size++
};

/** 
* @param {number} index
* @return {void}
*/
MyLinkedList.prototype.deleteAtIndex = function(index) {
if (this.size === 0 || index < 0 || index >= this.size) return
  const target = this.getNode(index)
  const _next = target.next
  const prev = this.getNode(index - 1)
  if (prev) {
      prev.next = _next
  } else {
      this.head.next = _next
  }

  this.size--
};

MyLinkedList.prototype.print = function(key) {
  let str = "";
    let cur = this.head.next;
    while (cur !== null) {
      str += cur.val + "<->";
      cur = cur.next;
    }
    console.log("size", this.size);
    console.log("print:" + key + "\n", str + "\n");
}

const myLinkedList = new MyLinkedList();
myLinkedList.addAtIndex(1, 0);
myLinkedList.print("11111");
console.log('pos 0 is', myLinkedList.get(0));