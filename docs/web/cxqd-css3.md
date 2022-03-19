---
title: 重学前端：选择器的优先级
date: 2021-10-21 16:10:16

categories: web
---

## 选择器的连接符号

- “空格”：后代，表示选中所有符合条件的后代节点， 例如“ .a .b ”表示选中所有具有 class 为 a 的后代节点中 class 为 b 的节点。
- “>” ：子代，表示选中符合条件的子节点，例如“ .a>.b ”表示：选中所有“具有 class 为 a 的子节点中，class 为 b 的节点”。
- “~” : 后继，表示选中所有符合条件的后继节点，后继节点即跟当前节点具有同一个父元素，并出现在它之后的节点，例如“ .a~.b ”表示选中所有具有 class 为 a 的后继中，class 为 b 的节点。
- “+”：直接后继，表示选中符合条件的直接后继节点，直接后继节点即 nextSlibling。例如 “.a+.b ”表示选中所有具有 class 为 a 的下一个 class 为 b 的节点。
- “||”：列选择器，表示选中对应列中符合条件的单元格

## 复杂选择器的优先级

CSS 标准用一个三元组 (a, b, c) 来构成一个复杂选择器的优先级。

1. id 选择器的数目记为 a；
2. 伪类选择器和 class 选择器的数目记为 b；
3. 伪元素选择器和标签选择器数目记为 c；
4. “\*” 不影响优先级。
5. 行内属性的优先级永远高于 CSS 规则
6. !important 大于行内
7. 同一优先级的选择器遵循“后面的覆盖前面的”原则

```
权重 = base * base * a + base * b + c
```

base 是一个“足够大”的正整数。关于 base，历史中有些趣闻，早年 IE6 采用 256 进制，于是就产生“256 个 class 优先级等于一个 id”这样的奇葩问题，后来扩大到 65536，基本避免了类似的问题。

## 实例一

调换“.x”和“.y”我们可以得到不同的显示效果：

```html
<div id="my" class="x y">
  text
  <div></div>
</div>
```

```css
.x {
  background-color: lightblue;
}

.y {
  background-color: lightgreen;
}
```

## 实例二

选择器的优先级是针对单条规则的，多条规则的选择器同时命中元素，优先级不会发生叠加。
“.x ”和“.z ”都指定了背景色为浅蓝色，但是因为“.y ”规则在最后，所以最终显示结果为浅绿色

```html
<div id="my" class="x y z">
  text
  <div></div>
</div>
```

```css
.x {
  background-color: lightblue;
}

.z {
  background-color: lightblue;
}

.y {
  background-color: lightgreen;
}
```

## 实例三

这里选择器列表“ .x, .z”命中了 div，但是它的两项分别计算优先级，所以最终优先级仍跟“ .y” 规则相同。

```html
<div id="my" class="x y z">
  text
  <div></div>
</div>
```

```css
.x,
.z {
  background-color: lightblue;
}

.y {
  background-color: lightgreen;
}
```

## 经验

实践中，建议你“根据 id 选单个元素”“class 和 class 的组合选成组元素”“tag 选择器确定页面风格”这样的简单原则来使用选择器，不要搞出过于复杂的选择器
