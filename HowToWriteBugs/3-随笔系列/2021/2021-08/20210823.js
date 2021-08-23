/*
 * @Author: fansonly
 * @Date: 2021-08-23 09:58:12
 * @Description:
 * @LastEditTime: 2021-08-23 09:58:12
 */
function xss(str){
  return str?str.replace(/(?:^$|[\x00\x09-\x0D "'`=<>])/g,(m)=>{
      return m === '\t'   ? '&#9;'
          :  m === '\n'   ? '&#10;'
          :  m === '\x0B' ? '&#11;'
          :  m === '\f'   ? '&#12;'
          :  m === '\r'   ? '&#13;'
          :  m === ' '    ? '&#32;'
          :  m === '='    ? '&#61;'
          :  m === '<'    ? '&lt;'
          :  m === '>'    ? '&gt;'
          :  m === '"'    ? '&quot;'
          :  m === "'"    ? '&#39;'
          :  m === '`'    ? '&#96;'
          : '\uFFFD';
  }):''
}
