class Middleware {
    constructor() {
        this.list = []
    }
    use(fn) {
        this.list.push(fn)
        return this
    }
    compose(ctx) {
        const dispath = (index) => {
            if (index >= this.list.length) return
            const fn = this.list[index]
            return fn(ctx, () => dispath(index+1))
        }
        return dispath(0)
    }
    compose2(ctx) {
        const dispatch = (index) => {
            if (index >= this.list.length) return
            const fn = this.list[index]
            const res = fn(ctx)
            return res ? dispatch(index+1) : false
        }
        return dispatch(0)
    }
}

const middle = new Middleware()

let arr = []

const f1 = (a) => {
    console.log(11111, a)
    arr.push(1)
    return true
}
const f2 = (a) => {
    console.log(22222, a)
    arr.push(2)
    // return false
}
const f3 = (a) => {
    console.log(333333, a)
    arr.push(3)
    return true
}

middle.use(f1).use(f2).use(f3)

middle.compose(20)
// middle.compose2(20)
console.log(arr)

