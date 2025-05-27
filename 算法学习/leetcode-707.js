/**
 * 707. 设计链表
 * 你可以选择使用单链表或者双链表，设计并实现自己的链表。
 * 单链表中的节点应该具备两个属性：val 和 next 。val 是当前节点的值，next 是指向下一个节点的指针/引用。
 * 如果是双向链表，则还需要属性 prev 以指示链表中的上一个节点。假设链表中的所有节点下标从 0 开始。
 *
 * 实现 MyLinkedList 类：
 * MyLinkedList() 初始化 MyLinkedList 对象。
 * int get(int index) 获取链表中下标为 index 的节点的值。如果下标无效，则返回 -1 。
 * void addAtHead(int val) 将一个值为 val 的节点插入到链表中第一个元素之前。在插入完成后，新节点会成为链表的第一个节点。
 * void addAtTail(int val) 将一个值为 val 的节点追加到链表中作为链表的最后一个元素。
 * void addAtIndex(int index, int val) 将一个值为 val 的节点插入到链表中下标为 index 的节点之前。如果 index 等于链表的长度，那么该节点会被追加到链表的末尾。如果 index 比长度更大，该节点将 不会插入 到链表中。
 * void deleteAtIndex(int index) 如果下标有效，则删除链表中下标为 index 的节点。
 *
 * 提示：
 * 0 <= index, val <= 1000
 * 请不要使用内置的 LinkedList 库。
 * 调用 get、addAtHead、addAtTail、addAtIndex 和 deleteAtIndex 的次数不超过 2000 。
 *
 * 输入
 * ["MyLinkedList", "addAtHead", "addAtTail", "addAtIndex", "get", "deleteAtIndex", "get"]
 * [[], [1], [3], [1, 2], [1], [1], [1]]
 *
 * 输出
 * [null, null, null, null, 2, null, 3]
 *
 * 解释
 * MyLinkedList myLinkedList = new MyLinkedList();
 * myLinkedList.addAtHead(1);
 * myLinkedList.addAtTail(3);
 * myLinkedList.addAtIndex(1, 2);    // 链表变为 1->2->3
 * myLinkedList.get(1);              // 返回 2
 * myLinkedList.deleteAtIndex(1);    // 现在，链表变为 1->3
 * myLinkedList.get(1);              // 返回 3
 */

// 双链表实现 MyLinkedList 类
class ListNode {
  constructor(val) {
    this.val = val;
    this.next = null;
    this.prev = null;
  }
}

export class MyLinkedList {
  constructor() {
    this.head = new ListNode(null);
    this.tail = new ListNode(null);
    this.head.next = this.tail;
    this.tail.prev = this.head;
    this.size = 0;
  }
  get(index) {
    const node = this.getNode(index);
    return node?.val ?? -1
  }
  getHead() {
    if (this.size === 0) {
      return null;
    }
    return this.head.next.val;
  }
  getTail() {
    if (this.size === 0) {
      return null;
    }
    return this.tail.prev.val;
  }
  set(index, val) {
    if (!this.checkInvalidIndex(index)) return;
    const cur = this.getNode(index);
    const oldVal = cur.val;
    cur.val = val;
    return oldVal;
  }
  addAtHead(val) {
    this.addAtIndex(0, val);
  }
  addAtTail(val) {
    // this.addAtIndex(this.size, val);
    const newNode = new ListNode(val);
    const oldTail = this.tail.prev;

    oldTail.next = newNode
    newNode.prev = oldTail

    newNode.next = this.tail
    this.tail.prev = newNode
    this.size++
  }
  addAtIndex(index, val) {
    if (index > 0 && index === this.size) {
      return this.addAtTail(val);
    }
    if (!this.checkPositionIndex(index)) return;

    const toAdd = new ListNode(val);
    const oldNode = this.getNode(index);
    this.size++;

    const _prev = oldNode.prev;

    _prev.next = toAdd;
    toAdd.prev = _prev;

    oldNode.prev = toAdd;
    toAdd.next = oldNode;
  }
  deleteHead() {
    return this.deleteAtIndex(0);
  }
  deleteTail() {
    return this.deleteAtIndex(this.size - 1);
  }
  deleteAtIndex(index) {
    if (this.size === 0) return;
    if (!this.checkInvalidIndex(index)) return;

    const toDelete = this.getNode(index);
    const _prev = toDelete.prev;
    const _next = toDelete.next;

    toDelete.prev.next = _next;
    toDelete.next.prev = _prev;
    this.size--;
    return toDelete.val;
  }
  getNode(index) {
    if (this.size === 0 && index === 0 ) {
      return this.head.next
    }
    if (index === this.size) {
      return this.tail
    }
    if (!this.checkInvalidIndex(index)) {
      return null;
    }
    let cur = this.head.next;
    if (index <= this.size / 2) {
      for (let i = 0; i < index; i++) {
        cur = cur.next;
      }
    } else {
      cur = this.tail.prev;
      for (let i = this.size - 1; i > index; i--) {
        cur = cur.prev;
      }
    }

    return cur;
  }
  size() {
    return this.size;
  }
  isEmpty() {
    return this.size === 0;
  }
  checkInvalidIndex(index) {
    return index >= 0 && index < this.size
  }
  checkPositionIndex(index) {
    return index >= 0 && index <= this.size
  }
  print(key) {
    let str = "";
    let cur = this.head.next;
    while (cur !== this.tail) {
      str += cur.val + "<->";
      cur = cur.next;
    }
    console.log("size", this.size);
    console.log("print:" + key + "\n", str + "\n");
  }
}

// const myLinkedList = new MyLinkedList();
// console.log('addAtHead-0')
// myLinkedList.addAtHead(0)
// myLinkedList.print("11111");


// console.log('addAtIndex-1-1')
// myLinkedList.addAtIndex(1, 1)
// myLinkedList.print("22222");

// console.log('get-2', myLinkedList.get(2));
// console.log('\n')

// console.log('addAtHead-4')
// myLinkedList.addAtHead(4)
// myLinkedList.print("333333");

// console.log('get-2', myLinkedList.get(2));
// console.log('\n')

// console.log('addAtHead-4')
// myLinkedList.addAtHead(4)
// myLinkedList.print("44444");


// console.log('get-2', myLinkedList.get(2));
// console.log('\n')

// console.log('get-3', myLinkedList.get(3));
// console.log('\n')



// console.log('addAtIndex-1-6')
// myLinkedList.addAtIndex(1, 6)
// myLinkedList.print("5555555");



// console.log('addAtTail-1')
// myLinkedList.addAtTail(1)
// myLinkedList.print("66666");

// console.log('addAtHead-0')
// myLinkedList.addAtHead(0)
// myLinkedList.print("7777777");


