import { lookup } from "./utils.js";
import renderTemplate from "./renderTemplate.js";

/*
 * @Description: 递归处理 token
 */
export default function parseArray(token, data) {
  // console.log('token, data: ', token, data);
  let result = ''
  const val = lookup(data, token[1])

  for (let i = 0; i < val.length; i++) {
    result += renderTemplate(token[2], {
      ...val[i],
      '.': val[i]
    })
  }

  return result
}
