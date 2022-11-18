const data = (async() => {
  return await Promise.resolve(10).then(res => {
    console.log('res: ', res);
    return res
  })
})()
console.log(data)


const getData = async () => {
  const res = await new Promise(resolve => {
    resolve(10)
  })
  console.log('res: ', res);
  return res
}

console.log(getData())
