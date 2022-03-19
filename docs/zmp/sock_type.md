---
title: ZMQ支持的socket类型和协议
date: 2021-09-26 15:02:53

  - zmq
categories: zmq
---

## 通信类型

```python
import zmq
ctx = zmq.Context()
sock = ctx.socket(zmq.PUSH)
sock = ctx.socket(zmq.PULL)
sock = ctx.socket(zmq.PUB)
sock = ctx.socket(zmq.SUB)
sock = ctx.socket(zmq.REQ)
sock = ctx.socket(zmq.REP)
sock = ctx.socket(zmq.ROUTER)
sock = ctx.socket(zmq.DEALER)
```

## 协议

1. 进程内`inproc://xyz`
2. 进程间`ipc://xyz`
3. TCP`tcp://host:port`
4. PGM`pgm://host:port`

## 常用配置

```python
socket.setsockopt(zmq.RECONNECT_IVL, 250)

socket.setsockopt(zmq.TCP_KEEPALIVE, 1)
socket.setsockopt(zmq.TCP_KEEPALIVE_CNT, 3)
socket.setsockopt(zmq.TCP_KEEPALIVE_IDLE, 1)
socket.setsockopt(zmq.TCP_KEEPALIVE_INTVL, 1)

socket.setsockopt(zmq.SNDHWM, 10000000)
socket.setsockopt(zmq.RCVHWM, 10000000)
```

## 参考

http://api.zeromq.org/
