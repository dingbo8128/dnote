---
title: Install Python
date: 2022-01-19 18:05:08

categories: python
---

## Centos

```sh
wget https://www.python.org/ftp/python/3.8.12/Python-3.8.12.tgz
tar -xzvf Python-3.8.12.tgz
sudo yum -y update
sudo yum -y groupinstall "Development Tools"
sudo yum  -y install zlib zlib-devel
sudo yum install openssl-devel
cd Python-3.8.12
./configure --enable-optimizations --with-ensurepip=install   --with-ssl-default-suites=openssl
make -j 8
sudo make altinstall
```
