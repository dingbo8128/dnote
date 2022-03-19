---
title: mongo查询
date: 2021-08-03 10:16:53

categories:
  - mongo
  - 查询
---

{% blockquote %}
{% endblockquote %}

### 存在某个字段

```js
{
    $match: {
        'name1.name2': {
            $exists: true
        }
    }
}
```

### 数组包含

```js
{
    "users": {
        $elemMatch: {
            $eq: "xiaoming"
        }
    }
}
```

### 插入

#### 插入当前时间

```js
{
    "createdAt": new Date()
}
```

### filter

#### or
