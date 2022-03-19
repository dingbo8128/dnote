---
title: python的defaultdict简介
date: 2021-08-10 15:02:02

categories: python
---

{% blockquote %}
{% endblockquote %}

## 使用场景

一个 key 对应多个 value。本质上是使用集合作为 value。作为 value 的集合类型可以自己指定。
之所以叫 defaultdict 是因为每个 key 都会用 default_factory 创建默认值。

## 构造函数

```
defaultdict(default_factory)
```

default_factory 可以是`list`或`set`或其它集合类

## 示例

```python
from collections import defaultdict

d1 = defaultdict(list)
# 如果为list，必须使用append方法添加元素
d1["k1"].append(1)
d1['k1'].append(2)
d1['k2'].append(3)

for k, v in d1.items():
    print(k, v)

d2 = defaultdict(set)
# 如果为set，必须用add方法添加元素
d2["k1"].add(1)
d2['k1'].add(2)
d2['k2'].add(3)

for k, v in d2.items():
    print(k, v)

# 输出
# k1 [1, 2]
# k2 [3]
# k1 {1, 2}
# k2 {3}
# True

```
