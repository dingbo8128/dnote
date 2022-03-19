---
title: JavaScript参考-Date, Array
date: 2021-07-20 17:32:17

  - Object
categories: js
---

{% blockquote %}
{% endblockquote %}

## Object

### assign

#### 语法

> Object.assign(target, ...sources)
> 返回目标对象
>
> 如果目标对象中的属性具有相同的键，则属性将被源对象中的属性覆盖。后面的源对象的属性将类似地覆盖前面的源对象的属性。Object.assign 方法只会拷贝源对象自身的并且可枚举的属性到目标对象。

#### 示例

##### 复制一个对象

```js
const obj = { a: 1 };
const copy = Object.assign({}, obj);
console.log(copy); // { a: 1 }
```

##### 合并对象属性

```js
const o1 = { a: 1, b: 1, c: 1 };
const o2 = { b: 2, c: 2 };
const o3 = { c: 3 };

const obj = Object.assign({}, o1, o2, o3);
console.log(obj); // { a: 1, b: 2, c: 3 }
```

## 参考

https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/assign
