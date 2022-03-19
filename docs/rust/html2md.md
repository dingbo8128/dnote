---
title: Rust编程：html转markdown
date: 2021-11-02 15:55:57

  - rust
  - html2md
categories: rust
---

{% blockquote %}
人一切的劳碌，就是他在日光之下的劳碌，有什么益处呢？
{% endblockquote %}

## Cargo.toml

```toml
[package]
name = "scrape_url"
version = "0.1.0"
edition = "2018"

# See more keys and their definitions at https://doc.rust-lang.org/cargo/reference/manifest.html

[dependencies]
reqwest = { version = "0.11", features = ["blocking"]}
html2md = "0.2"
```

## main.rs

```rust

use std::fs;

fn main() {
  let url = "https://www.rust-lang.org/";
  let output = "rust.md";

  println!("Fetching url: {}", url);
  let body = reqwest::blocking::get(url).unwrap().text().unwrap();

  println!("Converting html to markdown...");
  let md = html2md::parse_html(&body);

  fs::write(output, md.as_bytes()).unwrap();
  println!("Converted markdown has been saved in {}.", output);
}
```
