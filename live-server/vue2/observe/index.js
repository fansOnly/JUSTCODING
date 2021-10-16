import { observe } from './Observe.js'
import Watcher from './Watcher.js'


const obj = {
  a: 1,
  b: {
    c: {
      d: 5
    }
  },
  g: [1,2,3, 4]
}

observe(obj)


new Watcher(obj, 'b.c.d', newVal => {
  console.log('watcher::', newVal)
})

// console.log(obj)
obj.b.c.d = 100
