const getRandFromArray = (arr, exclude = []) => {
    if (exclude.length) {
      arr = arr.filter(v => !exclude.includes(v))
    }
    const randIndex = ~~(Math.random() * arr.length)
    return arr[randIndex]
  }

  const arr = [1,2,3,4,5,6,7]
  const res = getRandFromArray(arr, [])
  console.log(res)
