/**
 * runAsync
 * Runs a function in a separate threadby using a Web Worker, allowing long running functions to not block the UI.
 * 1. Create a new Worker() using a Blob object URL, the contents of which should be the stringified version of the supplied function.
 * 2. Immediately post the return value of calling the function back.
 * 3. Returns a new Pormise(), listening for onmessage and onerror events and resolving the data post back from the worker, or throwing an error.
 */
const runAsync = fn => {
    const worker = new Worker(
        URL.createObjectURL(new Blob([`postmessage((${fn})());`]), {
            type: 'application/javascript; charset=utf-8'
        })
    )
    return new Promise((resolve, reject) => {
        worker.onmessage = ({data}) => {
            resolve(data)
            worker.terminate()
        }
        worker.onerror = err => {
            reject(err)
            worker.terminate()
        }
    })
}

const longRunningFunction = () => {
    let result = 0
    for (let i = 0; i < 1000; i++) {
        for (let j = 0; j < 700; j++) {
            for (let k = 0; k < 300; k++) {
                result += i + j + k
            }
        }
    }
    return result
}

/*
  NOTE: Since the function is running in a different context, closures are not supported.
  The function supplied to `runAsync` gets stringified, so everything becomes literal.
  All variables and functions must be defined inside.
*/
runAsync(longRunningFunction).then(console.log) // 209685000000

let outsideVariable = 50;
runAsync(() => typeof outsideVariable).then(console.log); // 'undefined'
