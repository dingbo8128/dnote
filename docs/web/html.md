---
title: html
date: 2021-10-13 16:31:27

categories: web
---

## img

### crossorigin 属性

1. anonymous：如果使用这个值的话就会在请求中的 header 中的带上 Origin 属性，但请求不会带上 cookie 和其他的一些认证信息。
2. use-credentials：这个就同时会在跨域请求中带上 cookie 和其他的一些认证信息。
3. 不带这个属性则图片请求不带 origin 头，盗链时不能带
