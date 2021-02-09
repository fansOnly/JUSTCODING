import { def } from '../utils/util.js'

const arrayProto = Array.prototype
export const arrayMethods = Object.create(arrayProto)

const methodsToPatch = [
    'push',
    'pop',
    'shift',
    'unshift',
    'splice',
    'sort',
    'reverse'
]

methodsToPatch.forEach(method => {
    const original = arrayMethods[method]
    def(arrayMethods, method, function mutator(...args) {
        const result = original.call(this, args)
        const ob = this.__ob__
        let inserted
        switch (method) {
            case 'push':
            case 'ubshift':
                inserted = args
                break
            case 'splice':
                inserted = args.slice(2)
                break
        }
        if (inserted) ob.observeArray(inserted)
        ob.dep.notify()
        return result
    })
})
