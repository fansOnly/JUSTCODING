


/**
 * 实现一个函数，返回一个数组
 * 数组里面是 2 ～ 32 之间的随机数，不能重复
 * 接收一个参数，可以控制返回数组的长度
 */
const createArr = len => {
  const arr = Array.from({ length: 30 }, (_, i) => i + 2)
  const res = []
  while (res.length < len) {
    const index = ~~(Math.random() * arr.length)
    res.push(arr[index])
    arr.splice(index, 1)
  }
  return res
}


console.log(createArr(10))
