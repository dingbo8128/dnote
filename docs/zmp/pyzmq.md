---
title: ZMQ Python示例
date: 2021-09-26 15:28:41

  - python
  - zmq
categories: zmq
---

## install

```
pip install -i https://pypi.tuna.tsinghua.edu.cn/simple pyzmq
```

## 发送多 frame

```python
sock.send_string(topic, zmq.SNDMORE)
sock.send(data)
```

## 接收多 frame

```python
topic, bs = sock.recv_multipart()
```

## Sub

```python
sock.subscribe(b'')
```

## Ref

https://zeromq.org/languages/python/
