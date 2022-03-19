title: Go 命令行工具
date: 2021-11-05 08:50:37

## categories: go

## 配置

### 查看配置

```
go help environment
go env
```

### 使用代理

参考： https://goproxy.cn/

```sh
$ go env -w GO111MODULE=on
$ go env -w GOPROXY=https://goproxy.cn,direct
```

## module

### 初始化 module

```
go mod init example.com/greetings
```

### 使用本地依赖

```
go mod edit -replace example.com/greetings=../greetings
```

### 自动添加依赖

```
go mod tidy
```

### 基于 vendor 构建

生成 vendor 下的依赖包

```
go mod vendor
```

基于 vendor 构建

```
go build -mod=vendor
```

## Command
