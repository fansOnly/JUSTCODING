/**
 * 渲染几万条数据不卡住页面
 * 渲染大数据时，合理使用createDocumentFragment和requestAnimationFrame，将操作切分为一小段一小段执行
 */
const loadLongData = data => {
    data = 10000
    const once = 20 // 单次加载数量
    const loopCount = Math.ceil(data / once) // 加载次数上限
    const renderCount = 0 // 加载次数

    const ul = document.querySelector('ul')

    function add() {
        const fragment = document.createDocumentFragment()
        for (let i = 0; i < once; i++) {
            const li = document.createElement('li')
            li.innerText = ~~(Math.random() * data)
            fragment.appendChild(li)
        }
        ul.appendChild(fragment)
        renderCount++
        loopRender()
    }

    function loopRender() {
        if (renderCount < loopCount) {
            window.requestAnimationFrame(add)
        }
    }

    loopRender()
}
