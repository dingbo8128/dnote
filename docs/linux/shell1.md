---
title: Linux Note 2107
date: 2021-05-18 14:24:30

categories: linux
---

## 脚本

### centos8 添加防火墙开放端口

```bash
#!/bin/bash

####### Get the ServiceName, Port, PortType used by Firewalld Serivce
read -p $'\e[32mType in the ServiceName, Port and PortType(TCP by default) you want to add into FW by format "ServiceName startPort-endPort PortType":\e[0m' -t 30 Service Port PortType
STATUS=$?

####### Exit when read timeout
if [[ $STATUS -ne 0 ]]; then
    exit 1
fi

####### use "tcp" by default for PortType
PortType=${PortType:-tcp}

####### Create Service File for firewalld
cat > /usr/lib/firewalld/services/${Service}.xml << EOF
<?xml version="1.0" encoding="utf-8"?>

<service>
    <short>${Service}</short>
    <description>${Service}.</description>
    <port protocol="${PortType}" port="${Port}"/>
</service>
EOF
sleep 5
####### Reload Firewalld Service
firewall-cmd --permanent --add-service=${Service}
systemctl reload firewalld
```

## 命令

### pstree

#### centos 安装

```bash
yum install psmisc
```

#### 查看进程树

```bash
pstree -p pid
```

### 查看 CPU 信息

lscpus

### ssh

#### 正向代理

远程端口映射到其他机器

```bash
ssh -L 0.0.0.0:8080:remotehost:800 user@remotehost
```

本地端口通过跳板映射到其他机器

```bash
ssh -L 0.0.0.0:PortA:HostC:PortC  user@HostB
```

#### 反向代理

HostA 将自己可以访问的 HostB:PortB 暴露给外网服务器 HostC:PortC，在 HostA 上运行。

> sshd_config: GatewayPorts yes

```bash
ssh -R HostC:PortC:HostB:PortB  user@HostC
```

### xargs

- -I 后面是占位符

```bash
ls | xargs -n1 -I {}  wc -l {}/10003016.SSE.csv
```

### mail

```bash
mail -s "主题" -v -a ./附件.txt name@gmail.com
```

### watch

#### 每隔 1 秒监控 python 进程变化

```
watch -n 1 -d 'ps xg | grep python3 | grep -v grep'
```

## 服务

### ftp 服务

```bash
yum install vsftpd
systemctl status vsftpd
```

#### 匿名(无密码)访问配置

```
anonymous_enable=YES
no_anon_password=YES
local_enable=NO
write_enable=NO
local_umask=022
dirmessage_enable=YES
connect_from_port_20=YES
idle_session_timeout=6000
data_connection_timeout=1200
chroot_local_user=YES
chroot_list_enable=YES
listen=YES
listen_ipv6=NO
anon_root=/mnt/disk01/share_data
pam_service_name=vsftpd
userlist_enable=NO
```

### samba 服务

#### 安装和启动

```bash
# 安装
yum install samba
# 加防火墙规则
firewall-cmd --add-service samba --permanent
# 启动
systemctl start smb
# 查看服务状态
systemctl status smb
```

#### 配置

主配置文件是 smb.conf，默认在/etc/samba/目录下。smb.conf 含有多个段，每个段代表一个共享资源。
方括号中为段名,例如配置文件中默认包含的 2 个段 global 和 home。

```
[global]
        workgroup = SAMBA
        security = user

        passdb backend = tdbsam

        printing = cups
        printcap name = cups
        load printers = yes
        cups options = raw

[homes]
        comment = Home Directories
        valid users = %S, %D%w%S
        browseable = No
        read only = No
        inherit acls = Yes
```

homes 段的作用是共享 samba 用户的 home 目录。比如我把自己加入到 samba 用户中，那么我就可以在别的电脑上访问我在服务器上的 home 目录。

**security**

默认 security = user

设置用户验证方式，有多种选项，记录其中两种

- share：表示匿名登录，不需要 samba 账户就可登陆 samba 服务器。即用户访问 Samba Server 不需要提供用户名和口令, 安全性能较低。
- user：表示系统账户要先添加进 samba 库然后变成 samba 用户，使用 samba 用户来登陆，简单来讲就是需要使用用户密码登录。Samba Server 共享目录只能被授权的用户访问,由 Samba Server 负责检查账号和密码的正确性。账号和密码要在本 Samba Server 中建立。安全性能适中。

#### 添加系统用户称为 samba 用户

```
smbpasswd -a username
```

#### 在 windows 机器上删除已经建立的连接

错误消息： 不允许一个用户使用一个以上用户名与一个服务器或共享资源的多重连接。中断与此服务器或共享资源的所有连接，然后再试一次。

```
net use * /del /y
```

## 参考

- [1] https://www.unixmen.com/howto-add-ftp-users-for-vsftp/
-
