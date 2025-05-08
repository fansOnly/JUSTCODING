const url = 'http://localhost:5173/?code=1&authcode=af3d4959f5054d878dae7044ecc37e03&ccc=1'
const res = url.replace(/code=(\w+)(&authcode=\w+)?/, '')
console.log(res)