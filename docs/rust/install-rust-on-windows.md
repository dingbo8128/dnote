---
title: Windows安装rust工具链
date: 2021-06-25 08:17:11

categories: rust
---

<html>
<div class="biblewords">
神说：“我们要照着我们的形象、按着我们的样式造人，使他们管理海里的鱼、空中的鸟、地上的牲畜，和全地，并地上所爬的一起昆虫。”
</div>
</html>

## 下载 rustup-init.exe

https://static.rust-lang.org/rustup/dist/x86_64-pc-windows-msvc/rustup-init.exe

## 按提示操作

```txt

Welcome to Rust!

This will download and install the official compiler for the Rust
programming language, and its package manager, Cargo.

Rustup metadata and toolchains will be installed into the Rustup
home directory, located at:

  C:\Users\bo\.rustup

This can be modified with the RUSTUP_HOME environment variable.

The Cargo home directory located at:

  C:\Users\bo\.cargo

This can be modified with the CARGO_HOME environment variable.

The cargo, rustc, rustup and other commands will be added to
Cargo's bin directory, located at:

  C:\Users\bo\.cargo\bin

This path will then be added to your PATH environment variable by
modifying the HKEY_CURRENT_USER/Environment/PATH registry key.

You can uninstall at any time with rustup self uninstall and
these changes will be reverted.

Current installation options:


   default host triple: x86_64-pc-windows-msvc
     default toolchain: stable (default)
               profile: default
  modify PATH variable: yes

1) Proceed with installation (default)
2) Customize installation
3) Cancel installation
>1

info: profile set to 'default'
info: default host triple is x86_64-pc-windows-msvc
info: syncing channel updates for 'stable-x86_64-pc-windows-msvc'
info: latest update on 2021-06-17, rust version 1.53.0 (53cb7b09b 2021-06-17)
info: downloading component 'cargo'
  3.6 MiB /   3.6 MiB (100 %)   1.4 MiB/s in  3s ETA:  0s
info: downloading component 'clippy'
  1.5 MiB /   1.5 MiB (100 %)   1.0 MiB/s in  1s ETA:  0s
info: downloading component 'rust-docs'
 16.1 MiB /  16.1 MiB (100 %)   1.1 MiB/s in 13s ETA:  0s
info: downloading component 'rust-std'
 22.8 MiB /  22.8 MiB (100 %)   1.8 MiB/s in  1m  4s ETA:  0s
info: downloading component 'rustc'
 59.7 MiB /  59.7 MiB (100 %)   1.1 MiB/s in 52s ETA:  0s
info: downloading component 'rustfmt'
  2.1 MiB /   2.1 MiB (100 %)   1.1 MiB/s in  1s ETA:  0s
info: installing component 'cargo'
info: installing component 'clippy'
info: installing component 'rust-docs'
 16.1 MiB /  16.1 MiB (100 %)   2.9 MiB/s in  4s ETA:  0s
info: installing component 'rust-std'
 22.8 MiB /  22.8 MiB (100 %)  10.2 MiB/s in  2s ETA:  0s
info: installing component 'rustc'
 59.7 MiB /  59.7 MiB (100 %)  12.1 MiB/s in  5s ETA:  0s
info: installing component 'rustfmt'
info: default toolchain set to 'stable-x86_64-pc-windows-msvc'

  stable-x86_64-pc-windows-msvc installed - rustc 1.53.0 (53cb7b09b 2021-06-17)


Rust is installed now. Great!

To get started you may need to restart your current shell.
This would reload its PATH environment variable to include
Cargo's bin directory (%USERPROFILE%\.cargo\bin).

Press the Enter key to continue.
```
