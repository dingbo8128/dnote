---
title: Python Thread-Local objects
date: 2021-10-22 10:08:05

categories: python
---

## local

Thread-local data is data whose values are thread specific. To manage thread-local data, just create an instance of local (or a subclass) and store attributes on it

threading.local 是一个类，它的属性会使用线程本地存储

```python
mydata = threading.local()
mydata.x = 1
```

The instance’s values will be different for separate threads.
