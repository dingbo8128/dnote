---
title: Python依赖管理和打包工具poetry
date: 2022-01-06 15:23:23

categories: python
---

## Install

### Windows

#### Powershell

(Invoke-WebRequest -Uri https://raw.githubusercontent.com/python-poetry/poetry/master/get-poetry.py -UseBasicParsing).Content | py -3 -

## Create Project

### New

```
poetry new poetry-demo
```

### Init

```
cd pre-existing-project
poetry init
```

## Other commands

### shell

```
pip install pexpect
pip install shellingham
poetry shell
```

## Error

### One

ModuleNotFoundError: No module named 'cleo'

```
pip3 install cleo tomlkit poetry.core requests cachecontrol cachy html5lib pkginfo virtualenv lockfile
```

### Two

Python was not found; run without arguments to install from the Microsoft Store, or disable this shortcut from Settings > Manage App Execution Aliases.

Add C:\Users\bo\AppData\Local\Programs\Python\Python310 to path.

## Doc

https://python-poetry.org/
https://python-poetry.org/docs/cli/
