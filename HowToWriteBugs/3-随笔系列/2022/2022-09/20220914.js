function dateFormatter(val) {
  return val.replace(/(\d{4})(\d{2})(\d{2})/, '$1-$2-$3')
}

console.log(dateFormatter('20220109'))
