import smtplib
from smtplib import SMTP_SSL
from email.mime.text import MIMEText
from email.mime.image import MIMEImage
from email.mime.multipart import MIMEMultipart
from email.header import Header
from email.utils import encode_rfc2231

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

# 邮件主题
# msg = MIMEMultipart()
msg = MIMEMultipart('related')  # 创建支持内嵌资源的邮件容器
msg['Subject'] = Header('Python 邮件发送测试', 'utf-8')
msg['From'] = sender
msg['To'] = receiver

# 邮件正文内容
# content = MIMEText('Python 邮件发送测试，请忽略！', 'plain', 'utf-8')
# msg.attach(content)
# html 正文
# 在HTML中使用cid:自定义ID格式标记图片占位符：
html_content = f'''
<html>
  <body>
    <p>这是嵌入的图片：</p>
    <img src="cid:image1" width="500" height="auto" style="border: 2px solid #eee">
  </body>
</html>
'''
msg.attach(MIMEText(html_content, 'html', 'utf-8'))

# 图片-正文
with open('practice/2.jpg', 'rb') as f:
    img = MIMEImage(f.read())
    img.add_header('Content-ID', '<image1>')
    msg.attach(img)

# 图片-附件
cnImageName = 'practice/头像.png'
with open(cnImageName, 'rb') as f:
    img = MIMEImage(f.read())
    encoded_filename = encode_rfc2231(cnImageName, charset='utf-8')
    img.add_header('Content-Disposition', 'attachment', filename=encoded_filename)
    msg.attach(img)

# 附件
with open('practice/1.txt', 'rb') as f:
    attach = MIMEText(f.read(), 'base64', 'utf-8')
    attach["Content-Type"] = 'application/octet-stream'
    attach["Content-Disposition"] = 'attachment; filename="1.txt"'
    msg.attach(attach)

# 登录并发送邮件
try:
    smtp = SMTP_SSL(smtp_server, smtp_port)
    smtp.login(sender, password)
    smtp.sendmail(sender, receiver, msg.as_string())
    print('邮件发送成功！')
except smtplib.SMTPException as e:
    print('邮件发送失败！', e)
finally:
    smtp.quit()