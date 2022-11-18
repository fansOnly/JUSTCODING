const transformDate = (timestamp, format = 'HH:mm:ss') => {
    if (typeof timestamp !== "number") {
        throw new TypeError(`${timestamp} need to be number.`);
    }
    const hour = (timestamp / (60 * 60 * 1000)) | 0,
        minute = ((timestamp % (60 * 60)) / 60) | 0,
        second = timestamp % 60;
    let result = ''
    if (hour) result += hour.toString().padStart(2, "0") + ':';
    result += minute.toString().padStart(2, '0') + ':';
    result += second.toString().padStart(2, '0');
    return result
}


console.log(transformDate(317000))


const arr = [
    { id: 1, name: '1', time: 317000 },
    { id: 2, name: '222', time: 2598 },
    { id: 3, name: '33', time: 256 },
    { id: 4, name: '444', time: 801 },
]

arr.map(v => v.time = transformDate(v.time))
console.log(arr)
