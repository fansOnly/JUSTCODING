const url = 'https://open.work.weixin.qq.com/#codex=pfsuiYHSj34o30339434nnd/qrConnect?appid=wxCorpId&agentid=1000000&redirect_uri=http%3A%2F%2Fapi.3dept.com&state=web_login%40gyoss9'

const getCode = url => {
  return /\/#code=(\w+)\//.exec(url)
}


console.log(getCode(url))
