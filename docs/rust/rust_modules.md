---
title: rust项目结构
date: 2021-08-09 14:46:07

  - rust
  - module
categories: rust
---

{% blockquote %}
{% endblockquote %}

## 什么是包(Package)

有时也称为项目(Project)。一个 Cargo.toml 对应一个包。一个包可以包含多个 targets，每个 targets 都是一个 crate。

## targets

Packages can have library, binary, example, test, and benchmark targets

```toml
[lib]
crate-type = ["cdylib"]
bench = false

[[bin]]
name = "cool-tool"
test = false
bench = false

[[bin]]
name = "frobnicator"
required-features = ["frobnicate"]

[[example]]
name = "foo"
crate-type = ["staticlib"]
```

## 模块重要规则

1. 从模块树的根 main.rs 或 lib.rs 开始搜索模块
   1. 也就是说，顶级模块必须在 main.rs 或 lib.rs 中声明。
   2. 只有当 main.rs 中写了`mod foo;`时, 编译器才会解析文件 foo.rs 或目录 foo 中的 mod.rs。
2. 目录名，文件名，文件用 mod 关键字定义的模块，都是模块路径的一部分。
3. 模块引用规则：
   1. `crate`根模块
   2. `super`父级模块

## 包结构

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

- Cargo.toml and Cargo.lock are stored in the root of your package (package root).
- Source code goes in the src directory.
- The default library file is src/lib.rs.
- The default executable file is src/main.rs.
- Other executables can be placed in src/bin/.
- Benchmarks go in the benches directory.
- Examples go in the examples directory.
- Integration tests go in the tests directory.
