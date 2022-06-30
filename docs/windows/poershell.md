---
title: Powershell
date: 2021-10-25 06:46:10

categories: windows
---

## 代理

### 添加代理端口

```
netsh interface portproxy add v4tov4 listenport=6041 listenaddress=192.168.101.117 connectport=6041 connectaddress=localhost
```

### 显示代理端口

```
netsh interface portproxy show all
```

### 删除

```
netsh interface portproxy delete v4tov4 listenport=6041 listenaddress=192.168.101.117
```

## 更改脚本执行策略

```ps
set-ExecutionPolicy RemoteSigned
```

### Get-Command

作用是帮助查找命令。 运行不带任何参数的 Get-Command 会返回系统上所有命令的列表。 以下示例演示使用 Get-Command cmdlet 确定存在的用于处理进程的命令

### Get-Help

```
Get-Help del
```

### 删除

1. 删除文件`del`
2. 删除文件夹`rmdir -Force`
