class Dictionary {
  constructor() {
    this.items = {}
  }
  set(key, value) {
    this.items[key] = value
  }
  has(key) {
    return this.items.hasOwnProperty(key)
  }
  remove(key) {
    if (!this.has(key)) return false
    delete this.items[key]
    return true
  }
  get(key) {
    return this.has(key) ? this.items[key] : undefined
  }
  keys() {
    return Object.keys(this.items)
  }
  values() {
    return Object.values(this.items)
  }
  size() {
    return this.keys().length
  }
  clear() {
    this.items = {}
  }
}

class Queue {
  constructor() {
    this.items = []
  }

  enqueue(item) {
    this.items.push(item)
  }
  dequeue() {
    return this.items.shift()
  }
  front() {
    return this.items[0]
  }
  isEmpty() {
    return this.items.length === 0
  }
  size() {
    return this.items.length
  }
  toString() {
    let res = ''
    for (let i = 0; i < this.items.length; i++) {
      res += `${this.items[i]} `
    }
    return res
  }
}


/**
 * 临接表，类似哈希表
 * 1. 出度，指向别人的数量
 * 2. 入度，指向自己的数量
 */
class Graph {
  constructor() {
    // 存储顶点
    this.vertexes = []
    // 存储边
    this.edges = new Dictionary()
  }

  addVertex(v) {
    this.vertexes.push(v)
    this.edges.set(v, [])
  }
  addEdge(v1, v2) {
    // 无向图，双向添加
    this.edges.get(v1).push(v2)
    this.edges.get(v2).push(v1)
  }
  /**
   * 1. 广度优先遍历 - BFS
   */
  bfs(initVertex, cb) {
    const colors = this.initColor()
    const queue = new Queue()
    queue.enqueue(initVertex)
    while (!queue.isEmpty()) {
      const current = queue.dequeue()
      const nearList = this.edges.get(current)
      colors[current] = 'gray'
      for (let i = 0; i < nearList.length; i++) {
        const target = nearList[i]
        if (colors[target] === 'white') {
          colors[target] = 'gray'
          queue.enqueue(target)
        }
      }
      cb(current)
      colors[current] = 'black'
    }
  }
  /**
   * 2. 深度优先遍历 - DFS
   */
  dfs(initVertex, cb) {
    const colors = this.initColor()
    this.dfsErgodic(initVertex, colors, cb)
  }
  dfsErgodic(vertex, colors, cb) {
    colors[vertex] = 'gray'
    cb(vertex)
    const nearList = this.edges.get(vertex)
    for (let i = 0; i < nearList.length; i++) {
      const target = nearList[i]
      if (colors[target] === 'white') {
        this.dfsErgodic(target, colors, cb)
      }
    }
    colors[vertex = 'black']
  }
  initColor() {
    let colors = {}
    for (let i = 0; i < this.vertexes.length; i++) {
      colors[this.vertexes[i]] = 'white'
    }
    return colors
  }
  toString() {
    let res = ''
    for (let i = 0; i < this.vertexes.length; i++) {
      const v = this.vertexes[i]
      const e = this.edges.get(v)
      res += `${v} -> ${e.join(', ')}\n`
    }
    return res
  }
}

const graph = new Graph()
const vertexes = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I']
vertexes.forEach(item => {
  graph.addVertex(item)
})
graph.addEdge('A', 'B')
graph.addEdge('A', 'C')
graph.addEdge('A', 'D')
graph.addEdge('C', 'D')
graph.addEdge('C', 'G')
graph.addEdge('D', 'G')
graph.addEdge('D', 'H')
graph.addEdge('B', 'E')
graph.addEdge('B', 'F')
graph.addEdge('E', 'I')

// console.log(graph)
console.log(graph.toString())

let str = ''
graph.bfs(graph.vertexes[0], (item) => {
  str += `${item} `
})
console.log('广度优先遍历')
console.log(str)

str = ''
graph.dfs(graph.vertexes[0], (item) => {
  str += `${item} `
})
console.log('深度优先遍历')
console.log(str)
