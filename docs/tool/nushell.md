---
title: Nushell
date: 2021-06-23 07:58:43

categories: tool
---

<html>
<div class="biblewords">
凡从神生的，就胜过世界；使我们胜过世界，就是我们的信心。
</div>
</html>

## Nushell 简介

The goal of this project is to take the Unix philosophy of shells, where pipes connect simple commands together, and bring it to the modern style of development.

## 安装

### 二进制安装包

https://github.com/nushell/nushell/releases

### 命令行安装

```
cargo install nu
brew install nushell
```

## 启动

```
nu
```

## 命令

### 常用

```
ls | sort-by size | reverse
ls | where size > 1kb
ps | where cpu > 10
date to-table
sys
sys | get disks
sys | get host
```

### open

```
D:\dev\bezalelit\homepage(master)> open .\package.json
───┬───────────┬─────────┬─────────┬─────────────────────────────────┬───────────────┬──────────────────
 # │   name    │ version │ private │             scripts             │     hexo      │   dependencies
───┼───────────┼─────────┼─────────┼─────────────────────────────────┼───────────────┼──────────────────
 0 │ hexo-site │ 0.0.0   │ true    │ [row build clean deploy server] │ [row version] │ [row 11 columns]
───┴───────────┴─────────┴─────────┴─────────────────────────────────┴───────────────┴──────────────────
```

### fetch

获取 url 数据

### Working with lists

```
D:\dev\bezalelit\homepage\source\_posts(master)> let names = [Mark Tami Amanda Jeremy]
D:\dev\bezalelit\homepage\source\_posts(master)> echo $names | each { build-string "Hello, " $it "!" }
───┬────────────────
 0 │ Hello, Mark!
 1 │ Hello, Tami!
 2 │ Hello, Amanda!
 3 │ Hello, Jeremy!
```

## 参考

- [1] https://www.nushell.sh/book/
