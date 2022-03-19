---
title: Python字典专题
date: 2021-09-27 10:49:30

  - python
  - dict
categories:
  - python
  - dict
---

## 排序

```python
sorted_items = sorted(metas.items(), key=lambda x: int(x[0]))
metas = dict(sorted_items)
```
