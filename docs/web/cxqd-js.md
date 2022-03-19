---
title: 重学前端笔记-js
date: 2021-10-14 17:16:30

  - js
  - web
categories: web
---

## 运行时类型

运行时类型是代码实际执行过程中我们用到的类型。所有的类型数据都会属于 7 个类型之一。从变量、参数、返回值到表达式中间结果，任何 JavaScript 代码运行过程中产生的数据，都具有运行时类型。

1. Undefined；
   1. undifined 是一个变量
2. Null；
   1. null 是关键字
3. Boolean；
   1. true
   2. false
4. String；
   1. String 的意义并非“字符串”，而是字符串的 UTF16 编码，我们字符串的操作 charAt、charCodeAt、length 等方法针对的都是 UTF16 编码
   2. String 有最大长度是 2^53 - 1
   3. 字符串的最大长度，实际上是受字符串的编码长度影响的
   4. 0-65536（U+0000 - U+FFFF）的码点被称为基本字符区域（BMP）
   5. JavaScript 字符串把每个 UTF16 单元当作一个字符来处理
5. Number；
   1. JavaScript 中的 Number 类型有 18437736874454810627(即 2^64-2^53+3) 个值
   2. JavaScript 中的 Number 类型基本符合 IEEE 754-2008 规定的双精度浮点数规则
   3. NaN，占用了 9007199254740990
   4. Infinity，无穷大
   5. -Infinity，负无穷大
   6. JavaScript 中有 +0 和 -0,
6. Symbol；
7. Object。

## 特例

1. typeof function = object
2. typeof null = object

## 面向对象

任何语言运行时类的概念都是被弱化的

对象的特点：

1. 唯一标识
2. 状态
3. 行为

在实现了对象基本特征的基础上, 我认为，JavaScript 中对象独有的特色是：对象具有高度的动态性，这是因为 JavaScript 赋予了使用者在运行时为对象添改状态和行为的能力。

实际上 JavaScript 对象的运行时是一个“属性的集合”，属性以字符串或者 Symbol 为 key，以数据属性特征值或者访问器属性特征值为 value。

### 属性

数据属性的特征

1. value：就是属性的值。
2. writable：决定属性能否被赋值。
3. enumerable：决定 for in 能否枚举该属性。
4. configurable：决定该属性能否被删除或者改变特征值

```js
var o = { a: 1 };
Object.defineProperty(o, "b", {
  value: 2,
  writable: false,
  enumerable: false,
  configurable: true,
});
//a和b都是数据属性，但特征值变化了
Object.getOwnPropertyDescriptor(o, "a"); // {value: 1, writable: true, enumerable: true, configurable: true}
Object.getOwnPropertyDescriptor(o, "b"); // {value: 2, writable: false, enumerable: false, configurable: true}
o.b = 3;
console.log(o.b); // 2
```

访问器属性的特征

1. get：函数或 undefined，在取属性值时被调用。
2. set：函数或 undefined，在设置属性值时被调用。
3. enumerable：决定 for in 能否枚举该属性。
4. configurable：决定该属性能否被删除或者改变特征值

```js
var o = {
  get a() {
    return 1;
  },
};
console.log(o.a); // 1
Object.getOwnPropertyDescriptor(o, "a");
// {set: undefined, enumerable: true, configurable: true, get: ƒ}
```

## ES6 对象

1. Object.create 根据指定的原型创建新对象，原型可以是 null；
2. Object.getPrototypeOf 获得一个对象的原型；
3. Object.setPrototypeOf 设置一个对象的原型。

```js
var cat = {
  say() {
    console.log("meow~");
  },
  jump() {
    console.log("jump");
  },
};

var tiger = Object.create(cat, {
  say: {
    writable: true,
    configurable: true,
    enumerable: true,
    value: function () {
      console.log("roar!");
    },
  },
});

var anotherCat = Object.create(cat);

anotherCat.say();

var anotherTiger = Object.create(tiger);

anotherTiger.say();
```

## ES6 之前用构造器模拟类

用构造器模拟类的两种方法

```js
function c1() {
  this.p1 = 1;
  this.p2 = function () {
    console.log(this.p1);
  };
}
var o1 = new c1();
o1.p2();

function c2() {}
c2.prototype.p1 = 1;
c2.prototype.p2 = function () {
  console.log(this.p1);
};

var o2 = new c2();
o2.p2();
```

## ES6 类

```js
class Rectangle {
  constructor(height, width) {
    this.height = height;
    this.width = width;
  }
  // Getter
  get area() {
    return this.calcArea();
  }
  // Method
  calcArea() {
    return this.height * this.width;
  }
}
```
