export default {
    bind(el, { value, arg = 1000 }) {
        el.$delay = arg
        let timer = null
        el.handler = () => {
            if (timer) clearTimeout(timer)
            timer = setTimeout(() => {
                value()
                timer = null
            }, el.$delay);
        }
        el.addEventListener('click', el.handler)
        el.addEventListener('touchstart', el.handler)
    },
    componentUpdated(el, { arg }) {
        el.$delay = arg
    },
    unbind(el) {
        el.removeEventListener('click', el.handler)
    }
}
