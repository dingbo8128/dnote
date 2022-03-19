---
title: "pipenv命令行"
date: 2021-06-21 16:55:38

categories: python
---

## 简介

pipenv 是一个新的 python 项目依赖管理工具

## 安装

```bash
$ pip install pipenv
```

## 用法示例

打开新的 shell，进入一个虚拟的 python 环境

```bash
pipenv shell
```

如果虚拟环境不存在，以上命令将会在默认位置创建一个。
指定创建的虚拟环境的版本

```bash
pipenv shell --two
pipenv shell --three
pipenv shell --python 3.9
```

安装指定版本的包

```bash
pipenv install flask==0.12.1
```

从 git 仓库安装

```bash
pipenv install -e git+https://github.com/requests/requests.git#egg=requests
```

安装开发依赖

```bash
pipenv install pytest --dev
```

忽略 pipfile 安装

```bash
pipenv install --ignore-pipfile
```

## 依赖图

```
pipenv graph
```

## pipfile

toml 格式

```toml
[[source]]
url = "https://pypi.python.org/simple"
verify_ssl = true
name = "pypi"

[dev-packages]
pytest = "*"

[packages]
flask = "==0.12.1"
numpy = "*"
requests = {git = "https://github.com/requests/requests.git", editable = true}

[requires]
python_version = "3.6"
```

## 其它特性

打开第三方包

```
pipenv open flask
```

执行脚本

```
pipenv run command
```

卸载

```
pipenv uninstall numpy
pipenv uninstall --all
pipenv uninstall --all--dev
```

查看虚拟环境

```
pipenv --venv
```

查看项目根目录

```
pipenv --where
```

## 参考

- [1] https://realpython.com/pipenv-guide/
