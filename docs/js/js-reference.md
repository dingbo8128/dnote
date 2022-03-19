---
title: JavaScript参考-Date, Array
date: 2021-07-20 17:32:17

  - Date
  - Array
categories: js
---

{% blockquote %}
{% endblockquote %}

## 内置对象

### Date

1. Date.getTime()获取的是与时区无关的时间戳

### Array

#### map

```js
var new_array = arr.map(function callback(currentValue[, index[, array]]) {
    // Return element for new_array
} [, thisArg])
```

**参数**

- callback 有 3 个参数
  - currentValue： callback 数组中正在处理的当前元素。
  - index 可选： callback 数组中正在处理的当前元素的索引。
  - array 可选：map 方法调用的数组。
- thisArg 可选： 执行 callback 函数时值被用作 this。

#### every

```js
arr.every(callback(element[, index[, array]])[, thisArg])
```

**参数**
同 map
**返回值**
如果回调函数的每一次返回都为 true 值，返回 true ，否则返回 false。
**示例**

```js
function isBigEnough(element, index, array) {
  return element >= 10;
}
[12, 5, 8, 130, 44].every(isBigEnough); // false
[12, 54, 18, 130, 44].every(isBigEnough); // true
```

#### find

方法返回数组中满足提供的测试函数的第一个元素的值。否则返回 undefined。

#### findIndex

方法返回数组中满足提供的测试函数的第一个元素的索引。若没有找到对应元素则返回-1。

#### splice

The splice() method changes the contents of an array by removing or replacing existing elements and/or adding new elements in place

```json
const months = ['Jan', 'March', 'April', 'June'];
months.splice(1, 0, 'Feb');
// inserts at index 1
console.log(months);
// expected output: Array ["Jan", "Feb", "March", "April", "June"]

months.splice(4, 1, 'May');
// replaces 1 element at index 4
console.log(months);
// expected output: Array ["Jan", "Feb", "March", "April", "May"]
```

## 参考

1. https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference
2. https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/splice
