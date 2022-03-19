---
title: MongoDB运维
date: 2021-07-27 10:02:16

categories:
  - mongo
  - 运维
---

{% blockquote %}
{% endblockquote %}

## 配置

### 基本配置

- 默认端口： 27017
- ubuntu 默认配置文件路径：/etc/mongod.conf
- 默认数据文件路径： /var/lib/mongodb
- 远程无密码访问： 修改配置文件 监听 0.0.0.0 并开放 27017 端口

### 添加管理员账号，并开启登陆验证

admin 库的用户均为管理员账号。管理员账号用于创建其他用户账号。管理员账号也可以拥有其他数据库的读写权限。

```js
// 创建超级管理员账号，可以读写任意数据库
use admin
db.createUser(
  {
    user: "myUserAdmin",
    pwd: passwordPrompt(), // or cleartext password
    roles: [ { role: "userAdminAnyDatabase", db: "admin" }, "readWriteAnyDatabase" ]
  }
)
```

修改 mongod.conf,添加

```
security.authorization: enabled
```

### 添加普通账号

```js
use test
db.createUser(
  {
    user: "myTester",
    pwd:  passwordPrompt(),   // or cleartext password
    roles: [ { role: "readWrite", db: "test" },
             { role: "read", db: "reporting" } ]
  }
)

```

### 连接字符串

1. mongodb://[username:password@]host1[:port1],...hostN[:portN]]][/[database][?options]]
2. mongodb://mongodb0.example.com:27017/admin
3. mongodb://myDBReader:myPassw0rd@mongodb0.example.com:27017/admin
4. mongodb://mongodb0.example.com:27017,mongodb1.example.com:27017,mongodb2.example.com:27017/admin?replicaSet=myRepl

### 常用命令

- 启动服务 service mongod start
- 不作为服务启动 mongod --port 27017 --dbpath /var/lib/mongodb
- 启动时开启验证模式 mongod --auth --port 27017 --dbpath /var/lib/mongodb
- 本地登陆 1.mongo 2. db.auth('anme', 'pwd')
- 本地带验证登陆 mongo --port 27017 --authenticationDatabase "admin" -u "myUserAdmin" -p
- 远程登陆 mongo --host xxx --port 27017
- 普通账号登陆 mongo --port 27017 -u "myTester" --authenticationDatabase "test" -p
- 查看库 show dbs
- 切换库 use dbname
- 查看集合 show collections
