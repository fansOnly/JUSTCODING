/**
 * 将文件数值大小转换为相应的单位大小
 */
const humanFileSize = bytes => {
    const thresh = 1024
    if (Math.abs(bytes) < thresh) {
        return  `${bytes} B`
    }
    const units = ["kB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"]
    let u = -1
    const r = 10 ** 1
    do {
        bytes /= thresh
        u += 1
    } while(Math.round(Math.abs(bytes) * r) / r >= thresh && u < units.length - 1)
    return `${bytes.toFixed(1)} ${units[u]}`
}

console.log(humanFileSize(2312003213))
