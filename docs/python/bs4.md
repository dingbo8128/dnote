---
title: bs4
date: 2021-08-31 09:39:53

  - bs4
categories:
  - python
  - bs4
---

## 为什么使用 bs4

使用 PyQuery 的时候发现一个致命问题： 遍历 children 的时候，丢掉了 text 节点。

## 安装

```
pip3 install -i -i https://pypi.tuna.tsinghua.edu.cn/simple bs4
```

## 构造 soup 对象

```python
from bs4 import BeautifulSoup

with open("index.html") as fp:
    soup = BeautifulSoup(fp, 'html.parser')

soup = BeautifulSoup("<html>a web page</html>", 'html.parser')
```

## 数据类型

### Tag

tag 就代码 html 的一个标签，tag 对象有很多属性和方法

```python
soup = BeautifulSoup('<b class="boldest">Extremely bold</b>', 'html.parser')
tag = soup.b
type(tag)
# <class 'bs4.element.Tag'>
```

#### tag.name

标签名称，如 h1，p，div

```python
tag.name
```

如果改变 name，马上会“渲染”到文档上

```python
tag.name = "blockquote"
tag
# <blockquote class="boldest">Extremely bold</blockquote>
```

#### tag.attrs

```python
tag = BeautifulSoup('<b id="boldest">bold</b>', 'html.parser').b
tag['id']
# 'boldest'
tag.attrs
# {'id': 'boldest'}
```

#### tag.contens

所有子节点，作为列表返回

#### tag.children

所有子节点，作为迭代器返回

#### tag.string

If a tag has only one child, and that child is a NavigableString, the child is made available as .string:

```python
title_tag.string
# 'The Dormouse's story'
```

If a tag’s only child is another tag, and that tag has a .string, then the parent tag is considered to have the same .string as its child:

```python
head_tag.contents
# [<title>The Dormouse's story</title>]

head_tag.string
# 'The Dormouse's story'
```

#### tag.strings 和 tag.stripped_strings

所有子节点的文本，作为生成器返回

#### tag.children 与 tag.content

children 返回迭代器，content 返回 list

### NavigableString

代表一个文本片段，可以像使用 python 的 string 一样用

```python
soup = BeautifulSoup('<b class="boldest">Extremely bold</b>', 'html.parser')
tag = soup.b
tag.string
# 'Extremely bold'
type(tag.string)
# <class 'bs4.element.NavigableString'>
```

### BeautifulSoup

代表解析后的整个文档。可以像使用 tag 对象一样用它

## 修改节点

### tag.clear

Tag.clear() removes the contents of a tag:

```python
markup = '<a href="http://example.com/">I linked to <i>example.com</i></a>'
soup = BeautifulSoup(markup, 'html.parser')
tag = soup.a

tag.clear()
tag
# <a href="http://example.com/"></a>
```

### tag.decompose

Tag.decompose() removes a tag from the tree, then completely destroys it and its contents:

```python
markup = '<a href="http://example.com/">I linked to <i>example.com</i></a>'
soup = BeautifulSoup(markup, 'html.parser')
a_tag = soup.a
i_tag = soup.i

i_tag.decompose()
a_tag
# <a href="http://example.com/">I linked to</a>
```

### tag.wrap

```python
soup = BeautifulSoup("<p>I wish I was bold.</p>", 'html.parser')
soup.p.string.wrap(soup.new_tag("b"))
# <b>I wish I was bold.</b>

soup.p.wrap(soup.new_tag("div"))
# <div><p><b>I wish I was bold.</b></p></div>
```

### tag.unwrap

```python
markup = '<a href="http://example.com/">I linked to <i>example.com</i></a>'
soup = BeautifulSoup(markup, 'html.parser')
a_tag = soup.a

a_tag.i.unwrap()
a_tag
# <a href="http://example.com/">I linked to example.com</a>
```

## 导航

### find

find 只能找到符合要求的第一个标签，他返回的是一个对象

```python
soup.find('a')
soup.find('a', class_='xxx')
soup.find('a', title='xxx')
soup.find('a', id='xxx')
soup.find('a', id=re.compile(r'xxx'))
soup.find('span', text="经文")
```

### find_all

```python
soup.find_all('a')
soup.find_all('a', class_='wang')
soup.find_all('a', id=re.compile(r'xxx'))
soup.find_all('a', limit=2) 提取出前两个符合要求的a
```

```python
import re
for tag in soup.find_all(re.compile("^b")):
    print(tag.name)
# body
# b
```

```python
for tag in soup.find_all(re.compile("t")):
    print(tag.name)
# html
# title
```

```python
soup.find_all(["a", "b"])
# [<b>The Dormouse's story</b>,
#  <a class="sister" href="http://example.com/elsie" id="link1">Elsie</a>,
#  <a class="sister" href="http://example.com/lacie" id="link2">Lacie</a>,
#  <a class="sister" href="http://example.com/tillie" id="link3">Tillie</a>]
```

```python
def has_class_but_no_id(tag):
    return tag.has_attr('class') and not tag.has_attr('id')

soup.find_all(has_class_but_no_id)
# [<p class="title"><b>The Dormouse's story</b></p>,
#  <p class="story">Once upon a time there were…bottom of a well.</p>,
#  <p class="story">...</p>]
```

```python
import re
def not_lacie(href):
    return href and not re.compile("lacie").search(href)

soup.find_all(href=not_lacie)
# [<a class="sister" href="http://example.com/elsie" id="link1">Elsie</a>,
#  <a class="sister" href="http://example.com/tillie" id="link3">Tillie</a>]
```

```python
soup.find_all(string="Elsie")
# ['Elsie']

soup.find_all(string=["Tillie", "Elsie", "Lacie"])
# ['Elsie', 'Lacie', 'Tillie']

soup.find_all(string=re.compile("Dormouse"))
# ["The Dormouse's story", "The Dormouse's story"]
```

### select

css 选择器, 返回的是一个列表，列表里面都是对象。

find、find_all、select 不仅适用于 soup 对象，还适用于其他的子对象，如果调用子对象的 select 方法，那么就是从这个子对象里面去找符合这个选择器的标签

## 示例

### 示例一：简单选择

```python
soup.title
# <title>The Dormouse's story</title>

soup.title.name
# u'title'

soup.title.string
# u'The Dormouse's story'

soup.title.parent.name
# u'head'

soup.p
# <p class="title"><b>The Dormouse's story</b></p>

soup.p['class']
# u'title'

soup.a
# <a class="sister" href="http://example.com/elsie" id="link1">Elsie</a>

soup.find_all('a')
# [<a class="sister" href="http://example.com/elsie" id="link1">Elsie</a>,
#  <a class="sister" href="http://example.com/lacie" id="link2">Lacie</a>,
#  <a class="sister" href="http://example.com/tillie" id="link3">Tillie</a>]

soup.find(id="link3")
# <a class="sister" href="http://example.com/tillie" id="link3">Tillie</a>
```

### 示例二: 获取所有 a 标签的 href

```python
for link in soup.find_all('a'):
    print(link.get('href'))
# http://example.com/elsie
# http://example.com/lacie
# http://example.com/tillie
```

### 示例三：获取所有文本

```python
soup.get_text()
text = soup.get_text(separator="\n")
```

### 示例四

```python
from bs4 import BeautifulSoup
from bs4.element import NavigableString
from bs4.element import Tag

soup = BeautifulSoup(f.read(), "html.parser")
divs = soup.find_all('div')
for div in divs:
    className = div.attrs['class'][0]
    if className == "p":
        for s in div:
            if type(s) == Tag:
                pass
            elif type(s) == NavigableString:
                pass
            else:
                print('unknown element', type(s), s)
```

## 参考

https://www.jianshu.com/p/9254bdc467b2
