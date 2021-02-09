/**
 * hashBrowser
 * Creates a hash for a value using the SHA-256 algorithm. Returns a promise.
 * 1. Use the SubtleCryto API to create a hash for the given value.
 * 2. Create a new TextEncoder and use it to encode val, passing its value to SubtleCrypto.digest() to generate a digest of the given data.
 * 3. Use DataView.prototype.getUnit32() to read data from the resolved ArrayBuffer.
 * 4. Add the data to an array use Array.prototype.push() after converting it its hexadecimal representation using Number.prototype.toString(16).
 * 5. Finally, use Array.prototype.join() to combine values in the array of hexes into a string.
 */
const crypto = require('crypto')

const hashBrowser = val => {
    crypto.subtle.digest('SHA-256', new TextEncoder('utf-8').encode(val))
    .then(h => {
        let hexes = [], view = new DataView(h)
        for (let i = 0; i < view.byteLength; i+=4) {
            hexes.push('00000000' + view.getUint32(i).toString(16).slice(-8))
        }
        return hexes.join('')
    })
}

hashBrowser(
    JSON.stringify({ a: 'a', b: [1, 2, 3, 4], foo: { c: 'bar' } })
).then(console.log);

// 04aa106279f5977f59f9067fa9712afc4aedc6f5862a8defc34552d8c7206393
