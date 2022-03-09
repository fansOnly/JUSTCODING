/*
 * @Author: fansonly
 * @Date: 2022-03-04 16:10:07
 * @Description:
 * @LastEditTime: 2022-03-04 16:12:33
 */

const fn = n => new Promise(resolve => {
  setTimeout(() => {
    resolve(n)
  }, 1000);
})
const arr = [fn(1), fn(2), fn(4), fn(3)]

const run = async () => {
  for await (num of arr) {
    console.log(num)
  }
}

run()
