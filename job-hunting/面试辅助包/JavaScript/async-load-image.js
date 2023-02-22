var urls = ['https://www.kkkk1000.com/images/getImgData/getImgDatadata.jpg', 'https://www.kkkk1000.com/images/getImgData/gray.gif', 'https://www.kkkk1000.com/images/getImgData/Particle.gif', 'https://www.kkkk1000.com/images/getImgData/arithmetic.png', 'https://www.kkkk1000.com/images/getImgData/arithmetic2.gif', 'https://www.kkkk1000.com/images/getImgData/getImgDataError.jpg', 'https://www.kkkk1000.com/images/getImgData/arithmetic.gif', 'https://www.kkkk1000.com/images/wxQrCode2.png']

function loadImg(url) {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.onload = () => {
      console.log('一张图片加载完成')
      resolve()
    }
    img.onerror = reject
    img.src = url
  })
};

async function limitLoad(urls, handler, limit) {
  let ret = []
  let executing = []
  const p = Promise.resolve()

  for (const url of urls) {
    ret.push(p.then(() => handler(url)))

    if (ret.length > limit) {
      const e = p.then(() => executing.splice(executing.indexOf(e), 1))
      executing.push(e)

      if (executing.length > limit) {
        await Promise.race(executing)
      }
    }
  }

  return Promise.all(ret)
}

limitLoad(urls, loadImg, 3)
