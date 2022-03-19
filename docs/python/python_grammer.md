---
title: Python语法基础
date: 2021-09-26 16:44:38

  - python
  - dataclass
  - global
  - nonlocal
categories:
  - python
  - grammer
---

## import

### 从父级模块导入

```python
parent_parent_directory/
    parent_directory/
        mymodule.py
        __init__.py
    current_directory/
        currentmodule.py
    mymodule.py
    __init__.py

from ..parent_directory import mymodule
from ...parent_parent_directory import mymodule
```

### 从嵌套子目录导入

```python
import a.b.c
x = a.b.c.foo()
```

## new 与 init

new 是分配空间的，init 是初始化的, new 的返回值会作为 init 的 self 参数

```python
class A:
    def __new__(cls, *args, **kwargs):
        print('NEW')
        return super(A, cls).__new__(cls)

    def __init__(self):
        print('INIT')
a = A()
```

## dataclass

一个 dataclass 是指“一个带有默认值的可变的 namedtuple”，广义的定义就是有一个类，它的属性均可公开访问，可以带有默认值并能被修改，而且类中含有与这些属性相关的类方法，那么这个类就可以称为 dataclass，再通俗点讲，dataclass 就是一个含有数据及操作数据方法的容器。

1. 相比普通 class，dataclass 通常不包含私有属性，数据可以直接访问
2. dataclass 的 repr 方法通常有固定格式，会打印出类型名以及属性名和它的值
3. dataclass 拥有**eq**和**hash**魔法方法
4. dataclass 有着模式单一固定的构造方式，或是需要重载运算符，而普通 class 通常无需这些工作

```python
from dataclasses import dataclass


@dataclass
class TradingDay:
    pre_day: str
    next_day: str


if __name__ == '__main__':
    d1 = TradingDay('20210922', '20210924')
    print(d1.pre_day, d1.next_day)
```

## global 与 nonlocal

1. global 的作用是将函数作用域声明的变量绑定到全局同名变量
2. noloal 的作用是将函数作用域声明的变量绑定到上层的非全局作用域同名的变量

```python
a = 100


def change():
    a = 200

    def change_local():
        nonlocal a
        a = 300

    def change_global():
        global a
        a = 400

    change_local()
    change_global()
    print('inner a ', a)


if __name__ == '__main__':
    change()
    print('global a ', a)

# inner a  300
# global a  400
```

## 迭代器

在 `__next__()` 方法中触发 StopIteration 异常来结束迭代。

```python
class MyNumbers:
  def __iter__(self):
    self.a = 1
    return self

  def __next__(self):
    if self.a <= 20:
      x = self.a
      self.a += 1
      return x
    else:
      raise StopIteration

myclass = MyNumbers()
myiter = iter(myclass)

for x in myiter:
  print(x)
```

## 生成器

生成器是一个返回迭代器的函数，只能用于迭代操作，更简单点理解生成器就是一个迭代器。在调用生成器运行的过程中，每次遇到 yield 时函数会暂停并保存当前所有的运行信息，返回 yield 的值, 并在下一次执行 next() 方法时从当前位置继续运行。

```python
import sys

def fibonacci(n): # 生成器函数 - 斐波那契
    a, b, counter = 0, 1, 0
    while True:
        if (counter > n):
            return
        yield a
        a, b = b, a + b
        counter += 1
f = fibonacci(10) # f 是一个迭代器，由生成器返回生成

while True:
    try:
        print (next(f), end=" ")
    except StopIteration:
        sys.exit()
```
