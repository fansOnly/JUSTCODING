/**
 * 图片懒加载
 * 一、 offsetTop > scrollTop + clientHeight
 */
// <img src="default.jpg" data-src="img.jpg" />
const imgs = document.getElementsByTagNameNS('img')
let count = 0

function lazyload() {
    const clientHeight = document.documentElement.clientHeight
    const scrollTop = document.documentElement.scrollTop || document.body.scrollTop
    imgs.forEach(img => {
        if (img.offsetTop < clientHeight + scrollTop) {
            const src = img.getAttribute('data-src')
            if (src !== 'default.jpg') {
                img.src = src
                count++
            }
        }
    })
}


/**
 * 二、getBoundingClientRect()
 */
function lazyload2() {
    const clientHeight = document.documentElement.clientHeight
    imgs.forEach(img => {
        if (img.getBoundingClientRec().top < clientHeight) {
            const src = img.getAttribute('data-src')
            if (src !== 'default.jpg') {
                img.src = src
                count++
            }
        }
    })
}


/**
 * 三、intersectionObserve
 */
const observe = new IntersectionObserver(() => {
    img.forEach(img => {
        if (img.isItersecting) {
            const imgEle = img.target
            imgEle.src = imgEle.getAttribute('data-src')
            observe.unobserve(imgEle)
        }
    })
})

imgs.forEach(img => observe.observe(img))
