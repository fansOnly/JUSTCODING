/**
 * createEventHub
 * Creates a pub/sub event hub with emit, on and off methods.
 * 1. Use Object.create(null) to create an empty hub object that does not inherit properties from Object.prototype.
 * 2. For emit, resolve the array of handlers based on the event argument and then run each one with Array.prototype.forEach() by passing the data as an argument.
 * 3. For on, create an array for the event if it does not yet exist, the use Array.prototype.push() to add the handler to the array.
 * 4. For off, use Array.prototype.findIndex() to finf the index of the handler in the event array and remove it use Array.prototype.splice()
 */
const createEventHub = () => ({
    hub: Object.create(null),
    emit(event, data) {
        (this.hub[event] || []).forEach(handler => handler(data))
    },
    on(event, handler) {
        if (!this.hub[event]) {
            this.hub[event] = []
        }
        this.hub[event].push(handler)
    },
    off(event, handler) {
        const i = (this.hub[event] || []).findIndex(h => h === handler)
        if (i > -1) {
            this.hub[event].splice(i, 1)
        }
        if (!this.hub[event].length) delete this.hub[event]
    }
})

const handler = data => console.log(data)
const hub = createEventHub()
let count = 0

hub.on('message', handler)
hub.on('message', () => console.log('test'))
hub.on('increment', () => count++)

hub.emit('message', 'hello world..') // hello world.. test

hub.emit('message', {hello: 'world'}) // {hello: 'world'} test

hub.emit('increment')
console.log(count) // 1

hub.off('message', handler)

hub.emit('message', 'hello world..') // test
