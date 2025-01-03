/**
 * 利用正则表达式匹配页面链接
 */
function matchLinks() {
  const links = document.getElementsByTagName('a');
  const pattern = /https?:\/\/[^\s]+/;
  const matches = [];
  for (let i = 0; i < links.length; i++) {
    const href = links[i].getAttribute('href');
    if (href && pattern.test(href)) {
      matches.push(href);
    }
  }
  return matches;
}

// 测试
const links = matchLinks();
console.log(links); // ['https://www.baidu.com', 'https://www.google.com', 'https://www.github.com']