function addWaterMaker(parentNode, text, font, textColor) {
    const canvas = document.createElement('canvas')
    parentNode.appendChild(canvas)
    canvas.width = 100
    canvas.height = 100
    canvas.style.display = 'none'
    const ctx = canvas.getContext('2d')
    ctx.rotate((-20 * Math.PI) / 180)
    ctx.font = font || '16px Microsoft JhengHei'
    ctx.fillStyle = textColor || 'rgba(180, 180, 180, 0.3)'
    ctx.textAlign = 'left'
    ctx.textBaseline = 'Middle'
    ctx.fillText(text, canvas.width / 10, canvas.height / 2)
    parentNode.style.backgroundImage = `url(${canvas.toDataURL('image/png')})`
}

export default {
    bind(el, { value: { text = '', font = '', textColor = '' } }) {
        addWaterMaker(el, text, font, textColor)
    }
}
