const files = [ 'foo.txt ', '.bar', '   ', 'baz.foo' ];
let filePaths = [];
// filePaths = [ '~/cool_app/foo.txt', '~/cool_app/.bar', '~/cool_app/baz.foo']

// for
for (let i = 0; i < files.length; i++) {
    const path = files[i].trim()
    filePaths.push(`~/cool_app/${path}`)
}
console.log(filePaths)


// reduce
filePaths = files.reduce((acc, cur) => acc.concat(`~/cool_app/${cur.trim()}`), [])
console.log('filePaths: ', filePaths);


// map
filePaths = files.map(v => v.trim()).filter(Boolean).map(v => `~/cool_app/${v}`)
console.log('filePaths: ', filePaths);
