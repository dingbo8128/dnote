---
title: 重学前端笔记-head
date: 2021-10-21 06:46:41

  - web
  - html
  - head
categories: web
---

{% blockquote %}
这世界和其上的情欲都要过去，惟独遵行神旨意的，是永远常存。
{% endblockquote %}

## title

title 作为元信息，可能会被用在浏览器收藏夹、微信推送卡片、微博等各种场景，这时侯往往是上下文缺失的，所以 title 应该是完整地概括整个网页内容的。

## base

base 标签实际上是个历史遗留标签。它的作用是给页面上所有的 URL 相对地址提供一个基础。

## meta

### charset

```html
<meta charset="UTF-8" />
```

### name and content

```html
<meta
  name="viewport"
  content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no"
/>
```

支持的其它 name：

1. author: 页面作者。
2. description：页面描述，这个属性可能被用于搜索引擎或者其它场合。
3. generator: 生成页面所使用的工具，主要用于可视化编辑器，如果是手写 HTML 的网页，不需要加这个 meta。
4. keywords: 页面关键字，对于 SEO 场景非常关键。
5. referrer: 跳转策略，是一种安全考量。
6. theme-color: 页面风格颜色，实际并不会影响页面，但是浏览器可能据此调整页面之外的 UI（如窗口边框或者 tab 的颜色）

### http-dquiv

```html
<meta http-equiv="content-type" content="text/html; charset=UTF-8" />
```

除 content-type 外，还支持：

1. content-language 指定内容的语言；
2. default-style 指定默认样式表；
3. refresh 刷新；
4. set-cookie 模拟 http 头 set-cookie，设置 cookie；
5. x-ua-compatible 模拟 http 头 x-ua-compatible，声明 ua 兼容性；
6. content-security-policy 模拟 http 头 content-security-policy，声明内容安全策略

## link

```html
<link rel="stylesheet" type="text/css" href="/style.css" />
```
