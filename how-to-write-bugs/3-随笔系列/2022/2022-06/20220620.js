export const formatDate = (value, formatter = 'YYYY-MM-DD HH:mm:ss') => {
  // fix: ios 下日期格式 Bug
  let date = value ? new Date(String(value).replace(/\-/g, '/')) : new Date()
  const isTimeType = /^\d{1,2}(\:\d{1,2}){2}/.test(value)
  console.log('isTimeType: ', isTimeType);
  if (!isTimeType && date === 'Invalid Date') {
    console.warn('[info] Invalid Date', value)
    return value
  }

  let Y = date.getFullYear() + '',
    M = date.getMonth() + 1,
    D = date.getDate(),
    H = date.getHours(),
    m = date.getMinutes(),
    s = date.getSeconds();

     if (isTimeType) {
      [H, m, s] = value.split(':').map(Number)
    }
    return formatter.replace(/YYYY|yyyy/g, Y)
    .replace(/YY|yy/g, Y.substring(2))
    .replace(/MM/g, M < 10 ? '0' + M : M)
    .replace(/DD/g, D < 10 ? '0' + D : D)
    .replace(/HH|hh/g, H < 10 ? '0' + H : H)
    .replace(/mm/g, m < 10 ? '0' + m : m)
    .replace(/ss/g, s < 10 ? '0' + s : s)
}


console.log(formatDate('2020-05-12 7:30:05', 'hh:mm:ss'))
// console.log(formatDate('2022-1-1', 'hh:mm:ss'))
// console.log(formatDate('7:30:05', 'hh:mm:ss'))


console.log(new Date('7:30:05'));
console.log(new Date('2022-1-1'));
console.log(new Date());
console.log(new Date(null));
