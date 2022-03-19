---
title: Windows VScode Rust开发
date: 2021-10-31 09:40:04

  - rust
  - vscode
categories: rust
---

{% blockquote %}
神的国不在乎吃喝，只在乎公义、和平，并圣灵的喜乐。
{% endblockquote %}

## 安装插件

### 必须插件

1. rust-analyzer

### 其它可选插件

1. rust syntax：为代码提供语法高亮。
2. crates：帮助你分析当前项目的依赖是否是最新的版本。
3. better toml：Rust 使用 toml 做项目的配置管理。better toml 可以帮你语法高亮，并展示 toml 文件中的错误。
4. rust test lens：可以帮你快速运行某个 Rust 测试。
5. Tabnine：基于 AI 的自动补全，可以帮助你更快地撰写代码。

## 配置

File -> Rreferences -> Settings

1. 保存时格式化： editor.formatOnSave = true

## 代码模板

使用 tab 转移光标到下一个“hole”

1. for
2. macro_rules
3. if let
4. spawn
5. extern create

## 执行 build

ctrl + shift + b

## 问题

1. error: linker `link.exe` not found

   下载 visual stuido,安装 c++开发工具集

## 参考

https://marketplace.visualstudio.com/items?itemName=rust-lang.rust
