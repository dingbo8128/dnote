---
title: Linux Note 2108
date: 2021-07-27 14:24:30
tag: [history, sudo， apt, dpkg]
categories: linux
---

## 搜索历史命令

Ctrl + r

## sudo

* -E: 用户可以在sudo执行时保留当前用户已存在的环境变量，不会被sudo重置

## apt 

1. 自动修复依赖关系：`apt install -f`
2. 更新系统存储库索引： `apt update`

## dpkg 

1. 安装本地deb包: `dpkg -i xxx.deb`
