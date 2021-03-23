const isObject = value => typeof value === 'object' && value !== null

let tmpReg = /\{\{(.+?)\}\}/g

function getValByPropPath(target, path) {
    let props = path.split('.')
    let res = target
    while (props.length) {
        res = res[props.shift()]
    }
    return res
}
