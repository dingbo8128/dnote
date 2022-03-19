---
title: Python笔记七月小问题汇总
date: 2021-07-12 16:05:16

categories: python
---

<div class="biblewords">
鼎为炼银，炉为炼金，惟耶和华熬炼人心。
</div>

## DateTime 转毫秒

将 python 的 Datetime 转为毫秒数

```python
import datetime
now = datetime.datetime.now()
ts = int(now.timestamp() * 1000)
```

## 读写文件

```python
with open('test.txt', 'r+', encoding='utf8') as f:
    lines = f.readlines() # 带末尾换行
    content = f.read()
    f.writelines(lines) # 不会自动追加换行
    f.seek(0, 0) # 移动指针到文件头
    f.write(s)
```

1. 如果某些字符无法解析，可以忽略错误`errors='ignore'`

## 字符串操作

### 正则替换

```python
import re
s2 = re.sub(r'\d+', '', s1) # 删除所有数字
```

1. 加问号为非贪婪模式
2. 使用`\1`可指代匹配到的第一个

### 匹配不同，替换不同

第二个参数为回调函数，函数的参数是匹配对象，m.start()获取匹配的开始位置，m.end()获取匹配的结束位置

```python
s2 = re.sum(r'\d+', lambda m: f"<{s[m.start():m.end()]}>", s)
```

## 日期格式化

- %y 两位数的年份表示（00-99）
- %Y 四位数的年份表示（000-9999）
- %m 月份（01-12）
- %d 月内中的一天（0-31）
- %H 24 小时制小时数（0-23）
- %I 12 小时制小时数（01-12）
- %M 分钟数（00-59）
- %S 秒（00-59）
- %a 本地简化星期名称
- %A 本地完整星期名称
- %b 本地简化的月份名称
- %B 本地完整的月份名称
- %c 本地相应的日期表示和时间表示
- %j 年内的一天（001-366）
- %p 本地 A.M.或 P.M.的等价符
- %U 一年中的星期数（00-53）星期天为星期的开始
- %w 星期（0-6），星期天为星期的开始
- %W 一年中的星期数（00-53）星期一为星期的开始
- %x 本地相应的日期表示
- %X 本地相应的时间表示
- %Z 当前时区的名称
- %% %号本身
