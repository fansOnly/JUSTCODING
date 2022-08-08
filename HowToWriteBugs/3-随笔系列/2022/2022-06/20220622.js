export const formatDate = (timestamp, formatter = 'YYYY-MM-DD HH:mm:ss') => {
  timestamp = timestamp || new Date().getTime()
  const date = new Date(timestamp)
  if (date == 'Invalid Date') return timestamp
  const Y = date.getFullYear() + '',
    M = date.getMonth() + 1,
    D = date.getDate(),
    H = date.getHours(),
    m = date.getMinutes(),
    s = date.getSeconds();
  return formatter.replace(/YYYY|yyyy/g, Y)
    .replace(/YY|yy/g, Y.substring(2))
    .replace(/MM/g, M < 10 ? '0' + M : M)
    .replace(/DD/g, D < 10 ? '0' + D : D)
    .replace(/HH|hh/g, H < 10 ? '0' + H : H)
    .replace(/mm/g, m < 10 ? '0' + m : m)
    .replace(/ss/g, s < 10 ? '0' + s : s)
}

console.log(formatDate('2022-6-6','YYYY年MM月DD日'))
