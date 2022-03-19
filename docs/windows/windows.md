---
title: Windows
date: 2021-07-13 08:13:38

  - windows
  - wsl
  - key map
  - sharpkeys
categories: windows
---

{% blockquote %}
不要为作恶的心怀不平，也不要向那行不义的生出嫉妒。因为他们如草快被割下，又如青菜快要枯干。
Fret not yourself because of evildoers; be not envious of wrongdoers! For they will soon fade like the grass and wither like the green herb.
{% endblockquote %}

## 复制目录

```ps
cp -Path tdengine-connector-by-example\book\* -Destination dingbo8128.github.io -Recurse  -force
```

## PowerShell 打开编辑器

```ps
PS C:\Users\bo> $profile
C:\Users\bo\Documents\WindowsPowerShell\Microsoft.PowerShell_profile.ps1
```

编辑 profile 文件，写入

```
New-Alias e 'C:\Program Files (x86)\Notepad++\notepad++.exe'
```

## 按键映射

用软件 sharpkeys 添加按键映射， 修改后需重启生效

原理： 修改注册表
参考： https://www.randyrants.com/category/sharpkeys/
场景： surface 没有右边的 ctrol，可以 cotext menu 键代替

## 手势

1. 三指左右扫，与 alt + tab 相同，切换窗口。
2. 三指向下，四指向下，显示桌面。
3. 三指向上，第一次还原窗口，第二次任务视图。
4. 四指向上，任务视图
5. 三指单击，搜索框
6. 双击锁定拖拽，默认没开启。点击两次，第二次不要松开，进入拖拽锁定状态，即可单指拖动。再单击解除锁定。

## 命令行

### 打开文件浏览器

```cmd
explorer .
```

### 远程桌面

```
mstsc /v:192.168.2.31:39527
```

## 资源监视器

### 查看占用文件的进程

资源监视器-CPU-关联句柄-搜索文件名

## wsl 忘记 sudo 密码

使用 root 账户登录

```
wsl --user root
```

## Taskbar 防止图表合并

1. 主屏幕, combine taskbar buttons, never
2. 其它屏幕，multiple display, combine buttons on other taskbars, never

## PowerToys

1. alt + space: PowerToys Run

## 快捷键

### 打开任务视图

win + tab

### 关闭窗口

1. alt + F4
2. alt + space 展示文件菜单，再按 C

### 调整窗口大小

1. win + up 最大化
2. win + down 最小化
3. win + d 最小化所有， 再次按还原
4. win + m 最小化所有， 再次按也不还原

## 录屏

win + G

## py.exe

位于 c:/windows/py.exe，作用是启动不同版本的 python。默认会使用最新版本的 python。

```ps
py --list
py -3
py -3.7
```

## UEFI

Surface 统一可扩展固件接口 (UEFI) 取代标准的基本输入/输出系统 (BIOS)，可实现更快的启动和更高的安全性。 你可以使用 Surface UEFI 管理 Surface 上的固件功能。

你只能在系统启动期间调整 UEFI 设置

1. 关闭 Surface，然后等待大约 10 秒钟以确保其处于关闭状态。
2. 长按 Surface 上的调高音量按钮，同时按下再松开电源按钮。
3. 屏幕上会显示 Microsoft 或 Surface 徽标。 继续按住调高音量按钮。 显示 UEFI 屏幕后，松开此按钮。

## 参考

1. https://docs.microsoft.com/zh-cn/windows-server/administration/windows-commands/windows-commands
