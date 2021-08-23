function getValByPropPath(target, path) {
    return path.split('.').reduce((obj, prop) => (obj = obj[prop], obj), target)
}

function getValByPropPath2(target, path) {
    let props = path.split('.')
    let res = target
    while (props.length) {
        res = res[props.shift()]
    }
    return res
}

const obj = {
    name: {
        firstName: 'li',
        a: {
            b: {
                c: {
                    d: {
                        e: 'eeeeee'
                    }
                }
            }
        }
    }
}

console.log(getValByPropPath(obj, 'name.a.b.c'))
