// ************************************************************************************************************************
// for of

for (let v of 'ssdasdasds') {
    console.log(v)
}


console.log(Object.prototype.toString.call(null))


const getType = str => {
    return Object.prototype.toString.call(str).replace(/\[object\s(.+)\]/, '$1').toLowerCase();
}


console.log(getType('1'))
console.log(getType(null + 1))

console.log(undefined + 1)
console.log(+null)


console.log({} == true) // {} == 1
console.log([] == true) // [] == 1

if ([]) { // !![] => true
    console.log(1)
} else {
    console.log(2)
}


var obj = {}

console.log(obj.toString())
console.log(obj.valueOf())



var obj = { x: 1 };

function judgeObj(obj) {
    for (let key in obj) {
        return false
    }
    return true
};

console.log(judgeObj(obj)); // true




// ************************************************************************************************************************
// 给定一个 “扁平化” 字典对象，其键以点分隔

var objx = {
    'A': 1,
    'B.B': 3,
    'CC.D.E': 4,
    'CC.D.F': 5,
    'E.FF.G.H': ''
}

const flatObject = obj => {
    let res = {};
    for (let key in obj) {
        const keys = key.split('.');
        if (keys.length > 1) {
            objectProp(res, keys, obj[key]);
        } else {
            res[key] = obj[key];
        }
    }
    return res;
}

const objectProp = (obj, keys, value) => {
    let newobj = obj;
    for (let i = 0; i < keys.length; i++) {
        let k = keys[i]
        if (!newobj.hasOwnProperty(k)) {
            newobj[k] = {};
        }
        if (i == keys.length - 1) {
            newobj[k] = value;
        }
        newobj = newobj[k];
    }
    console.log(obj)
    console.log(newobj)
}

console.log(flatObject(objx))