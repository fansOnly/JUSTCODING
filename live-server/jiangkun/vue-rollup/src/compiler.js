// 递归DOM节点生成虚拟DOM
function createVNode(node)  {
    const nodeType = node.nodeType
    let _vnode = null
    if (nodeType === 1) { // 元素节点
        let nodeName = node.nodeName
        let attrs = node.attributes
        let _attrObj = {}
        for (let i = 0; i < attrs.length; i++) {
            _attrObj[attrs[i].nodeName] = attrs[i].nodeValue
        }
        _vnode = new VNode(nodeName, _attrObj, undefined, nodeType)
        // 子节点
        let childNodes = node.childNodes
        for (let i = 0; i < childNodes.length; i++) {
            _vnode.appendChild(createVNode(childNodes[i]))
        }
    } else if (nodeType === 3) { // 文本节点
        _vnode = new VNode(undefined, undefined, node.nodeValue, nodeType)
    }
    return _vnode
}

function parseVNode(vnode) { // 解析虚拟 DOM 为真实 DOM
    const nodeType = vnode.type
    let _node = null
    if (nodeType === 1) { // 元素节点
        _node = document.createElement(vnode.tag)
        let _data = vnode.data
        // 节点属性
        Object.keys(_data).forEach(key => {
            _node.setAttribute(key, _data[key])
        })
        // 子节点
        let _children = vnode.children
        _children.forEach(subvnode => {
            _node.appendChild(parseVNode(subvnode))
        })
        return _node
    } else if (nodeType === 3) { // 文本节点
        return document.createTextNode(vnode.value,)
    }
}

// 将虚拟 DOM 填充数据后返回
function combine(vnode, data) {
    let _type = vnode.type
    let _tag = vnode.tag
    let _data = vnode.data
    let _value = vnode.value
    let _children = vnode.children

    let _vnode = null

    if (_type === 1) { // 元素节点
        _vnode = new VNode(_tag, _data, _value, _type)

        _children.forEach(subvnode => {
            _vnode.appendChild(combine(subvnode, data))
        })
    } else if (_type === 3) { // 文本节点
        // 对文本进行处理
        _value = _value.replace(tmpReg, (_, p1) => {
            return getValByPropPath(data, p1.trim())
        })
        _vnode = new VNode(_tag, _data, _value, _type)
    }
    return _vnode
}
