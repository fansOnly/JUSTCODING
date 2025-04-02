import requests
from bs4 import BeautifulSoup
import random
import smtplib
from smtplib import SMTP_SSL
from email.mime.text import MIMEText
from email.header import Header

# 邮件服务器地址
smtp_server ='smtp.qq.com'
# 邮件服务器端口
smtp_port = 465
# 邮箱地址
sender = '251115151@qq.com'
# 邮箱密码
password = 'zyyehtajhpcnbihb'
# 收件人地址
receiver = 'fans_only@163.com'

user_agent = [
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
  "Mozilla/5.0 (Macintosh; U; Intel Mac OS X 10_6_8; en-us) AppleWebKit/534.50 (KHTML, like Gecko) Version/5.1 Safari/534.50",
  "Mozilla/5.0 (Windows; U; Windows NT 6.1; en-us) AppleWebKit/534.50 (KHTML, like Gecko) Version/5.1 Safari/534.50",
  "Mozilla/5.0 (Windows NT 10.0; WOW64; rv:38.0) Gecko/20100101 Firefox/38.0",
  "Mozilla/5.0 (Windows NT 10.0; WOW64; Trident/7.0; .NET4.0C; .NET4.0E; .NET CLR 2.0.50727; .NET CLR 3.0.30729; .NET CLR 3.5.30729; InfoPath.3; rv:11.0) like Gecko",
  "Mozilla/5.0 (compatible; MSIE 9.0; Windows NT 6.1; Trident/5.0)",
  "Mozilla/4.0 (compatible; MSIE 8.0; Windows NT 6.0; Trident/4.0)",
  "Mozilla/4.0 (compatible; MSIE 7.0; Windows NT 6.0)",
  "Mozilla/4.0 (compatible; MSIE 6.0; Windows NT 5.1)",
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.6; rv:2.0.1) Gecko/20100101 Firefox/4.0.1",
  "Mozilla/5.0 (Windows NT 6.1; rv:2.0.1) Gecko/20100101 Firefox/4.0.1",
  "Opera/9.80 (Macintosh; Intel Mac OS X 10.6.8; U; en) Presto/2.8.131 Version/11.11",
  "Opera/9.80 (Windows NT 6.1; U; en) Presto/2.8.131 Version/11.11",
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_7_0) AppleWebKit/535.11 (KHTML, like Gecko) Chrome/17.0.963.56 Safari/535.11",
  "Mozilla/4.0 (compatible; MSIE 7.0; Windows NT 5.1; Maxthon 2.0)",
  "Mozilla/4.0 (compatible; MSIE 7.0; Windows NT 5.1; TencentTraveler 4.0)",
  "Mozilla/4.0 (compatible; MSIE 7.0; Windows NT 5.1)",
  "Mozilla/4.0 (compatible; MSIE 7.0; Windows NT 5.1; The World)",
  "Mozilla/4.0 (compatible; MSIE 7.0; Windows NT 5.1; Trident/4.0; SE 2.X MetaSr 1.0; SE 2.X MetaSr 1.0; .NET CLR 2.0.50727; SE 2.X MetaSr 1.0)",
  "Mozilla/4.0 (compatible; MSIE 7.0; Windows NT 5.1; 360SE)",
  "Mozilla/4.0 (compatible; MSIE 7.0; Windows NT 5.1; Avant Browser)"
]

# 发邮件
def send_mail(content):
  msg = MIMEText(content, 'html', 'utf-8')
  msg['Subject'] = Header('36氪快讯', 'utf-8')
  msg['From'] = sender
  msg['To'] = receiver
  
  try:
    smtp = SMTP_SSL(smtp_server, smtp_port)
    smtp.login(sender, password)
    smtp.sendmail(sender, receiver, msg.as_string())
    print('邮件发送成功')
  except smtplib.SMTPException as e:
    print('邮件发送失败！', e)
  finally:
    smtp.quit()


# 爬取36氪快讯
def get_36kr():
  url = 'https://36kr.com/newsflashes'
  headers = {'User-Agent': random.choice(user_agent)}
  response = requests.get(url, headers=headers)
  response = response.content.decode('utf-8', 'ignore')
  soup = BeautifulSoup(response, 'lxml')
  news = soup.find_all('a', class_='item-title')
  # print(f'36氪快讯更新：{news}')
  news_list=[]
  for new in news:
    title = new.get_text()
    href = f'https://36kr.com{new["href"]}'
    news_list.append(f'<a href="{href}">{title}</a>')
  info = '<br />'.join(news_list)
  print(f'36氪快讯更新：{info}')
  send_mail(info)
  
  
if __name__ == '__main__':
  get_36kr()