/**
 * 正则判断字符重复次数不超过两次
 */

 const strIsRepeatThan2 = (str = '') => /^(?!.*(.).*\1{2})[\da-zA-Z].+$/.test(str);
 strIsRepeatThan2('123456'); // true
 strIsRepeatThan2('1234566'); // true
 strIsRepeatThan2('12345666'); // false



 /**
  * 正则匹配可以只有 0 但开头不能是 0 的数字
  */

  const getCorrectNumber = (str = '') => /^(\d|[1-9]\d*)$/.test(str);
  getCorrectNumber('0'); // true
  getCorrectNumber('011'); // false
  getCorrectNumber('101'); // true
