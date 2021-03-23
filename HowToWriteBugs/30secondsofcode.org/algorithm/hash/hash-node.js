/**
 * hashNode
 * Creates a hash for a value using the SHA-256 algorithm.Returns a promise.
 * 1. Use crypto.createhash() to create a Hash object with the approprite algorithm.
 * 2. Use hash.update() to add the data from val to Hash, hash.digest() to calculate the digest of the data.
 * 3. Use setTimeout() to prevent blocking on a long operation, and return a Promise to give it a familiar interface.
 */
const crypto = require('crypto')

const hashNode = val => {
    return new Promise(resolve => {
        setTimeout(() => {
            () => resolve(crypto.createHash('sha256').update(val).digest('hex'))
        }, 0)
    })
}

hashNode(JSON.stringify({ a: 'a', b: [1, 2, 3, 4], foo: { c: 'bar' } })).then(
    console.log
)
