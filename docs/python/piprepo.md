---
title: 搭建私有仓库
date: 2022-02-13 21:56:40

categories: python
---

## Install

```txt
pip install pypiserver
pypi-server -p 8080 ~/packages
```

## start

```
nohup pypi-server -p 8080 --log-file /var/log/pypiserver.log  /nas/python-packages >>/dev/null 2>&1 &
```

## Publish packages

```
mv xxx.whl ~/packages
```

## Use

```
pip3 install --extra-index-url http://192.168.1.111:8080/simple xxx
```
