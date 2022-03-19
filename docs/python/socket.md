---
title: python socket
date: 2021-10-09 11:34:08

categories: python
---

## 检测 TCP 端口

```python
import socket


def is_port_in_use(addr, port):
    with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
        return s.connect_ex((addr, port)) == 0


if __name__ == '__main__':
    for i in range(103, 255):
        _addr = "192.168.2." + str(i)
        suc = is_port_in_use(_addr, 2221)
        print(_addr, suc)
```
