const list = [
  { id: 1, name: 'Node 1', parent_id: null },
  { id: 2, name: 'Node 2', parent_id: 1 },
  { id: 3, name: 'Node 3', parent_id: 1 },
  { id: 4, name: 'Node 4', parent_id: 2 },
  { id: 5, name: 'Node 5', parent_id: 2 },
  { id: 6, name: 'Node 6', parent_id: 3 },
  { id: 7, name: 'Node 7', parent_id: 3 },
  { id: 8, name: 'Node 8', parent_id: 4 }
];


const listToTree = (arr=[]) => {
  let res = []
  for (let i = 0; i < arr.length; i++) {
    const parent = list.find(item => item.id === arr[i].parent_id)
    if (parent) {
      parent.children = parent.children || []
      parent.children.push(arr[i])
    } else {
      res.push(arr[i])
    }
  }

  return res
}

const listToTreeBetter = (arr =[]) => {
  let res = [];
  let map = {};
  arr.forEach(item => {
    map[item.id] = item
  })
  arr.forEach(item => {
    const parent = map[item.parent_id]
    if (parent) {
      parent.children = parent.children || []
      parent.children?.push(item)
    } else {
      res.push(item)
    }
  })

  return res
}



const listToTreeRecursive = (arr=[], parentId = null) => {
  let res = []
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].parent_id === parentId) {
      const node = {
        id: arr[i].id,
        name: arr[i].name,
        children: listToTreeRecursive(arr, arr[i].id)
      }

      res.push(node)
    }
  }

  return res
}

console.time('default')
const t1 = listToTree(list)
// console.log('t1: ', JSON.stringify(t1));
console.timeEnd('default')

console.time('better')
const t2 = listToTreeBetter(list)
// console.log('t2: ', JSON.stringify(t2));
console.timeEnd('better')


console.time('recursive')
const t3 = listToTreeRecursive(list)
console.log('t3: ', JSON.stringify(t3));
console.timeEnd('recursive')