function captureOne(re, str) {
  var match = re.exec(str);
  console.log('match: ', re.lastIndex);
  console.log('match: ', match);
  return match && match[1];
}

var numRe = /num=(\d+)/ig,
  wordRe = /word=(\w+)/i,
  a1 = captureOne(numRe, "num=1"),
  a2 = captureOne(wordRe, "word=1"),
  a3 = captureOne(numRe, "NUM=1"),
  a4 = captureOne(wordRe, "WORD=1");


console.log(a1)
console.log(a2)
console.log(a3)
console.log(a4)




const fs = require('fs')
const path = require('path')


console.log(path.join('../2022-02', 'a'))
