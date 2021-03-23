// 复制文本
export default {
    bind(el, { value }) {
        el.$value = value
        el.handler = () => {
            if (!value) {
                console.log('空文本')
                return
            }
            const textarea = document.createElement('textarea')
            textarea.readOnly = 'readonly'
            textarea.style.position = 'absolute'
            textarea.style.left = '-9999px'
            textarea.value = el.$value
            document.body.appendChild(textarea)
            textarea.select()
            try {
                document.execCommand('copy')
                console.log('复制成功：', el.$value)
                document.body.removeChild(textarea)
            } catch (error) {
                throw new Error(error)
            }
        }
        el.addEventListener('click', el.handler)
    },
    componentUpdated(el, { value }) {
        el.$value = value
    },
    unbind(el) {
        el.removeEventListener('click', el.handler)
    }
}
