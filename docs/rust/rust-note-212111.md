---
title: Rust Note 2021-11
date: 2021-11-24 09:34:32

  - rust
categories: rust
---

## tokio::main

可以让 main 函数异步执行

```rust
use tokio;

#[tokio::main]
async fn main() {
    println!("Hello world");
}
```
