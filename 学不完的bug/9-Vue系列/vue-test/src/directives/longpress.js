// 长按操作，可自定义长按时长，默认2s
export default {
    bind(el, { value, arg = 2000 }) {
        if (typeof value !== 'function') {
            throw new TypeError('callback must be a function')
        }
        if (typeof arg !== 'number') {
            throw new TypeError('args must be a number')
        }
        let timer = null
        el.$delay = arg
        el.start = e => {
            if (e.type === 'click' && e.button !== 0) {
                return
            }
            if (!timer) {
                timer = setTimeout(() => {
                    value(e)
                }, el.$delay);
            }
        }
        el.cancel = () => {
            if (timer) {
                clearTimeout(timer)
                timer = null
            }
        }
        el.addEventListener('mousedown', el.start)
        el.addEventListener('touchstart', el.start)
        el.addEventListener('click', el.cancel)
        el.addEventListener('mouseout', el.cancel)
        el.addEventListener('touchend', el.cancel)
        el.addEventListener('touchcancel', el.cancel)
    },
    componentUpdated(el, { arg }) {
        el.$delay = arg
    },
    unbind(el) {
        el.removeEventListener('mousedown', el.start)
        el.removeEventListener('touchstart', el.start)
        el.removeEventListener('click', el.cancel)
        el.removeEventListener('mouseout', el.cancel)
        el.removeEventListener('touchend', el.cancel)
        el.removeEventListener('touchcancel', el.cancel)
    }
}
