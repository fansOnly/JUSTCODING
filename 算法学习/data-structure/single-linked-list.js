/**
 * 数据结构 - 单链表
 */

var ListNode = function(val) {
  this.val = val;
  this.next = null;
}

var createLinkedList = function(arr) {
  if (!arr || !arr.length) {
    return null;
  }
  const head = new ListNode(arr[0]);
  let cur = head
  for (let i = 1; i < arr.length; i++) {
    cur.next = new ListNode(arr[i]);
    cur = cur.next;
  }
  return head;
}


let head = createLinkedList([1, 2, 3, 4, 5]);
console.log('head: ', head);

// 遍历数组
for (let i = head; i != null; i = i.next) {
  console.log(i.val)
}


// 在单链表头部插入新元素
function insertAtHead(head, val) {
  const newHead = new ListNode(val);
  newHead.next = head;
  return newHead;
}
// console.log('insertAtHead: ', insertAtHead(head, 0))


// 在单链表尾部插入新元素
function insertAtTail(head, val) {
  if (!head) {
    return new ListNode(val);
  }
  let cur = head;
  while (cur.next) {
    cur = cur.next
  }
  cur.next = new ListNode(val);
  return head;
}

// console.log('insertAtTail: ', insertAtTail(head, 6))

// 在单链表中间插入新元素
function insertAtIndex(head, index, val) {
  if (index === 0) {
    return insertAtHead(head, val);
  }
  let cur = head
  let i = 1
  while (cur.next && i < index) {
    cur = cur.next
    i++
  }
  if (i === index) {
    const newNode = new ListNode(val)
    newNode.next = cur.next
    cur.next = newNode
  }
  return head
}

console.log('insertAtIndex: ', insertAtIndex(head, 2, 10))