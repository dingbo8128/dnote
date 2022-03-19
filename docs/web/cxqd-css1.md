---
title: 重学前端笔:css基础
date: 2021-10-21 6:33:03

  - css
  - web
categories: web
---

## @规则

1. @charset ： https://www.w3.org/TR/css-syntax-3/
2. @import ：https://www.w3.org/TR/css-cascade-4/
3. @media ：https://www.w3.org/TR/css3-conditional/
4. @page ： https://www.w3.org/TR/css-page-3/
5. @counter-style ：https://www.w3.org/TR/css-counter-styles-3
6. @keyframes ：https://www.w3.org/TR/css-animations-1/
7. @fontface ：https://www.w3.org/TR/css-fonts-3/
8. @supports ：https://www.w3.org/TR/css3-conditional/
9. @namespace ：https://www.w3.org/TR/css-namespaces-3/

## 普通规则

### 命名空间

svg 和 HTML 中都有 a 元素，我们若要想区分选择 svg 中的 a 和 HTML 中的 a，就必须用带命名空间的类型选择器

```css
@namespace svg url(http://www.w3.org/2000/svg);
@namespace html url(http://www.w3.org/1999/xhtml);

svg|a {
  stroke: blue;
  stroke-width: 1;
}

html|a {
  font-size: 40px;
}
```

### 选择器

[http://bezalelit.com/web/cxqd-css2](http://bezalelit.com/web/cxqd-css2)

### 属性

1. 普通属性
2. 变量属性： 双中线开头

   ```css
   :root {
     --main-color: #06c;
     --accent-color: #006;
   }

   /* The rest of the CSS file */
   #foo h1 {
     color: var(--main-color);
   }
   ```

## 函数

1. calc()
   ```css
   section {
     float: left;
     margin: 1em;
     border: solid 1px;
     width: calc(100% / 3 - 2 * 1em - 2 * 1px);
   }
   ```
2. max()
3. min()
4. clamp()
5. toggle()
   ```css
   ul {
     list-style-type: toggle(circle, square);
   }
   ```
6. attr()
