// let i = 1
let a = new Proxy({}, {
    i: 1,
    get() {
        return () => this.i++
    }
})

console.log(a == 1 && a == 2)



var c = 10
function fn1() {
    var b = 20
    console.log(fn2) // Function fn2
    function fn2() {
        c = 20
    }
    return fn2
}
fn1()()
console.log(c) // 20

// 伪代码
// GlobalExcutionContext = {
//     ThisBinding: <Global Object>,
//     LexcialEnvironment: {
//         EnvironmentRecord: {
//             Type: 'Object',
//              fn1: <func>
//         },
//         outer: <null>
//     },
//     VariableEnvironment: {
//         EnvironmentRecord: {
//             Type: 'Object',
//             c: <undefined>
//         },
//         outer: <null>
//     }
// }

// FunctionExcutionContext: {
//     ThisBinding: <Global Object>,
//     LexcialEnvironment: {
//         EnvironmentRecord: {
//             Type: 'Declarative',
//             b: <undefined>,
//             fn2: <func>
//         },
//         outer: <null>
//     },
//     VariableEnvironment: {
//         EnvironmentRecord: {
//             Type: 'Declarative',
//         },
//         outer: <null>
//     }
// }

