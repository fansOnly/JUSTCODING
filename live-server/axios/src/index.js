import axios from "./axios.js";

console.log('axios: ', axios);

/**
 * 发起get请求
 */
axios.get('/test', response => {
  console.log('get 响应成功', response)
}, error => {
  console.log('get 响应失败', error)
})

axios({method: 'get'})
