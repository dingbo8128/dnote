---
title: 重学前端-伪元素
date: 2021-10-21 17:37:49

categories: web
---

## 伪元素

伪元素本身不单单是一种选择规则，它还是一种机制。所以本节课，我就来讲一讲伪元素机制。伪元素的语法跟伪类相似，但是实际产生的效果却是把不存在的元素硬选出来

目前兼容性达到可用的伪元素有以下几种。

- ::first-line
- ::first-letter
- ::before
- ::after

## first-line 和 first-letter

CSS 标准只要求 ::first-line 和 ::first-letter 实现有限的几个 CSS 属性，都是文本相关，这些属性是下面这些。

## 示例一

这一段代码把段落的第一行字母变为大写。注意这里的第一行指的是排版后显示的第一行，跟 HTML 代码中的换行无关。

```html
<p>
  This is a somewhat long HTML paragraph that will be broken into several lines.
  The first line will be identified by a fictional tag sequence. The other lines
  will be treated as ordinary lines in the paragraph.
</p>
```

```css
p::first-line {
  text-transform: uppercase;
}
```

## 示例二

首字母变大并向左浮动是一个非常常见的排版方式

```html
<p>
  This is a somewhat long HTML paragraph that will be broken into several lines.
  The first line will be identified by a fictional tag sequence. The other lines
  will be treated as ordinary lines in the paragraph.
</p>
```

```css
p::first-letter {
  text-transform: uppercase;
  font-size: 2em;
  float: left;
}
```

## 示例三

CSS 标准规定了 first-line 必须出现在最内层的块级元素之内

```html
<div>
  <p id="a">First paragraph</p>
  <p>Second paragraph</p>
</div>
```

```css
div > p#a {
  color: green;
}

div::first-line {
  color: blue;
}
```

这段代码最终结果第一行是蓝色，因为 p 是块级元素，所以伪元素出现在块级元素之内，所以内层的 color 覆盖了外层的 color 属性。

如果我们把 p 换成 span，结果就是相反的

```css
div > span#a {
  color: green;
}

div::first-line {
  color: blue;
}
```

这段代码的最终结果是绿色，这说明伪元素在 span 之外

## 示例四

::first-letter 的行为又有所不同，它的位置在所有标签之内，我们把前面的代码换成::first-letter。

```html
<div>
  <span id="a">First paragraph</span><br />
  <span>Second paragraph</span>
</div>
```

```css
div > span#a {
  color: green;
}

div::first-letter {
  color: blue;
}
```

执行这段代码，我们可以看到，首字母变成了蓝色，这说明伪元素出现在 span 之内。

## before 和 after

这两个伪元素跟前面两个不同的是，它不是把已有的内容套上一个元素，而是真正的无中生有，造出一个元素。

::before 表示在元素内容之前插入一个虚拟的元素，::after 则表示在元素内容之后插入。

这两个伪元素所在的 CSS 规则必须指定 content 属性才会生效，我们看下例子：

## 示例五

```html
<p class="special">I'm real element</p>
```

```css
p.special::before {
  display: block;
  content: "pseudo! ";
}
```

## 示例六

::before 和 ::after 还支持 content 为 counter

```css
<p class="special">I'm real element</p>
p.special::before {
    display: block;
    content: counter(chapno, upper-roman) ". ";
}
```

这对于实现一些列表样式是非常有用的
