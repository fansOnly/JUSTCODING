/**
 * 二叉搜索树
 * 定义
 * 1. 空树
 * 2. 非空树
 * 2.1 非空左子树的所有键值小于其根节点的键值
 * 2.2 非空右子树的所有键值大于其根节点的键值
 * 2.3 左、右子树也是二叉搜索树
 * 
 * 特点
 * 1. 有序
 * 
 * 名词解释
 * 1.前驱：比当前节点小一点点的节点，左子树的最大值
 * 2.后继：比当前节点大一点点的节点，右子树的最小值
 * 
 * 缺陷 - 如何使插入的数据均匀分布
 * 1. 平衡二叉树：O(logN)
 * 2. 非平衡二叉树：O(N)，类似链表结构
 * 
 * 平衡二叉树
 * 1. AVL 树
 * 2. 红黑树
 */
class Node {
  constructor(key) {
    this.key = key
    this.left = null
    this.right = null
  }
}

class BinarySearchTree {
  constructor() {
    this.root = null
  }

  // 插入键
  insert(key) {
    const node = new Node(key)
    if (!this.root) {
      this.root = node
    } else {
      this.insertNode(this.root, node)
    }
  }
  insertNode(node, newNode) {
    if (newNode.key < node.key) {
      // 向左
      if (!node.left) {
        node.left = newNode
      } else {
        this.insertNode(node.left, newNode)
      }
    } else {
      // 向右
      if (!node.right) {
        node.right = newNode
      } else {
        this.insertNode(node.right, newNode)
      }
    }
  }
  // insert(key) {
  //   const node = new Node(key)
  //   if (!this.root) {
  //     this.root = node
  //   } else {
  //     let current = this.root
  //     while (current) {
  //       if (key > current.key) {
  //         if (!current.right) {
  //           return (current.right = node)
  //         }
  //         current = current.right
  //       } else if (key < current.key) {
  //         if (!current.left) {
  //           return (current.left = node)
  //         }
  //         current = current.left
  //       }
  //     }
  //   }
  // }
  // 查找键
  search(key) {
    const node = new Node(key)
    return this.searchNode(this.root, node)
  }
  searchNode(node, newNode) {
    if (!node) return null
    if (newNode.key < node.key) {
      return this.searchNode(node.left, newNode)
    } else if (newNode.key > node.key) {
      return this.searchNode(node.right, newNode)
    } else {
      return node
    }
  }
  /**
   * 删除键
   * 1. 删除根节点
   * 2. 删除非叶子节点
   * 2.1 子节点有一个字节点
   * 2.2 字节点右两个字节点
   * 3. 删除叶子节点
   */
  remove(key) {
    let current = this.root
    let parent = null
    let isLeft = true

    // 找到要删除节点
    while (current.key !== key) {
      parent = current
      if (key < current.key) {
        current = current.left
        isLeft = true
      } else {
        current = current.right
        isLeft = false
      }

      if (!current) return false
    }

    // 删除叶子节点
    if (this.isLeaf(current)) {
      // 删除根节点
      if (current === this.root) {
        this.root = null
        return true
      } else if (isLeft) {
        parent.left = null
      } else {
        parent.right = null
      }
    } else if (!current.left || !current.right) {
      // 删除字节点，具有一个字节点
      if (current === this.root) {
        this.root = current.left || current.right
      } else if (isLeft) {
        parent.left = current.left || current.right
      } else {
        parent.right = current.left || current.right
      }
    } else {
      /**
       * 删除字节点，具有两个字节点
       * 删除后，后续节点需要替换处理，一下二选其一，默认使用后继节点
       * 1. 前驱，比当前节点小一点点的节点，左子树的最大节点
       * 2. 后继，比当前节点大一点点的节点，右子树的最小节点
       */
      const succeedNode = this.getSucceedNode(current)
      console.log('succeedNode: ', succeedNode)
      // 1. 将后继节点指向当前删除节点的父节点的 左/右 子节点
      if (this.root === current) {
        this.root = succeedNode
      } else if (isLeft) {
        parent.left = succeedNode
      } else {
        parent.right = succeedNode
      }
      // 2. 将当前删除节点的左子节点指向后继节点的左子节点
      succeedNode.left = current.left
    }
  }
  // 查找后继节点
  getSucceedNode(delNode) {
    let succeedNode = delNode
    let succeedParentNode = delNode
    let current = delNode.right
    while (current) {
      succeedParentNode = succeedNode
      succeedNode = current
      current = current.left
    }

    // 如果后继节点
    // 1. 是删除节点的直接右子节点，直接替换删除节点
    // 2. 不是删除节点的直接右子节点，将删除节点的右子节点指向后继节点的右子节点
    // 2.1 如果是叶子节点，直接替换删除节点
    // 2.2 如果是非叶子节点，将其右子节点（只能有右子节点）改为其父节点的左子节点
    if (succeedNode !== delNode.right) {
      succeedParentNode.left = succeedNode.right
      succeedNode.right = delNode.right
    }
    return succeedNode
  }
  /**
   * 中序遍历
   * 1. 左子树
   * 2. 根节点
   * 3. 右子树
   */
  inOrderTraverse(cb) {
    this.inOrderTraverseNode(this.root, cb)
  }
  inOrderTraverseNode(node, cb) {
    if (node) {
      this.inOrderTraverseNode(node.left, cb)
      cb(node)
      this.inOrderTraverseNode(node.right, cb)
    }
  }
  /**
   * 先序遍历
   * 1. 根节点
   * 2. 左子树
   * 3. 右子树
   */
  preOrderTraverse(cb) {
    this.preOrderTraverseNode(this.root, cb)
  }
  preOrderTraverseNode(node, cb) {
    if (node) {
      cb(node)
      this.preOrderTraverseNode(node.left, cb)
      this.preOrderTraverseNode(node.right, cb)
    }
  }
  /**
   * 后序遍历
   * 1. 左子树
   * 2. 右子树
   * 3. 根节点
   */
  postOrderTraverse(cb) {
    this.postOrderTraverseNode(this.root, cb)
  }
  postOrderTraverseNode(node, cb) {
    if (node) {
      this.postOrderTraverseNode(node.left, cb)
      this.postOrderTraverseNode(node.right, cb)
      cb(node)
    }
  }
  // 最小的键 / 值
  min() {
    let current = this.root
    let key = null
    while (current) {
      key = current.key
      current = current.left
    }
    return key
  }
  // 最大的键 / 值
  max() {
    let current = this.root
    let key = null
    while (current) {
      key = current.key
      current = current.right
    }
    return key
  }

  // 是否叶子节点
  isLeaf(node) {
    return !node.left && !node.right
  }
}

const bst = new BinarySearchTree()
bst.insert(11)
bst.insert(7)
bst.insert(5)
bst.insert(3)
bst.insert(9)
bst.insert(8)
bst.insert(15)
bst.insert(13)
bst.insert(10)
bst.insert(20)
bst.insert(12)
bst.insert(14)
bst.insert(18)
bst.insert(25)
bst.insert(19)
// console.log(bst)

// let bstString = ''
// bst.preOrderTraverse((node) => {
//   bstString += node.key + '-'
// })
// bst.inOrderTraverse((node) => {
//   bstString += node.key + '-'
// })
// bst.postOrderTraverse((node) => {
//   bstString += node.key + '-'
// })
// console.log(bstString)


// console.log(bst.min())
// console.log(bst.max())


// console.log(bst.search(11))

bst.remove(15)
console.log(bst.search(20))
