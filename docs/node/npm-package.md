---
title: 记一次发布nmp包的经历
date: 2021-09-06 09:33:50

categories: node
---

{% blockquote %}
Blessed be the name of God for ever and ever, to whom belong wisdom and might.
{% endblockquote %}

## 注册 npm 账号

https://www.npmjs.com/

## 验证邮箱

若不验证邮箱，则没有发布权限。我第一次发布出现 403 错误，原因就是没有验证邮箱

## 创建 npm 包

过程省略

## 修改 registry 为官方的 registr

```
npm set registry http://registry.npmjs.org
```

## 命令行登录

```
npm login
```

## 发布

```
npm publish
```

## 最后

发布完成后，可将 registry 重新改为 taobao 的 registry：

```
npm set registry http://registry.npm.taobao.org
```

## 取消发布

如果发布之后，发现有错，可以在 24 小时之内取消.

```
npm unpublish --force
```
