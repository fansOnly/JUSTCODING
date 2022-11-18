/*
 * @Author: fansonly
 * @Date: 2021-08-23 09:58:12
 * @Description:
 * @LastEditTime: 2021-08-23 16:54:19
 */
function xss(str){
  return str?str.replace(/(?:^$|[\x00\x09-\x0D "'`=<>])/g,(m)=>{
      return m === '\t'   ? '&#9;'
          :  m === '\n'   ? '&#10;'
          :  m === '\x0B' ? '&#11;'
          :  m === '\f'   ? '&#12;'
          :  m === '\r'   ? '&#13;'
          :  m === ' '    ? '&#32;'
          :  m === '='    ? '&#61;'
          :  m === '<'    ? '&lt;'
          :  m === '>'    ? '&gt;'
          :  m === '"'    ? '&quot;'
          :  m === "'"    ? '&#39;'
          :  m === '`'    ? '&#96;'
          : '\uFFFD';
  }):''
}





class EventEmitter {
  constructor(){
    this.events = new Map()
  }
  // 监听事件
  on(name, fn){
    const cb = this.events.get(name)
    if (cb) {
      this.events.set(name, [...cb, fn])
    } else {
      this.events.set(name, [fn])
    }
  }
  // 触发事件
  emit(name, ...args){
    const cb = this.events.get(name)
    if (cb) {
      cb.forEach(fn => fn(...args))
    }
  }
  // 只监听一次，下次emit不会触发
  once(name, fn){
    const onceFn = () => {
      fn()
      this.off(name, onceFn)
    }
    this.on(name, onceFn)
  }
  // 移除事件
  off(name, fn){
    const cb = this.events.get(name)
    if (cb.length == 1) {
      this.events.delete(name)
    } else if (cb.length > 1) {
      this.events.set(name, cb.filter(v => v !== fn))
    }
  }
}
const events = new EventEmitter();
events.on('hobby', (...argu) => {
  console.log('打游戏', ...argu);
})
let eat = () => {
  console.log('吃');
}
events.once('hobby', eat);
events.on('hobby', (...argu) => {
  console.log('逛街', ...argu);
})

events.off('hobby', eat);
events.emit('hobby', 1,2,3);
events.on('hello', (...args) => {
  console.log(...args)
})
events.emit('hello', 'susan')
//打游戏 1 2 3
// 逛街 1 2 3


/**
 * (滴滴)两数之和
 */
var twoSum = (nums, target) => {
  const { length } = nums
  const map = new Map()
  for (let i = 0; i < length; i++) {
    if (map.has(target - nums[i])) {
      return [map.get(target - nums[i]), i]
    } else {
      map.set(nums[i], i)
    }
  }
}
console.log(twoSum([2,7,11,15], 9))



/**
 * (字节)无重复最长子串
 */
var lengthOfLongestSubstring = function(s) {
  let arr = []
  let max = 0
  for (let i = 0; i < s.length; i++) {
    const index = arr.indexOf(s[i])
    if (index > -1) {
      arr.splice(index, 1)
    }
    arr.push(s.charAt(i))
    max = Math.max(arr.length, max)
  }
  return max
}


/**
 * 大数相加
 */
function bigNumberAdd(a, b) {
  const max = Math.max(String(a).length, String(b).length)
  a = String(a).padStart(max, '0')
  b = String(b).padStart(max, '0')
  let res = ''
  let sum = 0 // 同位相加之和
  let t = 0 // 十位
  let r = 0 // 个位
  for (let i = max - 1; i >= 0; i--) {
    sum = parseInt(a[i]) + parseInt(b[i]) + t
    t = Math.floor(sum / 10)
    r = sum % 10
    res = r + res
  }
  return res
}

console.log(bigNumberAdd('123456789012345678', 1))



/***
 * (滴滴)扁平化数组
 */
 function flat(arr, depth = 1) {
  return arr.reduce((acc, cur) => acc.concat(depth > 0 && Array.isArray(cur) ? flat(cur, depth - 1) : cur), [])
}

console.log(flat([1,2,3,[4,5,[6,7,[8]], 10]], 2))



/**
 * 实现new Queue类
 */
function sleep(delay, fn) {
  return new Promise(resolve => {
    setTimeout(() => {
      fn()
      resolve()
    }, delay);
  })
}

class Queue {
  constructor() {
    this.listeners = []
  }
  task(delay, fn) {
    this.listeners.push(() => sleep(delay, fn))
    return this
  }
  async start() {
    for (let fn of this.listeners) {
      await fn()
    }
  }
}

// new Queue()
// .task(1000,()=>console.log(1))
// .task(2000,()=>console.log(2))
// .task(3000,()=>console.log(3)).start();

