---
title: css常用单位
date: 2021-07-02 13:20:10

categories: web
---

<div class="biblewords">
已有的事，后必再有。已行的事，后必再行。日光之下，并无新事。
</div>

### PX

px 像素（Pixel）。相对长度单位。像素 px 是相对于显示器屏幕分辨率而言的。

### EM

em 是相对长度单位。相对于当前对象内文本的字体尺寸。如当前对行内文本的字体尺寸未被人为设置，则相对于浏览器的默认字体尺寸。

1. em 的值并不是固定的；
2. em 会继承父级元素的字体大小。
3. 任意浏览器的默认字体高都是 16px。所有未经调整的浏览器都符合: 1em=16px。

### REM

rem 是 CSS3 新增的一个相对单位（root em，根 em）, 区别在于使用 rem 为元素设定字体大小时，仍然是相对大小，但相对的只是 HTML 根元素。这个单位可谓集相对大小和绝对大小的优点于一身，通过它既可以做到只修改根元素就成比例地调整所有字体大小，又可以避免字体大小逐层复合的连锁反应

### vh

相对于窗口的高度。窗口被均分为 100 单位的 vh。 100vh 相当于 100%。
