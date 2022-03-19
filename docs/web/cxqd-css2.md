---
title: 重学前端:选择器
date: 2021-10-21 16:05:53

categories: web
---

## id 选中器和 class 选择器

```css
#myid {
  stroke: blue;
  stroke-width: 1;
}

.mycls {
  font-size: 40px;
}
```

## 属性选择器

- [attr]
- [attr=value]
- [attr~=value]

## 伪类选择器

伪类选择器是一系列由 CSS 规定好的选择器

### 树结构关系伪类选择器

- :root 树的根元素
- :empty 伪类表示没有子节点的元素
- :nth-child

```css
  :nth-child(even) 选中偶数节点;
  :nth-child(4n-1) 选中第3个、第7个、第11个节点;
  :nth-child(3n+1 of li.important) 选中第1个、第4个、第7个li.important,
  注意这里只有li.important会被计数;
```

- :nth-last-child
- :first-child
- :last-child
- :only-child

### 链接与行为伪类选择器

- :any-link 表示任意的链接，包括 a、area 和 link 标签都可能匹配到这个伪类。
- :link 表示未访问过的链接。
- :visited 表示已经访问过的链接。
- :hover 表示鼠标悬停在上的元素。
- :active 表示用户正在激活这个元素，如用户按下按钮，鼠标还未抬起时，这个按钮就处于激活状态。
- :focus 表示焦点落在这个元素之上。
- :target 用于选中浏览器 URL 的 hash 部分所指示的元素。

### 逻辑伪类选择器

```css
*|*: not(: hover);
```

### 其它伪类选择器

- dir
- lang
- play
- pause
- current
- past
- future
- nth-col
- nth-last-col
