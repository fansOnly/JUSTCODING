const permissionList = ['颜色', '形状']

function hasAuth(val) {
    return permissionList.includes(val)
}

export default {
    inserted(el, { value }) {
        if (!hasAuth(value)) {
            el.parentNode && el.parentNode.removeChild(el)
        }
    },
}
