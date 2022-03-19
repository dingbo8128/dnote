---
title: Powershell
date: 2021-10-25 06:46:10

categories: windows
---

{% blockquote %}
你们看天上的飞鸟，也不种，也不收，也不积蓄在仓里，你们的天父尚且养活牠。你们不比飞鸟贵重得多吗？
{% endblockquote %}

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
