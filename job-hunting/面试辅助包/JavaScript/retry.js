/**
 * 函数重试
 * @param {*} fn 
 * @param {*} count 次数
 * @param {*} delay 重试延迟
 * @returns 
 */
function retry(fn, count, delay) {
  return new Promise((resolve, reject) => {
    function execute() {
      Promise.resolve(fn).then(res => {
        console.log('res: ', res)
        resolve(res)
      }).catch(err => {
        if (count > 0) {
          setTimeout(execute, delay)
          count--
        } else {
          reject(err)
          console.log('err: ', err)
        }
      })
    }
    execute()
  })
}

const r = Promise.reject('fail')
const err = retry(r, 3, 1000)

const r2 = Promise.resolve('success')
const res = retry(r2, 3, 1000)
