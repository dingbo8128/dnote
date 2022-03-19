---
title: vim
date: 2021-10-27 10:57:42

categories: tool
---

## 分割窗口

:vsplit

## 设置 tab 键

编辑.vim/vimrc

```
set ts=4
set sw=4
set expandtab
set autoindent
```

## 多行缩进和缩退

### Method One

1. n>>
2. n<<

### Method Tow

- 按 v 进入 visual 状态
- 选定多行
- 用>缩进
- 用<缩出

## 上次编辑位置

- 上次编辑位置：ctrl + O
- 刚刚编辑位置：ctrl + I

## 行号

- 添加： set nu
- 取消： set nu!

## 多行注释
