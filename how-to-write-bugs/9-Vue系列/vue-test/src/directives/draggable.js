export default {
    inserted(el) {
        el.style.cursor = 'move'
        el.onmousedown = function(evt) {
            const left = evt.pageX - el.offsetLeft
            const top = evt.pageY - el.offsetTop
            document.onmousemove = function(evt) {
                let x = evt.pageX - left
                let y = evt.pageY - top
                const maxLeft = Math.max(document.body.clientWidth) - parseInt(window.getComputedStyle(el).width)
                const maxTop = Math.max(document.body.clientHeight) - parseInt(window.getComputedStyle(el).height)
                if (x < 0) {
                    x = 0
                } else if (x > maxLeft) {
                    x = maxLeft
                }
                if (y < 0) {
                    y = 0
                } else if (y > maxTop) {
                    y = maxTop
                }
                el.style.left = x + 'px'
                el.style.top = y + 'px'
            }
            document.onmouseup = function() {
                document.onmousemove = document.onmouseup = null
            }
        }
    }
}
