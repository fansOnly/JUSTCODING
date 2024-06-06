/**
 * 正则去重字符串
 */
{
  const distinct = (str) => {
    return str.split('').reverse().join('').replace(/(.)(?=.*(\1).*)/g, (_, p1) => {
      console.log('match::', _)
      console.log('$1::', p1)
      return ''
    }).split('').reverse().join('')
  }
  
  const arr = 'abcdefbAkoiusamo'
  const res = distinct(arr)
  console.log('res: ', res);
}


/**
 * 数组去重 - 通过对象
 */
{
  const distinct = (arr=[]) => {
    let obj = {}
    arr.forEach(item => {
      obj[item] = ''
    })

    return Object.keys(obj).map(Number)
  }

  const arr = [1,2,3,1,2,5,6,2,1,8]
  const res = distinct(arr)
  console.log('res: ', res);
}

/**
 * 正则数组去重
 */
{
  function distinct(arr=[]) {
    let str = JSON.stringify(arr.reverse()).replace(/[\[|\]]/g, ',').replace(/(,.,)(?=.*(\1).*)/g, ',')
    str = str.replace(/^(,)/, '[').replace(/(,)$/, ']')
    console.log('str: ', str);
    
    return JSON.parse(str).reverse()
  }
  
  const arr = [1,2,3,5,1,8,0,85,3,9,1,7,1029,8,3434,0]
  const res = distinct(arr)
  console.log('res: ', Array.isArray(res), res);
}