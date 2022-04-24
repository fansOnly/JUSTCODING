export function binarySearch(
  list,
  value,
  compareFunc
) {
  let start = 0;
  let end = list.length - 1;
  let tempIndex = null;

  while (start <= end) {
    tempIndex = Math.floor((start + end) / 2);
    const midValue = list[tempIndex];

    const compareRes = compareFunc(midValue, value);
    if (compareRes === 0) {
      return tempIndex;
    }

    if (compareRes < 0) {
      start = tempIndex + 1;
    } else if (compareRes > 0) {
      end = tempIndex - 1;
    }
  }

  return tempIndex;
}

export function partial (fn, arg) {
  return function () {
    return fn(arg)
  }
}
