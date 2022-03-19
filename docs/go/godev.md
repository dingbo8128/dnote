---
title: Go开发环境配置
date: 2021-10-31 12:11:50

categories: go
---

## Linux 安装

```
wget https://studygolang.com/dl/golang/go1.17.2.linux-amd64.tar.gz
rm -rf /usr/local/go && tar -C /usr/local -xzf go1.17.2.linux-amd64.tar.gz
export PATH=$PATH:/usr/local/go/bin
```

## GOPROXY

```bash
export GOPROXY=https://goproxy.io,direct
```

## vscode 安装插件

插件名字： Go
https://marketplace.visualstudio.com/items?itemName=golang.go

## 安装多个版本

https://time.geekbang.org/column/article/427489

## 安装 gopls

```
go install golang.org/x/tools/gopls@latest
```

## go 项目布局

### 多个可执行程序

```go
cmd/
    app1/
        main.go
    app2/
        main.go
go.mod
go.sum
internal/
    paga
        pkg_a.go
    pagb
        pkb_b.go
pkg1/
    pkg1.go
pkg2/
    pkg2.go
vendor/
```

vendor 目录是可选目录，为了兼容 Go1.5 引入的 vendor 构建模式而存在。

internal 目录下的包只能被本项目导入，项目外包无法导入。

Go1.11 版本引文的 go module 构建机制，使项目构建彻底摆脱 GOPATH 的束缚，实现精准的可重现构建。

### 只有一个可执行程序

可省略 cmd 目录

```go
main.go
go.mod
go.sum
internal/
    paga
        pkg_a.go
    pagb
        pkb_b.go
pkg1/
    pkg1.go
pkg2/
    pkg2.go
```

### 没有可执行程序的库项目

库项目，只对外部暴露 api

```go
go.mod
go.sum
internal/
    paga
        pkg_a.go
    pagb
        pkb_b.go
pkg1/
    pkg1.go
pkg2/
    pkg2.go
```

### 只有一个包的库项目

```go
feature1.go
feature2.go
go.mod
internal/
```

## module 构建机制

### 导入包含版本号

主版本号可以出现在导入路径中

```go
import "github.com/sirupsen/logrus/v2"
```

### 最小版本选择原则

A 依赖 C 的 1.3.0 版本， B 依赖 C 的 1.1.0 版本，C 最新的版本是 1.7.0，那么 go 会为开发者自动选择哪个 C 的
