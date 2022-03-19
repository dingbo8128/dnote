---
title: "Pyhton:创建一个可用pip安装的软件包"
date: 2021-06-21 14:55:38

  - python
  - pip
  - python package
categories: python
---

<html>
<div class="biblewords">他要像一棵树，载在溪水旁。按时候结果子，叶子也不枯干。
</div>
</html>

## python 打包系统

python 打包系统有很长的历史了。传统工具是 setuptools，需要对应的 setup.py 文件,用命令`python setup.py bdist`或`python setup.py bdist_wheel`打包。
PEP517 规定了新的打包标准：

> 用一个 pyproject.toml 文件声明打包程序
> 这个打包程序必须提供两个方法，一个`build_wheel(direcotry: str)`一个`build_sdist(direcotry: str)`
> 这个打包程序可以用它自己的配置文件，也可以扩展 pyproject.toml
> 用 pip install 来安装包。如果有 whl 文件或 tar.gz 文件，pip 只是 copy 文件到 site-package。
> 如果没有 pip 查看 pyproject.toml,使用适当的程序从源码打包再安装
> 这个标准使得在不同打包工具之间切换变得简单。

## 打包一个最简单的项目

### 创建一个项目包含以下文件

```
~/meowpkg/
    pyproject.toml
    setup.cfg
    meowpkg/__init__.py
```

**pyproject.toml**

```toml
[build-system]
requires = ["setuptools", "wheel"]
build-backend = "setuptools.build_meta"
```

**setup.cfg**

```ini
[metadata]
name = meowpkg
version = 0.1
description = A test package
long_description = file: README.md
long_description_content_type = text/markdown
keywords = test
author = xxxx
author_email = xxxx@xxx.com
url = https://gitee.com/xxxxx

[options]
packages = find:
```

`long_description = file:`的作用是使用 READEME.md 作为项目的长描述

#### 打包

```bash
pipenv install  build --dev
python -m build
```

打包完成后 dist 下生成 2 个可安装的包

```
dist/
    meowpkg-0.0.1.whl
    meowpkg-0.0.1.tar.gz
```

#### 使用 pip 本地安装

```bash
pip install dist/meowpkg-0.0.1.whl
```

## 手动指定需要打包的目录

```
package = find:
```

上面这个配置会自动发现当前目录的 python package，也可以手动指定：

```
[options]
packages =
    pkg1
    pkg2
```

pk1 和 pkg2 必须为当前目录的子目录，且里面有**init**.py

## 添加自定义脚本

1. 在项目中添加 bin 目录和脚本 bin/autotdimport.bat
   ```bat autotdimport.bat
   python.exe -m autotdimport
   ```
2. 添加这个包作为模块执行的入入口文件
   在包的根目录下（与**init**.py 同目录）添加**main**.py
   ```python __main__.py
   if __name__ == '__main__':
    print("welcome to use autotdimport!")
   ```
3. 修改 setup.cfg 添加 scripts 字段
   ```ini setup.cfg
   [options]
   scripts =
       bin/autotdimport.bat
   packages = find:
   ```
4. 打包并安装
   安装完毕后，在 python 安装路径的 Scripts 目录下，就能看到 autotdimport.bat。

## 添加可执行文件

- 可执行文件名称 = 包名:模块名:方法名
- 可执行文件名称 = 包名:方法名

```ini
[options.entry_points]
console_scripts =
     autotdimport = autotdimport:auto_run
```

## 添加依赖

```ini setup.cfg
[options]
packages = find:
install_requires =
    pandas
    pyyaml
    fastparquet
    taos@file://C:\TDengine\connector\python
```

## 上传 pipy

### 注册 pipy 账号

https://pypi.org/

### 安装 twine

```
pip install  -i https://pypi.tuna.tsinghua.edu.cn/simple twine
```

### 上传

```
twine upload dist/*
```

## 参考

- [1] https://betterscientificsoftware.github.io/python-for-hpc/tutorials/python-pypi-packaging/
- [2] [详细配置](https://setuptools.readthedocs.io/en/latest/userguide/declarative_config.html)
- [3] https://python-poetry.org/docs/pyproject/
- [4] https://pypa-build.readthedocs.io/en/latest/
- [5] https://bernat.tech/posts/pep-517-518/
- [6] https://packaging.python.org/tutorials/packaging-projects/
- [7] https://packaging.python.org/specifications/core-metadata/
