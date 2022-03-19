---
title: flex布局
date: 2021-08-31 13:20:10

categories: web
---

## 容器的属性

- flex-direction, 主轴的方向, row | row-reverse | column | column-reverse;
- flex-wrap, 如果一条轴线排不下，如何换行, nowrap | wrap | wrap-reverse;
- flex-flow,flex-direction 属性和 flex-wrap 属性的简写形式，默认值为 row nowrap。
- justify-content, 在主轴上的对齐方式,flex-start | flex-end | center | space-between | space-around;
- align-items,在交叉轴上如何对齐, flex-start | flex-end | center | baseline | stretch
- align-content,多根轴线的对齐方式, flex-start | flex-end | center | space-between | space-around | stretch;

## 项目的属性

- order,项目的排列顺序。数值越小，排列越靠前，默认为 0
- flex-grow, 项目的放大比例，默认为 0，即如果存在剩余空间，也不放大
- flex-shrink, 项目的缩小比例，默认为 1，即如果空间不足，该项目将缩小
- flex-basis, 项目占据的主轴空间（main size）。浏览器根据这个属性，计算主轴是否有多余空间。它的默认值为 auto，即项目的本来大小。
- flex, lex-grow, flex-shrink 和 flex-basis 的简写，默认值为 0 1 auto。后两个属性可选
- align-self, 允许单个项目有与其他项目不一样的对齐方式，可覆盖 align-items,auto | flex-start | flex-end | center | baseline | stretch;
