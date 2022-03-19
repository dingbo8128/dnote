---
title: Python笔记六月小问题汇总
date: 2021-06-17 16:04:48

  - python
  - pandas
  - logging
categories:
  - python
---

## 安装包

### 指定镜像 URL

#### 命令行方式

```
pip install  -i https://pypi.tuna.tsinghua.edu.cn/simple packagename
```

#### Pipfile 方式

前提是使用 pipenv 管理依赖

```toml
[[source]]
url = "https://pypi.tuna.tsinghua.edu.cn/simple"
verify_ssl = true
name = "pypi"
```

## 导入上级目录的文件

### 方法一

将上级目录添加到系统路径

```python
import sys
sys.path.append("..")
import modeul_in_parent_folder
```

不建议用这种方式，因为这样做违法了文件结构规范： 所有模块级别的导入应该在文件的最顶端。

### 方法二

创建**init**.py 在当前目录，把当前目录做为一个模块，在这个文件中初始化导入路径。
缺点：如果这个目录被其它模块导入，可能会影响其它模块的导入路径。因为 sys.path 是全局的。
如果当前目录是个独立的子项目，只是想引用别的项目的代码，这样做完全没问题。

```python
# __init__.py
import sys
sys.path.append("..")
```

## dict

### 合并

python3.9 开始支持

```python
dict1 = {'Rahul': 4, 'Ram': 9, 'Jayant': 10}
dict2 = {'Jonas': 4, 'Niel': 9, 'Patel': 10, 'Ram': 9999}

print("Before merging")
print("dictionary 1:", dict1)
print("dictionary 2:", dict2)

dict1 |= dict2

print("after updating :")
print(dict1)
# Before merging
# dictionary 1: {'Rahul': 4, 'Ram': 9, 'Jayant': 10}
# dictionary 2: {'Jonas': 4, 'Niel': 9, 'Patel': 10, 'Ram': 9999}
# after updating :
# {'Rahul': 4, 'Ram': 9999, 'Jayant': 10, 'Jonas': 4, 'Niel': 9, 'Patel': 10}
```

## logging

### 基本配置

```python
import logging

formatter = "%(asctime)s - %(levelname)s: %(message)s"
# 控制台
logging.basicConfig(format=formatter, level=logging.DEBUG)
# 文件
 today = datetime.now().strftime('%Y-%m-%d')
logging.basicConfig(level=logging.INFO, filename='log/dump.log.' + today, filemode='w')
```

## os

### listdir

一次列出所有，适合数据量小的场景

```python
for name in os.listdir(dir_path):
    pass
```

### scandir

迭代器模式

```python
for entry in os.scandir(dir_path):
    print(entry.name)
```

### 创建目录

```python
os.makedirs(r'F:\ctp_std_data', exist_ok=True)
```

### isfile and isdir

Check if Given Path is File or Directory

```python
import os
fpath = 'D:/workspace/python/samplefile.txt'
isFile = os.path.isfile(fpath)
isDirectory = os.path.isdir(fpath)
```

## pandas

### 设置打印宽度和列数

```python
pd.set_option('display.max_columns', 40)
pd.set_option('display.width', 1000)
```

### 字符串转日期

```python
df['trading_date'] = pd.to_datetime(df['trading_date'], format='%Y-%m-%d')
```

### set_index

```python
df.set_index(col_name, inplace=True)
```

### 获取第一行

```python
df.iloc[0]
```

### 获取列的序号

```python
index_no = df.columns.get_loc(col_name)
```

### 迭代行

```python
for row in df.iterrows():
    index_value = row[0]
    col_values = row[1]
    print(col_values[1])
    print(col_values['price'])
```

### 定位行

#### iloc

用行号定位

```python
df.iloc[1]
```

#### loc

用索引定位

```python
df.loc["2021-09-09"]
```

## 打包应用程序

```bash
pyinstaller main.py
```

## argparse

### 使用 argparse 解析命令行选项

```python
def main():
    parser = argparse.ArgumentParser(description="A tool for importing data into tdengine")
    parser.add_argument("-f", "--file", type=str, help="config file to apply", required=True)
    args = parser.parse_args()
    print(args)
    if not args.file:
        print("file name can't be empty")
```

## multiprocess

**注意：**

1. 启动进程时，除了传入的参数，其他当前作用域可访问的变量，在子进程中是不能用的。
2. args 最好都是简单类型，不建议用复杂的参数，容易出问题。

```python
 p = Process(target=do_work, args=(arg1, arg2, arg3))
 p.start()
```

## subprocess

### 捕获子进程输出

```python
result = subprocess.run(('git', 'diff', '--name-only'), capture_output=True)
print(result.stdout)
```

## protobuf

### 序列化

```python
msg = GlobalSignalData(name=name, time=ts, values=[value])
msg.SerializeToString()
```

### 反序列化

```python
tick_data = CTPMarketData()
tick_data.ParseFromString(data)
```

## 参考

- [1] https://pythonexamples.org/python-check-if-path-is-file-or-directory/
