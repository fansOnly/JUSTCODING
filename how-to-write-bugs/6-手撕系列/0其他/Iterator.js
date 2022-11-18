/**
 * 迭代器 - 一种规范
 * for...of
 */
const obj = {
    name: 'Lily',
    age: 10,
    gender: 'male',
    [Symbol.iterator]() {
        const keys = Object.keys(this)
        let index = 0
        return {
            next() {
                if (index < keys.length) {
                    return {
                        value: keys[index++],
                        done: false
                    }
                }
                return {
                    value: undefined,
                    dene: true
                }
            }
        }
    }
}

const itr = obj[Symbol.iterator]()

console.log(itr.next())
console.log(itr.next())
console.log(itr.next())
console.log(itr.next())



/**
 * 数组可迭代
 */
const arr = [1, 2, 3]
const arrItr = arr[Symbol.iterator]()

console.log(arrItr.next())
console.log(arrItr.next())
console.log(arrItr.next())
console.log(arrItr.next())

/**
 * 字符串可迭代
 */
const str = '123'
const strItr = str[Symbol.iterator]()

console.log(strItr.next())
console.log(strItr.next())
console.log(strItr.next())
console.log(strItr.next())


/**
 * Set 可迭代
 */
const set = new Set()
set.add('1').add('2')

const setItr = set[Symbol.iterator]()

console.log(setItr.next())
console.log(setItr.next())
console.log(setItr.next())


/**
 * Map 可迭代
 */
const map = new Map()
map.set('a', '1').set('b', 2)

const mapItr = map[Symbol.iterator]()

console.log(mapItr.next())
console.log(mapItr.next())
console.log(mapItr.next())


/**
 * 自定义可迭代对象
 */
const itrObj = {
    *[Symbol.iterator]() {
        yield 1;
        yield 2;
        yield 3;
    }
}

for (let val of itrObj) {
    console.log(val)
}



/**
 * 用于可迭代对象的语法
 * for...of
 * 扩展运算符
 * yield *
 * 解构赋值
 */
function* gen() {
    yield* [1, 2, 3]
}

console.log(gen().next())
console.log(gen().next())
console.log(gen().next())
console.log(gen().next())
