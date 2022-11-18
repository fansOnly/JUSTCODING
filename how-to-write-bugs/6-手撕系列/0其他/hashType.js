/**
 * 判断是否是指定的哈希值
 */
function getHashType(str, type) {
    if (typeof str !== 'string') {
        return str
    }
    const algorithms = {
        md5: 32,
        md4: 32,
        sha1: 40,
        sha256: 64,
        sha384: 96,
        sha512: 128,
        ripemd128: 32,
        ripemd160: 40,
        tiger128: 32,
        tiger160: 40,
        tiger192: 48,
        crc32: 8,
        crc32b: 8,
    }
    const hash = new RegExp(`^[a-fA-F0-9]{${algorithms[type]}}$`)
    return hash.test(str)
}

console.log(getHashType('d94f3f016ae679c3008de268209132f2', 'md5'))
console.log(getHashType('d94f3f016ae679c3008de268209132f2', 'md4'))

console.log(getHashType('q94375dj93458w34', 'md5'))

console.log(getHashType('3ca25ae354e192b26879f651a51d92aa8a34d8d3', 'sha1'))
