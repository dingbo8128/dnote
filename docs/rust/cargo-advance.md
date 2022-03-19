---
title: Cargo高级用法
date: 2021-11-03 09:15:19

  - rust
  - cargo
categories: rust
---

{% blockquote %}
我的心哪，你要赞美耶和华！
{% endblockquote %}

## Profiles

内置两个 profile， dev 和 release

1. `cargo build`使用 dev
2. `cargo build --release`使用 release

覆盖 profile 的默认配置

```toml
[profile.dev]
opt-level = 0

[profile.release]
opt-level = 3
```

The opt-level setting controls the number of optimizations Rust will apply to your code, with a range of 0 to 3

## 文档注释

### 三个 slash

支持 markdown

````rust
/// Adds one to the number given.
///
/// # Examples
///
/// ```
/// let arg = 5;
/// let answer = my_crate::add_one(arg);
///
/// assert_eq!(6, answer);
/// ```
pub fn add_one(x: i32) -> i32 {
    x + 1
}
````

常用 Sections

1. Panics： 描述什么情况下会导致 Panic
2. Errors: 描述可能返回的 Error 类型
3. Examples： 使用示例
4. Safety： 如果函数是 unsafe 的，应该解释一下为什么

最后，文档注释中的 Example 会被自动作为测试用例，也就是说`cargo test`会执行这些代码

### 两个 slash 加一个！

注释整个文件

````rust
//! # My Crate
//!
//! `my_crate` is a collection of utilities to make performing certain
//! calculations more convenient.

/// Adds one to the number given.
// --snip--
///
/// # Examples
///
/// ```
/// let arg = 5;
/// let answer = my_crate::add_one(arg);
///
/// assert_eq!(6, answer);
/// ```
pub fn add_one(x: i32) -> i32 {
    x + 1
}
````

## 使用 pub use 导出

层数太深，用户导入不便，使用 pub use 重导出。

库代码示例

```rust
//! # Art
//!
//! A library for modeling artistic concepts.

pub use self::kinds::PrimaryColor;
pub use self::kinds::SecondaryColor;
pub use self::utils::mix;

pub mod kinds {
    // --snip--
    /// The primary colors according to the RYB color model.
    pub enum PrimaryColor {
        Red,
        Yellow,
        Blue,
    }

    /// The secondary colors according to the RYB color model.
    pub enum SecondaryColor {
        Orange,
        Green,
        Purple,
    }
}

pub mod utils {
    // --snip--
    use crate::kinds::*;

    /// Combines two primary colors in equal amounts to create
    /// a secondary color.
    pub fn mix(c1: PrimaryColor, c2: PrimaryColor) -> SecondaryColor {
        SecondaryColor::Orange
    }
}
```

用户代码示例

```rust
use art::mix;
use art::PrimaryColor;

fn main() {
    // --snip--
    let red = PrimaryColor::Red;
    let yellow = PrimaryColor::Yellow;
    mix(red, yellow);
}
```

In cases where there are many nested modules, re-exporting the types at the top level with pub use can make a significant difference in the experience of people who use the crate.

## 发布 create

### 登录

1. 注册账号： https://crates.io/
2. 复制 api key：https://crates.io/me/
3. `$ cargo login abcdefghijklmnopqrstuvwxyz012345`

### 完善 meta 并发布

```toml
[package]
name = "guessing_game"
version = "0.1.0"
edition = "2018"
description = "A fun game where you guess what number the computer has chosen."
license = "MIT OR Apache-2.0"

[dependencies]
```

```
$ cargo publish
    Updating crates.io index
warning: manifest has no description, license, license-file, documentation, homepage or repository.
See https://doc.rust-lang.org/cargo/reference/manifest.html#package-metadata for more info.
--snip--
error: api errors (status 200 OK): missing or empty metadata fields: description, license. Please see https://doc.rust-lang.org/cargo/reference/manifest.html for how to upload metadata
```

### 发布新版本

改变 version，重新执行`cargo publish`

### 防止旧版本被下载

```shell
$ cargo yank --vers 1.0.1
```

取消 yank

```shell
$ cargo yank --vers 1.0.1 --undo
```

## 工作空间

当代码规模继续增长，把所有代码放在一个 crate 里就不是一个好主意了，因为任何代码的修改都会导致这个 crate 重新编译，这样效率不高。我们可以使用 workspace。

```toml Cargo.toml
[workspace]

members = [
    "adder",
    "add-one",
]
```

```
$ cargo new add-one --lib
     Created library `add-one` package
```

```
├── Cargo.lock
├── Cargo.toml
├── add-one
│   ├── Cargo.toml
│   └── src
│       └── lib.rs
├── adder
│   ├── Cargo.toml
│   └── src
│       └── main.rs
└── target
```

adder 项目中，添加对包 add-one 的依赖

```toml
add-one = { path = "../add-one" }
```

Using the add-one library crate from the adder crate

```rust adder/src/main.rs
use add_one;

fn main() {
    let num = 10;
    println!(
        "Hello, world! {} plus one is {}!",
        num,
        add_one::add_one(num)
    );
}
```

build 整个 workspace

```
$ cargo build
   Compiling add-one v0.1.0 (file:///projects/add/add-one)
   Compiling adder v0.1.0 (file:///projects/add/adder)
    Finished dev [unoptimized + debuginfo] target(s) in 0.68s
```

指定一个包执行，用-p

```
$ cargo run -p adder
    Finished dev [unoptimized + debuginfo] target(s) in 0.0s
     Running `target/debug/adder`
Hello, world! 10 plus one is 11!
```

## 安装别人开发的二进制文件

```shell
$ cargo install ripgrep
    Updating crates.io index
  Downloaded ripgrep v11.0.2
  Downloaded 1 crate (243.3 KB) in 0.88s
  Installing ripgrep v11.0.2
--snip--
   Compiling ripgrep v11.0.2
    Finished release [optimized + debuginfo] target(s) in 3m 10s
  Installing ~/.cargo/bin/rg
   Installed package `ripgrep v11.0.2` (executable `rg`)
```

## 参考

https://doc.rust-lang.org/book/ch14-02-publishing-to-crates-io.html
