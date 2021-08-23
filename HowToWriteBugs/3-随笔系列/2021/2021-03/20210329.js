var a =0, b = 0
function A(a) {
   A = function(b) {
     console.log(a+b++)
   }
   console.log(a++)
}

A(1) // 1
A(2) // 4


function JsonP( { url, params, callback } ) {
  const generateUrl = () => {
    let queryString = ''
    Object.entries(params).forEach(([key, val]) => {
      queryString += `${key}=${val}&`
    })
    return `${url}${url.indexOf('?') === -1 ? '?' : '&'}${queryString}callback=${callback}`
  }
  return new Promise((resolve) => {
    const scriptEle = document.createElement('script')
    scriptEle.src = generateUrl()
    document.body.appendChild(scriptEle)

    window[callback] = data => {
      resolve(data)
      document.body.removeChild(scriptEle)
    }
  })
}
