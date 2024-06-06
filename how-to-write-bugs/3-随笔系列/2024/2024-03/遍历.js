const rootNode = {
  value: 1,
  children: [
    {
      value: 2,
      children: [
        {
          value: 3,
          children: []
        },
        {
          value: 4,
          children: []
        }
      ]
    },
    {
      value: 5,
      children: []
    }
  ]
}

const depthFirstSearch = (node) => {
  console.log(node.value)
  for (let item of node.children) {
    depthFirstSearch(item)
  }
}

console.log('深度优先遍历 start::')
depthFirstSearch(rootNode)
console.log('深度优先遍历 end::')



const breadthFirstSearch = (node) => {
  const queue = [node]
  while (queue.length) {
    const current = queue.shift();
    console.log(current.value)

    current.children.forEach(item => {
      queue.push(item)
    })
  }
}

console.log('广度优先遍历 start::')
breadthFirstSearch(rootNode)
console.log('广度优先遍历 end::')