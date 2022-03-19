---
title: Rust与WeAssembly
date: 2021-06-19 16:16:00

  - rust
  - wasm
categories: rust
---

## 将 Rust 编译为 wasm

添加编译目标 wasm

```
rustup target add wasm32-unknown-unknown
```

将任意 rust 程序编译为 wasm

```
cargo build --target=wasm32-unknown-unknown
```

## wasm-bindgen

这个软件包由 rust-wasmt 团队开发。支持 rust 代码调用 javascript 代码，反之亦然。

## web-sys

The web-sys crate provides raw wasm-bindgen imports for all of the Web's APIs. This includes:
web-sys 基于 wasm-bindgen 将全部 Web 的 API 带入了 rust 世界。包括但不限于：

- window.fetch
- Node.prototype.appendChild
- WebGL
- WebAudio
- and many more!

It's sort of like the libc crate, but for the Web.
web-sys 之于 rust，就像 libc 之于 C。

## js-sys

Bindings to JavaScript's standard, built-in objects, including their methods and properties.

## 参考

- [1] https://rustwasm.github.io/wasm-bindgen/web-sys/index.html
- [2] https://crates.io/crates/js-sys
