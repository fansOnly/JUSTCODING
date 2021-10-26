
import { isAbsoluteURL } from '../utils'

/**
 * 合并两个 URL 路径
 */
 export default function buildFullPath(baseURL, requestedURL) {
   if (baseURL && !isAbsoluteURL(requestedURL)) {
     return combineURLs(baseURL, requestedURL)
   }
   return requestedURL
 }

 /**
  * 拼接两个 URL 路径，处理 /
  */
 export function combineURLs(baseURL, relativeURL) {
   return baseURL ? baseURL.replace(/\/+$/, '') + '/' + relativeURL.replace(/^\/+/, '') : baseURL
 }
