---
title: Mac安装Rust工具链
date: 2021-05-08 23:27:28

categories: rust
---

## 使用国内镜像

编辑~/.profile 文件，添加

```
export RUSTUP_DIST_SERVER=https://mirrors.ustc.edu.cn/rust-static
export RUSTUP_UPDATE_ROOT=https://mirrors.ustc.edu.cn/rust-static/rustup
```

## 下载安装脚本，并执行

### 安装命令

```
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
```

### 安装过程输出

```
Current installation options:


   default host triple: x86_64-apple-darwin
     default toolchain: stable
               profile: default
  modify PATH variable: yes

1) Proceed with installation (default)
2) Customize installation
3) Cancel installation
>1
info: profile set to 'default'
info: setting default host triple to x86_64-apple-darwin
info: latest update on 2021-05-06, rust version 1.52.0 (88f19c6da 2021-05-03)
info: downloading component 'cargo'
info: downloading component 'clippy'
info: downloading component 'rust-docs'
info: downloading component 'rust-std'
info: downloading component 'rustc'
info: downloading component 'rustfmt'
info: installing component 'cargo'
info: installing component 'clippy'
info: installing component 'rust-docs'
info: installing component 'rust-std'
info: installing component 'rustc'
info: installing component 'rustfmt'
```

## 安装完成后

1. 安装完成后.profile 和.bashrc 都多了一行。作用是将.cargo/bin 目录的可执行文件加入路径

```
. "$HOME/.cargo/env"
```

2. home 目录多了 2 个目录

- .cargo--rust 编译器和相关工具的安装目录。
- .rustup--rustup 工具的数据缓存目录。
