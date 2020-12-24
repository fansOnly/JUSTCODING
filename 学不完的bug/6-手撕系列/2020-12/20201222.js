/**
 * 海康威视笔试题
 * 红灯3秒亮一次，绿灯1秒亮一次，黄灯2秒亮一次；如何使用Promise让三个灯不断交替重复亮灯？
 * 红灯亮过后，绿灯才能亮，绿灯亮过后，黄灯才能亮，黄灯亮过后，红灯才能亮
 */
function red() {
    console.log('red', new Date())
}
function green() {
    console.log('green', new Date())
}
function yellow() {
    console.log('yellow', new Date())
}

const light = (cb, delay) => {
    return new Promise(resolve => {
        setTimeout(() => {
            cb()
            resolve()
        }, delay);
    })
}

const lightUp = () => {
    Promise.resolve()
    .then(() => {
        return light(red, 1000)
    })
    .then(() => {
        return light(green, 1000)
    }).then(() => {
        return light(yellow, 1000)
    }).then(() => {
        lightup()
    })
}
// lightUp()



/**
 * 请实现一个mergePromise函数，把传进去的数组按顺序先后执行，并且把返回的数据先后放到数组data中
 */
const timeout = ms => new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve();
    }, ms);
});

const ajax1 = () => timeout(2000).then(() => {
    console.log('1');
    return 1;
});

const ajax2 = () => timeout(1000).then(() => {
    console.log('2');
    return 2;
});

const ajax3 = () => timeout(2000).then(() => {
    console.log('3');
    return 3;
});

const mergePromise = ajaxArray => {
    // 在这里实现你的代码
    let result = []
    let queue = Promise.resolve()
    ajaxArray.forEach(item => {
        queue = queue.then(item).then(res=> {
            result.push(res)
            return result
        })
    })
    return queue
};

// mergePromise([ajax1, ajax2, ajax3]).then(data => {
//     console.log('done');
//     console.log(data); // data 为 [1, 2, 3]
// });


/**
 * 现有8个图片资源的url，已经存储在数组urls中，
 * 且已有一个函数function loading，输入一个url链接，返回一个Promise，该Promise在图片下载完成的时候resolve，下载失败则reject。
 * 要求：任何时刻同时下载的链接数量不可以超过3个。
 * 请写一段代码实现这个需求，要求尽可能快速地将所有图片下载完成。
 */
var urls = ['https://www.kkkk1000.com/images/getImgData/getImgDatadata.jpg', 'https://www.kkkk1000.com/images/getImgData/gray.gif', 'https://www.kkkk1000.com/images/getImgData/Particle.gif', 'https://www.kkkk1000.com/images/getImgData/arithmetic.png', 'https://www.kkkk1000.com/images/getImgData/arithmetic2.gif', 'https://www.kkkk1000.com/images/getImgData/getImgDataError.jpg', 'https://www.kkkk1000.com/images/getImgData/arithmetic.gif', 'https://www.kkkk1000.com/images/wxQrCode2.png'];

function loadImg(url) {
    return new Promise((resolve, reject) => {
        const img = new Image()
        img.onload = () => {
            console.log('一张图片加载完成');
            resolve();
        }
        img.onerror = reject;
        img.src = url;
    })
};

function limitLoad(urls, handler, limit) {
    // 对数组做一个拷贝
      const sequence = [...urls];
  
    let promises = [];
    //并发请求到最大数
    promises = sequence.splice(0, limit).map((url, index) => {
      // 这里返回的 index 是任务在 promises 的脚标，用于在 Promise.race 之后找到完成的任务脚标
      return handler(url).then(() => {
        return index;
      });
    });
  
    // 利用数组的 reduce 方法来以队列的形式执行
    return sequence.reduce((last, url, currentIndex) => {
      return last.then(() => {
        // 返回最快改变状态的 Promise
        return Promise.race(promises)
      }).catch(err => {
        // 这里的 catch 不仅用来捕获前面 then 方法抛出的错误
        // 更重要的是防止中断整个链式调用
        console.error(err)
      }).then((res) => {
        // 用新的 Promise 替换掉最快改变状态的 Promise
        promises[res] = handler(sequence[currentIndex]).then(() => {
          return res
        });
      })
    }, Promise.resolve()).then(() => {
      return Promise.all(promises)
    })
  
  }
  
//   limitLoad(urls, loadImg, 3);

/**
 * 封装一个异步加载图片的方法
 */
function loadImageAsync(url) {
    return new Promise((resolve, reject) => {
        const img = new Image()
        img.onload = function() {
            console.log('图片加载完成' + img)
            resolve(img)
        }
        img.onerror = reject
        img.src= url
    })
}

// loadImageAsync('https://www.kkkk1000.com/images/getImgData/getImgDataError.jpg')
