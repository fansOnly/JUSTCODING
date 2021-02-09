/**
 * javascript-iterators
 * Symbol.iterator
 */
class LinkedList {
    constructor(data) {
        this.data = data
    }
    firstItem() {
        return this.data.find(i => i.head)
    }
    findbyId(id) {
        return this.data.find(v => v.id === id)
    }
    [Symbol.iterator]() {
        let item = {
            next: this.firstItem().id
        }
        return {
            next: () => {
                item = this.findbyId(item.next)
                if (item) {
                    return {
                        value: item.value,
                        done: false
                    }
                }
                return {
                    value: undefined,
                    done: true
                }
            }
        }
    }
}

const myList = new LinkedList([
    {id: 'a10', value: 'First', next: 'a13', head: true },
    {id: 'a11', value: 'Last', next: null, head: false },
    {id: 'a12', value: 'Third', next: 'a11', head: false },
    {id: 'a13', value: 'Second', next: 'a12', head: false }
])

for (let item of myList) {
    console.log(item) // First Second Third Last
}





class SpecialList {
    constructor(data) {
        this.data = data
    }
    [Symbol.iterator]() {
        return this.data[Symbol.iterator]()
    }
    values() {
        return this.data.filter(v => v.complete).map(v => v.value)[Symbol.iterator]()
    }
}

const myList2 = new SpecialList([
    {complete: true, value: 'Lorem ipsum'},
    {complete: true, value: 'dolor sit amet'},
    {complete: false},
    {complete: true, value: 'adipiscing elit'}
])
for (let item of myList2) {
    console.log(item)
}

for (let item of myList2.values()) {
    console.log(item)
}
