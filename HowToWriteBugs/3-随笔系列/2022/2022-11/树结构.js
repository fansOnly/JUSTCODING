let tree = [
  {
    id: '1',
    title: '节点1',
    children: [
      {
        id: '1-1',
        title: '节点1-1',
        flag: true
      },
      {
        id: '1-2',
        title: '节点1-2'
      }
    ]
  },
  {
    id: '2',
    title: '节点2',
    children: [
      {
        id: '2-1',
        title: '节点2-1',
        flag: true
      }
    ]
  }
]

// 广度优先遍历
// function treeForEach(tree, cb) {
//   let node
//   const list = [...tree]
//   while (node = list.shift()) {
//     cb(node)
//     node.children && list.push(...node.children)
//   }
// }
// console.log('===== 广度优先遍历 =====')

// 深度优先 - 先序遍历 - 递归
// function treeForEach(tree, cb) {
//   tree.forEach(node => {
//     cb(node)
//     node.children && treeForEach(node.children, cb)
//   })
// }
// console.log('===== 深度优先 - 先序遍历 =====')

// 深度优先 - 先序遍历 - 循环
// function treeForEach(tree, cb) {
//   let node
//   const list = [...tree]
//   while (node = list.shift()) {
//     cb(node)
//     node.children && list.unshift(...node.children)
//   }
// }
// console.log('===== 深度优先 - 先序遍历 =====')

// 深度优先 - 后序遍历 - 递归
// function treeForEach(tree, cb) {
//   tree.forEach(node => {
//     node.children && treeForEach(node.children, cb)
//     cb(node)
//   })
// }
// console.log('===== 深度优先 - 后序遍历 =====')

// 深度优先 - 后序遍历 - 循环
// function treeForEach(tree, cb) {
//   let node
//   let i = 0
//   const list = [...tree]
//   while (node = list[i]) {
//     const count = node.children ? node.children.length : 0
//     if (!count || node.children[count - 1] === list[i - 1]) {
//       cb(node)
//       i++
//     } else {
//       list.splice(i, 0, ...node.children)
//     }
//   }
// }
// console.log('===== 深度优先 - 后序遍历 =====')
// treeForEach(tree, node => console.log(node.title))

// 查找节点
// function treeFind(tree, cb) {
//   if (!tree) return null
//   for (const node of tree) {
//     if (cb(node)) return node
//     if (node.children) {
//       const cNode = treeFind(node.children, cb)
//       if (cNode) return cNode
//     }
//   }
//   return null
// }

// const res1 = treeFind(tree, node => node.id === '2-1')
// console.log('查找节点: ', res1);

// 查找节点路径
// function treeFindPath(tree, cb, path = []) {
//   if (!tree) return []
//   for (const node of tree) {
//     path.push(node.id)
//     if (cb(node)) return path
//     if (node.children) {
//       const cPath = treeFindPath(node.children, cb, path)
//       if (cPath.length) return cPath
//     }
//     path.pop()
//   }
//   return []
// }

// const res2 = treeFindPath(tree, node => node.id === '2-1')
// console.log('查找节点路径: ', res2);


// 查找多条节点路径
// function treeFindPath(tree, cb, path = [], result = []) {
//   if (!tree) return []
//   for (const node of tree) {
//     path.push(node.id)
//     if (cb(node)) result.push([...path])
//     if (node.children) treeFindPath(node.children, cb, path, result)
//     path.pop()
//   }
//   return result
// }

// const res3 = treeFindPath(tree, node => node.flag)
// console.log('查找节点路径: ', res3);

// 树转为列表
// function treeToList(tree) {
//   let list = []
//   for (const node of tree) {
//     if (node.children) {
//       list.push(node, ...treeToList(node.children))
//     } else {
//       list.push(node)
//     }
//   }
//   return list
// }

// const res4 = treeToList(tree)
// console.log('树转为列表: ', res4);


// 树结构筛选
function treeFilter(tree, cb) {
  if (!tree) return []
  return tree.filter(node => {
    node.children = node.children && treeFilter(node.children, cb)
    return cb(node) || (node.children && node.children.length)
  })
}

const res5 = treeFilter(tree, node => node.flag)
console.log('树结构筛选: ', res5);
