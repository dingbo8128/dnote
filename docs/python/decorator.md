---
title: Python装饰器
date: 2021-09-23 15:24:57

categories: python
---

{% blockquote %}
{% endblockquote %}

## 理论

1. 本质是一个函数，对传入的对象做包装，又能用`@xxx`语法调用这个函数。
2. `wraps`装饰器保证装饰后的函数对象的属性和原来的一样

## 实战

### sanic 服务端检查 session

```python
from functools import wraps
from sanic.request import Request
from sanic.response import json

# session_id -> {name, access, userid}
sessions = {}

def needsession(handle):
    @wraps(handle)
    async def _func(request: Request):
        sessionid = request.cookies.get("SESSIONID")
        if not sessionid or sessionid not in sessions:
            return json({"data": {"isLogin": False}, "errorCode": '401', "errorMessage": "请先登录！", "success": True}, status=401)
        return await handle(request)

    return _func
```

### 多个位置参数

```python
def defoo(func):
    def _func(*args):
        print('begin')
        result = func(*args)
        print('end')
        return result

    return _func


@defoo
def foo(a, b):
    return a + b


print(foo(1, 2))
```
