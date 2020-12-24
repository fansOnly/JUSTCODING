// 预加载图片地址
const preloadUrl = 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1607488232709&di=bb5c6b365cb84e485280c4de956ec238&imgtype=0&src=http%3A%2F%2Fimg.yayawan.com%2Fupload%2F2015%2F04%2F97c25cf2e1.jpg'

function observe(el) {
    var intersectionObserver = new IntersectionObserver(function (entries) {
        if (entries[0].intersectionRatio <= 0) return;
        handler(el)
    });
    intersectionObserver.observe(el);
}

function scroll(el) {
    window.addEventListener('scroll', throtte(() => scrollLoad(el), 2000))
}

function scrollLoad(el) {
    const windowHeight = document.documentElement.clientHeight
    const { top, bottom } = el.getBoundingClientRect()
    if (top <= windowHeight && bottom > 0) {
        handler(el)
    }
}

function handler(el) {
    // 模拟异步请求图片真实地址
    setTimeout(() => {
        el.setAttribute('src', el.$realUrl)
    }, 1000);
}

function loadImage(el) {
    if (IntersectionObserver) {
        observe(el)
    } else {
        scroll(el)
    }
}

function throtte(fn, delay) {
    let timer = null
    return function () {
        if (!timer) {
            timer = setTimeout(() => {
                fn.apply(this, arguments)
                timer = null
            }, delay);
        }
    }
}

export default {
    bind(el, { value }) {
        el.$realUrl = value
        el.setAttribute('src', preloadUrl)
    },
    inserted(el) {
        loadImage(el)
    },
}
