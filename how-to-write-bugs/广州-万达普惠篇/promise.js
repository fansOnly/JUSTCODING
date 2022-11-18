// promise 执行输出
const promise1 = new Promise((resolve, reject) => {
    const promise2 = new Promise((resolve, reject) => {
        // throw new Error('111') // => reject => catch
        resolve()
    })
    resolve(promise2);
})


promise1.then(val => {
    console.log('promise1 - then', val)
});

promise1.catch(err => {
    console.log('promise1 catch', err)
})

const resovle1 = Promise.resolve(3);

const then1 = resovle1.then(val => {
    console.log('then1', val)
    return val;
})

console.log(then1)

setTimeout(() => {
    console.log(then1)
}, 0)



var p2 = new Promise(function(resolve, reject) {
    resolve(1);
  });
  
  p2.then(function(value) {
    console.log('a', value); // 1
    return value + 1;
  }).then(function(value) {
    console.log(value + ' - A synchronous value works');
  });

  const p3 = new Promise((resolve, reject) => {
    resolve('f')
})

p3.then(val => {
    console.log(val)
})
  
  p2.then(function(value) {
    setTimeout(() => {
        const promise2 = new Promise((resolve, reject) => {
            // throw new Error('111') // => reject => catch
            resolve('e')
        })
        console.log('d')

        promise2.then(val => {
            console.log(val)
        })
    }, 1001)
    console.log('b',value); // 1
  });

  setTimeout(() => {
    console.log('c')
})