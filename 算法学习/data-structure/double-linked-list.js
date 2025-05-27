/**
 * 双向链表
 */

function ListNode(val) {
    this.val = val;
    this.prev = null;
    this.next = null;
}

function doubleLinkedList(arr) {
  if (!arr || arr.length === 0) {
    return null;
  }
  const head = new ListNode(arr[0]);
  let cur = head
  for (let i = 1; i < arr.length; i++) {
    const newNode = new ListNode(arr[i]);
    cur.next = newNode
    newNode.prev = cur
    cur = cur.next
  }
  return head
}

// 双链表的遍历/查找/修改
let head = doubleLinkedList([1, 2, 3, 4, 5])
let tail = null

// 前序遍历
let str = ''
function preOrder(head) {
  for (let cur = head; cur; cur = cur.next) {
    str += cur.val + '->'
    tail = cur
  }
}
// preOrder(head)
// console.log(str)
// console.log()

// 后序遍历
function postOrder(tail) {
  for (let cur = tail; cur; cur = cur.prev) {
    str += cur.val + '->'
  }
}
// postOrder(tail)
// console.log(str)
// console.log()


// 在双链表头部插入新元素
function addAtHead(head, val) {
  const newNode = new ListNode(val)
  if (!head) {
    return newNode
  }
  newNode.next = head
  head.prev = newNode
  return newNode
}

// head = addAtHead(head, 0)
// console.log('head: ', head);

// 在双链表尾部插入新元素
function addAtTail(head, val) {
  const newNode = new ListNode(val)
  if (!head) {
    return newNode
  }
  let cur = head
  while (cur.next) {
    cur = cur.next
  }
  cur.next = newNode
  newNode.prev = cur
  return newNode
}

// tail = addAtTail(head, 6)
// console.log('tail: ', tail);

// 在双链表指定位置插入新元素
function addAtIndex(head, index, val) {
  if (index === 0) {
    return addAtHead(head, val)
  }
  const newNode = new ListNode(val)
  let cur = head
  let i = 0
  while (cur && i < index - 1) {
    cur = cur.next
    i++
  }
  newNode.next = cur.next
  cur.next = newNode
  newNode.prev = cur
  return newNode
}

// const insertNode = addAtIndex(head, 2, 10)
// console.log('insertNode: ', insertNode);

// 在双链表中删除一个节点
function deleteNode(head, val) {
  if (!head) {
    return null
  }
  if (head.val === val) {
    // 头节点
    return head.next
  }
  let cur = head
  while (cur.next && cur.next.val !== val) {
    cur = cur.next
  }
  const next = cur.next.next
  if (next) {
    cur.next = next
    next.prev = cur
  } else {
    // 尾节点
    cur.next = null
  }
  return head
}

// head = deleteNode(head, 5)


// 在双链表头部删除元素
function deleteAtHead() {
  let newHead = head.next
  newHead.prev = null
  return newHead
}

// head = deleteAtHead()
// console.log('head: ', head);


// 在双链表尾部删除元素
function deleteAtTail() {
  let cur = head
  while (cur.next) {
    cur = cur.next
  }
  const newTail = cur.prev
  newTail.next = null
  return newTail
}

tail = deleteAtTail()
// console.log('tail: ', tail);

// console.log()
preOrder(head)
// console.log(str)