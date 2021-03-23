/**
 * 集合 Set
 */
class Set {
    constructor() {
        this.items = {}
    }

    has(value) {
        return this.items.hasOwnProperty(value)
    }

    add(value) {
        if (!this.has(value)) {
            this.items[value] = value
        }
        return this
    }

    size() {
        return Object.keys(this.items).length
    }

    keys() {
        return Object.keys(this.items)
    }

    values() {
        let values = []
        for (let key in this.items) {
            values.push(this.items[key])
        }
        return values
    }

    entries() {
        let values = []
        for (let key in this.items) {
            values.push([key, this.items[key]])
        }
        return values
    }

    delete(value) {
        if (this.has(value)) {
            delete this.items[value]
            return true
        }
        return false
    }

    clear() {
        this.items = {}
    }

}

const mySet = new Set()

mySet.add('a').add('b').add(1)

console.log(mySet)

console.log(mySet.has('a'))

for (let key of mySet.keys()) {
    console.log(key)
}

for (let [key, val] of mySet.entries()) {
    console.log([key, val])
}

console.log(mySet.delete('c')) // false

console.log(mySet.delete('a')) // true

console.log(mySet)
