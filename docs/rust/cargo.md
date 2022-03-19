---
title: Cargo手册
date: 2021-09-18 14:37:53

  - cargo
categories:
  - rust
---

## 什么是 cargo

A library or executable program is called a crate. Crates are compiled using the Rust compiler, rustc.

Rather than work only with crate and rustc, a higher-level "package" abstraction was introduced.

Cargo is the Rust package manager.

## cargo new

### 示例

1. `cargo new hello_world` 创建可执行程序
2. `cargo new hello_world --bin` 同上
3. `cargo new hello_world --lib` 创建一个库
4. `cargo new hello_world --vcs none` 不创建 git 仓库
5. `cargo build`
6. `cargo build --release`
7. `cargo run`

### 依赖

```toml
[package]
name = "hello_world"
version = "0.1.0"
edition = "2018"

[dependencies]
time = "0.1.12"
regex = "0.1.41"
```

### 包结构

- 一个 package 的标志就是`Cargo.toml`
- 一个 package 可以包含任意个二进制 crate
- 源码在`src`目录
- 默认可执行程序是`src/main.rs`
- 默认库文件是`src/lib.rs`
- 其它可执行程序在`src/bin/`目录
- 基准测试在`benches`目录
- 示例程序在`examples`目录
- 集成测试在`tests`目录

```
.
├── Cargo.lock
├── Cargo.toml
├── src/
│   ├── lib.rs
│   ├── main.rs
│   └── bin/
│       ├── named-executable.rs
│       ├── another-executable.rs
│       └── multi-file-executable/
│           ├── main.rs
│           └── some_module.rs
├── benches/
│   ├── large-input.rs
│   └── multi-file-bench/
│       ├── main.rs
│       └── bench_module.rs
├── examples/
│   ├── simple.rs
│   └── multi-file-example/
│       ├── main.rs
│       └── ex_module.rs
└── tests/
    ├── some-integration-tests.rs
    └── multi-file-test/
        ├── main.rs
        └── test_module.rs
```

如果一个可执行程序包含多个源文件，把所有源文件放一个目录，创建一个`main.rs`作为程序入口，其它`modules`也放这个目录。如上面的`multi-file-test`。二进制程序的名字将是目录名。

## cargo run

1. `cargo run --example name` 执行指定示例程序
2. `cargo run --bin name` 执行指定二进制程序
3. `cargo run` 执行`main.rs`

## cargo test

测试分为单元测试和集成测试。`src`下的测试为单元测试。`tests`下为集成测试。

### 语法

```
cargo test [options] [testname] [-- test-options]
```

### 示例

1. 运行所有测试 `cargo test`
2. 运行某个测试函数 `cargo test test_function_name`
3. 打印测试标准输出 `cargo test -- --nocapture`
4. Run only a specific test within a specific integration test: `cargo test --test int_test_name -- modname::test_name`

## cargo publish

发布包到 rigistry。默认https://crates.io/。这个命令认证。
参考： https://doc.rust-lang.org/cargo/commands/cargo-publish.html
