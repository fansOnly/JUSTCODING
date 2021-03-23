// Vue  构造函数
function MyVue(options) {
    // 内部数据使用 _ 开头，只读数据使用 $ 开头
    this._options = options
    this._data = options.data

    let elm = document.querySelector('#root')
    
    this._template = elm
    this._parent = elm.parentNode
    this._el = options.el

    this.initData()

    this.mount() // 挂载
}
