import axios from "./axios.js";

console.dir(axios);

// axios.defaults.baseURL = 'localhost:3000'
axios.defaults.timeout = 10000

/**
 * 发起get请求
 */
// axios.get('/test', response => {
//   console.log('get 响应成功', response)
// }, error => {
//   console.log('get 响应失败', error)
// })


// axios.interceptors.request.use(function one(response) {
//   console.log('请求拦截器 1 号 成功', response)
// }, function one(error) {
//   console.log('请求拦截器 1 号 失败', error)
// })
// axios.interceptors.request.use(function two(response) {
//   console.log('请求拦截器 2 号 成功', response)
// }, function two(error) {
//   console.log('请求拦截器 2 号 失败', error)
// })
// axios.interceptors.response.use(function one(response) {
//   console.log('响应拦截器 1 号 成功', response)
// }, function one(error) {
//   console.log('响应拦截器 1 号 失败', error)
// })
// axios.interceptors.response.use(function two(response) {
//   console.log('响应拦截器 2 号 成功', response)
// }, function two(error) {
//   console.log('响应拦截器 2 号 失败', error)
// })

// let cancel

// if (cancel) {
//   cancel()
// }

// axios({
//   method: 'get',
//   url: '/test',
//   params: {a: 9, b: 2,a:1},
//   cancelToken: new axios.CancelToken(c => {
//     cancel = c
//   })
// }).then(res => {
//   console.log('请求响应', res)
// }).catch(err => {
//   cancel = null
//   console.log('请求失败', err)
// })
