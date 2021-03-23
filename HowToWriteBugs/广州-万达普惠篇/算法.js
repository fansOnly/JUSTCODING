// 冒泡排序
// 两两对比, 较大的值往后排
const arr = [1,11,3,4,55,6,789,32,246,65]

// 基础版
const bubbleSort1 = arr => {
    for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr.length - i - 1; j++) {
            if (arr[j] > arr[j+1]) {
                let temp = arr[j];
                arr[j] = arr[j+1];
                arr[j+1] = temp;

            }
        }
    }
    return arr;
}

console.log(bubbleSort1(arr))

// 优化版
const bubbleSort2 = arr => {
    let flag = true;
    for (let i = 0; i < arr.length; i++) {
        for(let j = 0; j < arr.length - i - 1; j++) {
            if (arr[j] > arr[j+1]) {
                flag = false
                let temp = arr[j];
                arr[j] = arr[j+1];
                arr[j+1] = temp;
            }
        }
        if (flag) break;
    }
    return arr;
}

console.log(bubbleSort2(arr))


// 快速排序
// 1 选取基准元素, 并以基础元素为中心将数组分成两部分
// 2 比基准元素小的放在左边, 大的放在右边
// 3 重复 2 直至数组中只剩下一个元素
// 4 向上逐级合并数组

// 基础版
const quickSort1 = arr => {
    if (arr.length <= 1) return arr
    const pivot = arr.length / 2 | 0;
    const pivotValue = arr.splice(pivot, 1);
    const leftArr = [];
    const rightArr = [];
    arr.map(val => val > pivotValue ? rightArr.push(val) : leftArr.push(val));
    return [...quickSort1(leftArr), pivotValue, ...quickSort1(rightArr)]
}

console.log(quickSort1(arr).flat())


// 优化版 1.0
const quickSort2 = (arr, left, right) => {
    if (left < right) {
        let pos = left - 1;
        for (let i = left; i <= right; i++) {
            let pivot = arr[right];
            if (arr[i] <= pivot) {
                pos++
                let temp = arr[pos]
                arr[pos] = arr[i]
                arr[i] = temp
            }
        }
        quickSort2(arr, left, pos - 1);
        quickSort2(arr, pos + 1, right);
    }
    return arr;
}

console.log(quickSort2(arr, 0, arr.length - 1))

const arr3 = [1,2,5,3,45,13]
console.log(quickSort2(arr3, 0, arr3.length - 1))

function quickSort(arr, left, right) {          //这个left和right代表分区后“新数组”的区间下标，因为这里没有新开数组，所以需要left/right来确认新数组的位置
    if (left < right) {
        let pos = left - 1                      //pos即“被置换的位置”，第一趟为-1
        for(let i = left; i <= right; i++) {    //循环遍历数组，置换元素
            let pivot = arr[right]              //选取数组最后一位作为基准数，
            if(arr[i] <= pivot) {               //若小于等于基准数，pos++，并置换元素, 这里使用小于等于而不是小于, 其实是为了避免因为重复数据而进入死循环
                pos++
                let temp = arr[pos]
                arr[pos] = arr[i]
                arr[i] = temp
            }
        }
        //一趟排序完成后，pos位置即基准数的位置，以pos的位置分割数组
        quickSort(arr, left, pos - 1)        
        quickSort(arr, pos + 1, right)
    }
    return arr      //数组只包含1或0个元素时(即left>=right)，递归终止
}

// ps 数组长度大于 10000 时会触发 Maximum call stack size exceeded 
// const arr2 = []
// for (let i = 0; i < 10000; i++) {
//     arr2.push(Math.floor(Math.random() * 10000))
// }
// console.log(quickSort(arr2, 0 , 9999))

// 三路快排


// 归并排序


// 堆排序