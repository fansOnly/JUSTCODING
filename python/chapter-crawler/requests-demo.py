import requests
import io
import sys
from bs4 import BeautifulSoup
import re


# res = requests.get('https://www.baidu.com')
# print(res.status_code)


# 爬取内容 - res.text
# res = requests.get('https://apiv3.shanbay.com/codetime/articles/mnvdu')

# print('status_code:', res.status_code)

# with open('novel.txt', 'w') as f:
#     f.write(res.text)



# 爬取图片 - res.content
# res = requests.get('https://www.baidu.com/img/bd_logo1.png')

# with open('baidu.png', 'wb') as f:
#     f.write(res.content)


# 爬取 html，注意编码格式 ASCII、GBK、UTF-8
# res.encoding
# headers = {
#   'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/76.0.3809.132 Safari/537.36'
# }
# res = requests.get('https://book.douban.com/top250', headers=headers)
# soup = BeautifulSoup(res.text, 'html.parser')
# print(soup.prettify())
# print(soup.find('a'))
# print(soup.find_all('a'))
# print(soup.find_all('a', class_='nbg'))
# print(soup.find('p', text=re.compile('出版社')))