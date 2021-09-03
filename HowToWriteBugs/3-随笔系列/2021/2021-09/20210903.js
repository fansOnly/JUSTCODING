/*
 * @Author: fansonly
 * @Date: 2021-09-03 09:33:23
 * @Description:
 * @LastEditTime: 2021-09-03 17:14:08
 */
/**
 * 冒泡排序的思路：遍历数组，然后将最大数沉到最底部；
时间复杂度：O(N^2)；
空间复杂度：O(1)
 */
const bubbleSort = (arr = []) => {
  if (arr.length < 2) return arr
  for (let i = arr.length - 1; i > 0; i--) {
    for (let j = 0; j < i; j++) {
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j+1]] = [arr[j+1], arr[j]]
      }
    }
  }
  return arr
}

console.log(bubbleSort([1,6,9,3,5,62,567,9,3]))


/**
 * 选择排序
 * 选择排序的实现思路：遍历数组，把最小数放在头部；
时间复杂度：O(N^2)；
空间复杂度：O(1)
 */
const selectionSort = (arr = []) => {
  if (arr.length < 2) return arr
  for (let i  = 0; i < arr.length -1; i++) {
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[j] < arr[i]) {
        [arr[i], arr[j]] = [arr[j], arr[i]]
      }
    }
  }
  return arr
}
console.log(selectionSort([1,6,9,3,5,62,567,9,3]))

const selectionSort2 = (arr = []) => {
  if (arr.length < 2) return arr
  for (let i = 0; i < arr.length - 1; i++) {
    let minIdx = i
    for (let j = i + 1; j < arr.length; j++) {
      minIdx = arr[j] < arr[minIdx] ? j : minIdx
    }
    if (minIdx !== i) {
      [arr[minIdx], arr[i]] = [arr[i], arr[minIdx]]
    }
  }
  return arr
}
console.log(selectionSort2([1,6,9,3,5,62,567,9,3]))




/**
 * 三、插入排序
 * 将元素插入到已排好的数组中
 * 空间复杂度 O(1)
 * 时间复杂度 O(n^2)
 */
const insertSort = (arr = []) => {
  if (arr.length < 2) return arr
  for (let i = 1; i < arr.length; i++) {
    for (let j = i; j > 0; j--) {
      if (arr[j] < arr[j - 1]) {
        [arr[j], arr[j - 1]] = [arr[j - 1], arr[j]]
      }
    }
  }
  return arr
}

console.log(insertSort([1,6,9,3,5,62,567,9,3]))




/**
 * 快速排序实现思路：随机取出一个值进行划分，大于该值放右边，小于该值放左边（该算法在经典快排的基础上经过荷兰国旗思想和随机思想进行了改造）
时间复杂度：O(N*logN)
空间复杂度：O(logN)
 */
const quickSort = (arr = []) => {
  if (arr.length < 2) return arr
  const mid = arr.length >> 1
  const pivot = arr[mid]
  const left = [], right = []
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] < pivot || (arr[i] === pivot && i !== mid)) {
      left.push(arr[i])
    } else if (arr[i] > pivot) {
      right.push(arr[i])
    }
  }
  return [...quickSort(left), pivot, ...quickSort(right)]
}
console.log(quickSort([1,6,9,3,5,62,567,9,3]))


/**
 * new
 */
function myNew(Ctor, ...args) {
  // const obj = Object.create(Ctor.prototype)
  const obj = {}
  Object.setPrototypeOf(obj, Ctor.prototype)
  const res = Ctor.apply(obj, args)
  return typeof res === 'object' && res !== null ? res : obj
}


/**
 * instanceof
 */
const instance = (target, Ctro) => {
  if (target === null) return false
  let proto = target.__proto__
  while (proto) {
    if (proto === Ctro.prototype) return true
    proto = proto.__proto__
  }
  return false
}
console.log(instance({}, Object))


/**
 * create
 */
const myCreate = target => {
  function F() {}
  F.prototype = target
  return new F()
}
function P() {}
var o = new P()
var r = myCreate(o)
console.log(r)


/**
 * flat
 */
const flat = arr => {
  return arr.toString().split(',').map(v => +v)
}

console.log(flat([1,2,[3,4,[5,[6]],8],9]))




/**
 * async
 */
 function run(genF) {
  // 返回值是Promise
  return new Promise((resolve, reject) => {
      const gen = genF();
      function step(nextF) {
          let next;
          try {
              // 执行该函数，获取一个有着value和done两个属性的对象
              next = nextF();
          } catch (e) {
              // 出现异常则将该Promise变为rejected状态
              reject(e);
          }

          // 判断是否到达末尾，Generator函数到达末尾则将该Promise变为fulfilled状态
          if (next.done) {
              return resolve(next.value);
          }

          // 没到达末尾，则利用Promise封装该value，直到执行完毕，反复调用step函数，实现自动执行
          Promise.resolve(next.value).then((v) => {
              step(() => gen.next(v))
          }, (e) => {
              step(() => gen.throw(e))
          })
      }

      step(() => gen.next(undefined));
  })
}



/**
 * uploadMulFile
 */
function uploadMulFile(uploadFile) {
  return new Promise((resolve, reject) => {
      let fileLength = 0;
      let reader = new FileReader();
      reader.readAsText(uploadFile[fileLength]);
      reader.onabort = function(e) {
          console.log("文件读取异常");
      }
      reader.onerror = function(e) {
          console.log("文件读取错误");
      }

      reader.onload = function(e){
          if(e.target.result) {

              fileLength++;
              if(fileLength < uploadFile.length) {
                  reader.readAsText(uploadFile[fileLength]);
              }else{
                  resolve({
                      carArr,
                      crossArr,
                      roadArr
                  })
              }
          }
      }
  })
}
