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

// 单链表实现 MyLinkedList 类
class Node {
  constructor(val) {
    this.val = val;
    this.next = null;
  }
}

class MyLinkedList {
  constructor() {
    this.head = new Node(null);
    this.head.next = null
    this.size = 0;
  }
  get(index) {
    const node = this.getNode(index);
    return node !== null ? node.val : -1
  }
  getHead() {
    if (this.isEmpty()) {
      return null;
    }
    return this.head.next.val;
  }
  getTail() {
    if (this.isEmpty()) {
      return null;
    }
    const tail = this.getNode(this.size - 1)
    return tail.val;
  }
  set(index, val) {
    if (!this.checkInvalidIndex(index)) return;
    const cur = this.getNode(index);
    const oldVal = cur.val;
    cur.val = val;
    return oldVal;
  }
  addAtHead(val) {
    const head = new Node(val);
    const temp = this.head.next;
    head.next = temp;

    this.head.next = head;
    this.size++;
  }
  addAtTail(val) {
    const newNode = new Node(val);
    const tail = this.getNode(this.size - 1)
    if (tail) {
      tail.next = newNode
    } else {
      this.head.next = newNode
    }

    this.size++;
  }
  addAtIndex(index, val) {
    if (!this.checkPositionIndex(index)) return;
    if (index === this.size) {
      this.addAtTail(val);
      return;
    }

    const newNode = new Node(val);
    const target = this.getNode(index);
    const prev = this.getNode(index - 1);

    if (prev) {
      prev.next = newNode;
    } else {
      this.head.next = newNode
    }
    newNode.next = target

    this.size++;
  }
  deleteHead() {
    if (this.isEmpty()) {
      return null;
    }
    let head = this.head.next;
    const _head = head.next;
    this.head.next = _head;

    this.size--;
    return head.val;
  }
  deleteTail() {
    if (this.isEmpty()) {
      return null;
    }

    const oldTail = this.getNode(this.size - 1)
    const newTail = this.getNode(this.size - 2)
    if (newTail) {
      newTail.next = null
    } else {
      this.head.next = null;
    }

    this.size--;
    return oldTail.val
  }
  deleteAtIndex(index) {
    if (this.isEmpty()) return;
    if (!this.checkInvalidIndex(index)) return;

    const target = this.getNode(index);
    const _next = target.next

    const prev = this.getNode(index - 1);
    if (prev) {
      prev.next = _next;
    } else {
      this.head.next = _next;
    }

    this.size--;
    return target.val;
  }
  getNode(index) {
    if (!this.checkInvalidIndex(index)) {
      return null
    }
    let cur = this.head.next;
    for (let i = 0; i < index; i++) {
      cur = cur.next;
    }

    return cur;
  }
  size() {
    return this.size;
  }
  isEmpty() {
    return this.size === 0;
  }
  checkPositionIndex(index) {
    if (index < 0 || index > this.size) {
      console.log("invalid position index", index);
      return false;
    }
    return true;
  }
  checkInvalidIndex(index) {
    if (index < 0 || index >= this.size) {
      console.log("invalid index", index);
      return false;
    }
    return true;
  }
  print(key) {
    let str = "";
    let cur = this.head.next;
    while (cur !== null) {
      str += cur.val + "<->";
      cur = cur.next;
    }
    console.log("size", this.size);
    console.log("print:" + key + "\n", str + "\n");
  }
}

// ["MyLinkedList","addAtHead","addAtIndex","get","addAtHead","get","addAtHead","get","get","addAtIndex","addAtTail","addAtHead"]
// [[],[0],[1,1],[2],[4],[2],[4],[2],[3],[1,6],[1],[0]]

const myLinkedList = new MyLinkedList();
myLinkedList.addAtHead(0);
myLinkedList.addAtIndex(1, 1);
myLinkedList.print("11111");
console.log(myLinkedList.get(2));
myLinkedList.addAtHead(4);
myLinkedList.print("2222");
console.log(myLinkedList.get(2));
myLinkedList.addAtHead(2);
myLinkedList.print("33333");
console.log(myLinkedList.get(2));
console.log(myLinkedList.get(3));
myLinkedList.addAtIndex(1, 6);
myLinkedList.addAtTail(1);
myLinkedList.addAtHead(0);
myLinkedList.print("4444444");
