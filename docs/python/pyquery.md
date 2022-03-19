---
title: pyquery使用笔记
date: 2021-07-04 23:26:48

  - crawler
  - pyquery
categories:
  - python
  - pyquery
---

## 基本用法

```python
from pyquery import PyQuery as pq
d = pq("<html></html>")
d = pq(url='http://google.com/')
d = pq(filename=path_to_html_file)
```

Now d is like the $ in jquery:

```python
d("#hello")
p = d("#hello")
p.html()
p.text()
```

## 示例一

### html

```html
<div class="bookList">
  <ul class="vnav">
    <li><a class="oo" href="GEN01.htm">创世记</a></li>
    <li><a class="oo" href="EXO01.htm">出埃及记</a></li>
    <li><a class="oo" href="LEV01.htm">利未记</a></li>
    <li><a class="oo" href="NUM01.htm">民数记</a></li>
    <li><a class="oo" href="DEU01.htm">申命记</a></li>
    <li><a class="oo" href="JOS01.htm">约书亚记</a></li>
    <li><a class="oo" href="JDG01.htm">士师记</a></li>
    <li><a class="oo" href="RUT01.htm">路得记</a></li>
  </ul>
</div>
```

### 代码

遍历 a 元素，获取 class 属性，href 属性和文本

```python
nav = d(".vnav")
lis = nav.children()
for i in range(lis.size()):
    a = lis[i].getchildren()[0]
    className = a.get("class")
    href = a.get("href")
    text = a.text
```

## 参考

1. https://pythonhosted.org/pyquery/
