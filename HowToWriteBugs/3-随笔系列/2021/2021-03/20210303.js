function formatDate(date, formatter = 'YYYY-MM-DD HH:mm:ss') {
  let time, year, month, day, hour, minute, second

  if (date) {
    time = new Date(date)
    year = time.getFullYear()
    month = time.getMonth()
    day = time.getDate()
    hour = time.getHours()
    minute = time.getMinutes()
    second = time.getSeconds()

    month = month + 1
    month = month < 10 ? '0' + month : month
    day = day < 10 ? '0' + day : day
    hour = hour < 10 ? '0' + hour : hour
    minute = minute < 10 ? '0' + minute : minute
    second = second < 10 ? '0' + second : second
  }

  return formatter.replace(/Y{2,4}/, year)
    .replace(/M{2}/, month)
    .replace(/D{2}/, day)
    .replace(/[hH]{2}/, hour)
    .replace(/m{2}/, minute)
    .replace(/s{2}/, second)
}

console.log(formatDate(new Date()))
