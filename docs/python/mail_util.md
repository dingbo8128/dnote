---
title: Python发送邮件带附件
date: 2021-05-31 17:12:13

  - smtplib
categories:
  - python
---

_“他使太阳照恶人，也照好人；降雨给义人，也给不义的人。”_

## mail_util.py

```python
import os
import smtplib
import socket
import threading
from email import encoders
from email.header import Header
from email.mime.base import MIMEBase
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText


class MailUtil:
    def __init__(self):
        self.from_addr = 'abcd@qq.com'
        self.host_name = socket.gethostname()
        self.smtp_host = 'smtp.exmail.qq.com'
        self.smtp_port = '465'
        self.smtp_auth_user = 'abcd@qq.com'
        self.smtp_password = 'password'
        self.receivers = ['xiaoming']

    def create_smtp_obj(self):
        server = smtplib.SMTP_SSL(self.smtp_host, self.smtp_port)
        server.login(self.smtp_auth_user, self.smtp_password)
        return server

    def sent_msg(self, title: str, msg: str = ''):
        try:
            msg = MIMEText(msg, 'plain', 'utf-8')
            msg['From'] = self.host_name
            msg['Subject'] = self.host_name + ":" + title
            server = self.create_smtp_obj()
            if server is not None:
                server.sendmail(self.from_addr, self.receivers, msg.as_string())
                server.quit()
        except Exception as e:
            print(e)

    def send_msg_async(self, title: str, msg: str = ''):
        t = threading.Thread(target=self.sent_msg, args=(title, msg))
        t.start()

    def send_msg_with_files(self, title: str, text_content: str, attach_dir: str):
        try:
            msg = MIMEMultipart()
            msg['From'] = Header(self.host_name, 'utf-8')
            msg['Subject'] = Header(self.host_name + ":" + title, 'utf-8')

            msg.attach(MIMEText(text_content, 'plain', 'utf-8'))

            for filename in os.listdir(attach_dir):
                print(filename)
                part = MIMEBase('application', "octet-stream")
                part.set_payload(open(os.path.join(attach_dir, filename), "rb").read())
                encoders.encode_base64(part)
                part.add_header('Content-Disposition', 'attachment; filename="%s"' % os.path.basename(filename))
                msg.attach(part)

            server = self.create_smtp_obj()
            if server is not None:
                server.sendmail(self.from_addr, self.receivers, msg.as_string())
                server.quit()
        except Exception as e:
            print(e)
```
