---
title: "pip命令行"
date: 2021-06-21 16:55:38

categories: python
---

<html>
<div class="words-of-bb">
得救在乎归回安息，得力在乎平静安稳。
</div>
</html>

## pip

```bash
pip install mpi4py
```

如果想全局安装需要在命令前加 sudo,如果只想给本用户安装，可以添加--user 选项。

```bash
pip install mpi4py==2.0.0
```

如果不知道有哪些版本可以选，可以用这样让 pip 列出所有可选的版本:

```bash
$ pip install mpi4py==
PS D:\dev> pip install mpi4py==
ERROR: Could not find a version that satisfies the requirement mpi4py== (from versions: 0.4.0rc1, 0.4.0rc2, 0.4.0rc3, 0.4.0rc4, 0.4.0, 0.5.0, 0.6.0, 1.3.1, 2.0.0, 3.0.0, 3.0.1, 3.0.2, 3.0.3)
ERROR: No matching distribution found for mpi4py==
```

强制安装，忽略已经安装的包

```
pip install -I
```

## 使用镜像

### 临时生效

```
pip install -i https://pypi.tuna.tsinghua.edu.cn/simple
```

### 全局修改

```toml ~/.pip/pip.conf
[global]
index-url = https://pypi.tuna.tsinghua.edu.cn/simple
[install]
trusted-host = https://pypi.tuna.tsinghua.edu.cn
```

windows 修改~/pip/pip.ini
