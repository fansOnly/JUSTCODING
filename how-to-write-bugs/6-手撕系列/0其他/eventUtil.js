/**
 * 通用的事件侦听器函数
 */
const eventUtil = {
    addEvent: function(element, type, handler) {
        if (element.addEventListener) {
            element.addEventListener(type, handler, false)
        } else if (element.attachEvent) {
            element.attachEvent('on' + type, handler)
        } else {
            element['on' + type] = handler
        }
    },
    removeEvent: function(element, type, handler) {
        if (element.removeEventListener) {
            element.removeEventListener(type, handler, false)
        } else if (element.detachEvent) {
            element.detachEvent('on' + type, handler)
        } else {
            element['on' + type] = null
        }
    },
    getTarget: function(event) {
        return event.target || event.srcElement
    },
    getEvent: function(event) {
        return event || window.event
    },
    preventDefault: function(event) {
        if (event.preventDefault) {
            event.preventDefault()
        } else {
            event.returnValue = false
        }
    },
    stopPropagation(event) {
        if (event.stopPropagation) {
            event.stopPropagation()
        } else {
            event.cancelBubble = true
        }
    }
}
