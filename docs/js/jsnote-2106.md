---
title: Javascript开发笔记
date: 2021-06-16 16:37:15

  - moment
  -
categories: js
---

<html>
<div style="font-family: KaiTi, STXingkai, SimHei,serif;box-shadow: 0px 0px 12px #777777;background-color: rgba(250, 255, 242, 0.3); padding: 5px 20px; font-size: 16px; border-radius: 5px;">
    Now the serpent was more crafty than any other beast of the field that the Lord God had made. He said to the woman, "Did God actually say, 'You shall not eat of any tree in the garden'?" (Genesis 3:1 ESV)
</div>
</html>

## 解析 url 参数

```js
function getUrlVars() {
  var vars = {};
  var parts = window.location.href.replace(
    /[?&]+([^=&]+)=([^&]*)/gi,
    function (m, key, value) {
      vars[key] = value;
    }
  );
  return vars;
}
```

## 时间处理

### 7 天前

```js
import moment from "moment";
moment(Date.now() - 7 * 24 * 3600 * 1000).format("YYYY-MM-DD");
```

### moment 官网示例

#### Format Dates

```js
> moment().format('MMMM Do YYYY, h:mm:ss a');
'June 18th 2021, 1:32:10 pm'
> moment().format('dddd');
'Friday'
> moment().format("MMM Do YY");
'Jun 18th 21'
> moment().format('YYYY [escaped] YYYY');
'2021 escaped 2021'
> moment().format();
'2021-06-18T13:32:29+08:00'
```

#### Relative Time

```js
moment("20111031", "YYYYMMDD").fromNow();
moment("20120620", "YYYYMMDD").fromNow();
moment().startOf("day").fromNow();
moment().endOf("day").fromNow();
moment().startOf("hour").fromNow();
```

#### Calendar Time

```js
moment().subtract(10, "days").calendar();
moment().subtract(6, "days").calendar();
moment().subtract(3, "days").calendar();
moment().subtract(1, "days").calendar();
moment().calendar();
moment().add(1, "days").calendar();
moment().add(3, "days").calendar();
moment().add(10, "days").calendar();
```

## package.json

### script 中 version 占位符

```json
  "scripts": {
    "echoverion": "echo $npm_package_version"
  },
```

## 浅复制

```js
a = { ...b };
```

## 对象转数组

```js
Object.keys(obj).map((k) => k);
```

## Hash

```js
function hashcode(obj) {
  const s = JSON.stringify(obj);
  let hash = 0,
    i,
    chr,
    len;
  if (s.length === 0) return hash;
  for (i = 0, len = s.length; i < len; i++) {
    chr = s.charCodeAt(i);
    hash = (hash << 5) - hash + chr;
    hash |= 0; // Convert to 32bit integer
  }
  return hash;
}
```

## 服务端允许跨域

```js
res.setHeader("Access-Control-Allow-Origin", "*");
```

## key 为数字的对象

```js
let a = { 1: 1, 2: 4, 3: 9 };
```

- 遍历时数字 key 自动转为字符串
- 访问可以用数字，a[1]

## 参考

- [1] https://momentjs.com/
