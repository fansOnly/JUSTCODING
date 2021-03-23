MyVue.prototype.mount = function() { // 节点挂载
    if (typeof this._options.render === 'function') { // 自定义渲染
        return
    }
    this.render = this.createRenderFn()
    this.mountComponent()
}

MyVue.prototype.mountComponent = function() { // 仿 watcher
    let mount = () => {
        this.update(this.render())
    }
    new Watcher(this, mount)
}

/** 
 * Vue 中使用了二次提交的设计结构
 * 1. 数据变化后，结合被缓存的 AST，生成新的 VNode - render
 * 2. 新的 VNode 通过 diff 算法与原来的 VNode 对比，更新 - update
 * 3. 比较完后渲染真实 DOM - VNode 与真实 DOM 一一对应
*/
MyVue.prototype.createRenderFn = function() {
    // 缓存抽象语法树，此处使用虚拟 DOM 替代
    const ast = createVNode(this._template)
    // Vue: AST + data -> VNode
    // 无数据的 VNode + data -> 有数据的 VNode
    return function render() {
        return combine(ast, this._data)
    }
}

MyVue.prototype.update = function(vnode) { // 渲染页面
    // Vue: diff算法的实现
    // 简单的替换全部子节点
    const realNode = parseVNode(vnode)
    this._parent.replaceChild(realNode, document.querySelector('#root'))
}
