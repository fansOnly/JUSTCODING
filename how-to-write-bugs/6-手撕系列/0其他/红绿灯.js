/**
 * 实现一个红绿灯
 * 红灯2秒，黄灯1秒，绿灯3秒
 */
function sleep(duration) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve()
        }, duration);
    })
}

async function light(color, duration) {
    console.log(new Date(), `${color}亮了.`)
    await sleep(duration)
}

async function start(count = 2) {
    await light('红灯', 2000)
    await light('黄灯', 1000)
    await light('绿灯', 3000)
    if (--count > 0) {
        await start(count)
    } else {
        console.log('结束')
    }
}

// start(3)
