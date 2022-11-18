/**
 * Getting an Array of Times + "AM" or "PM".
 * @param {number} minutesInterval
 * @param {number} startTime 
 */
export const getTimes = (minutesInterval = 15, startTime = 60) => {
    const times = []; // time array
    const x = minutesInterval; // minutes interval
    let tt = startTime; // start time
    const ap = ["AM", "PM"]; // AM-PM

    // loop to increment the time and push results in array
    for (let i = 0; tt < 24 * 60; i += 1) {
        const hh = Math.floor(tt / 60); // getting hours of day in 0-24 format
        const mm = tt % 60; // getting minutes of the hour in 0-55 format
        times[i] = `${`${hh === 12 ? 12 : hh % 12}`.slice(-2)}:${`0${mm}`.slice(-2)} ${ap[Math.floor(hh / 12)]
            }`; // pushing data in array in [00:00 - 12:00 AM/PM format]
        tt += x;
    }
    return times;
}


/**
 * 数组去重
 */
function uniqueArr(arr) {
    let _set = {}
    arr.forEach(v => _set[v] || (_set[v] = true))
    return Object.keys(_set)
}

function uniqueArr2(arr) {
    let _set = {}
    let _newArr = []
    arr.forEach(v => _set[v] || (_set[v] = true, _newArr.push(v)))
    return _newArr
}

console.log(uniqueArr2([1,2,3,3,2,2,]))
