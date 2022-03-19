---
title: Python正则专题
date: 2021-09-27 10:07:11

  - python
  - reg
categories:
  - python
  - reg
---

## findall

```python
import re
re.findall(r'\d+', "【xx386】")
# ['386']
```

## search

```python
m = re.search(r'\d+', "【xx386】")
m.group()
# Out[12]: '386'
```

如果没有搜索到 m 为 None
