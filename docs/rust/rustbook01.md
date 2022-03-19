---
title: 速读RustBook——前3章
date: 2021-11-04 13:45:33

categories: rust
---

{% blockquote %}
{% endblockquote %}

## 链接

https://doc.rust-lang.org/book

## 第一章

```
$ curl --proto '=https' --tlsv1.2 https://sh.rustup.rs -sSf | sh
$ rustup update
$ rustc --version
$ rustup self uninstall
$ rustup doc
```

```
fn main() {
    println!("Hello, world!");
}
$ rustc main.rs
$ ./main
Hello, world!
```

```
cargo new
cargo init
cargo check
cargo build
cargo run
```

## 第二章

```rust
use std::io;

fn main() {
    println!("Guess the number!");

    println!("Please input your guess.");

    let mut guess = String::new();

    io::stdin()
        .read_line(&mut guess)
        .expect("Failed to read line");

    println!("You guessed: {}", guess);
}
```

## 第三章

### shadow

```rust
fn main() {
    let x = 5;

    let x = x + 1;

    {
        let x = x * 2;
        println!("The value of x in the inner scope is: {}", x);
    }

    println!("The value of x is: {}", x);
}
```

### 绑定不同类型

```rust
// let可以改类型
fn main() {
    let spaces = "   ";
    let spaces = spaces.len();
}
```

### string 转 int

```rust
let guess: u32 = "42".parse().expect("Not a number!");
```

### 组合类型

```rust
fn main() {
    let tup: (i32, f64, u8) = (500, 6.4, 1);
}
fn main() {
    let tup = (500, 6.4, 1);

    let (x, y, z) = tup;

    println!("The value of y is: {}", y);
}
fn main() {
    let x: (i32, f64, u8) = (500, 6.4, 1);

    let five_hundred = x.0;

    let six_point_four = x.1;

    let one = x.2;
}
```

### array

```rust
fn main() {
    let a = [1, 2, 3, 4, 5];
}

#![allow(unused)]
fn main() {
let months = ["January", "February", "March", "April", "May", "June", "July",
              "August", "September", "October", "November", "December"];
}

#![allow(unused)]
fn main() {
let a: [i32; 5] = [1, 2, 3, 4, 5];
}
```

```rust
#![allow(unused)]
fn main() {
let a = [3; 5];
let a = [3, 3, 3, 3, 3];
}
```

```rust
fn main() {
    let a = [1, 2, 3, 4, 5];

    let first = a[0];
    let second = a[1];
}
```

### 数组越界

```rust
use std::io;

fn main() {
    let a = [1, 2, 3, 4, 5];

    println!("Please enter an array index.");

    let mut index = String::new();

    io::stdin()
        .read_line(&mut index)
        .expect("Failed to read line");

    let index: usize = index
        .trim()
        .parse()
        .expect("Index entered was not a number");

    let element = a[index];

    println!(
        "The value of the element at index {} is: {}",
        index, element
    );
}
```

### Functions

let 语句无返回值，下面代码错误

```rust
fn main() {
    let x = (let y = 6);
}
```

作用域有返回值

```rust
fn main() {
    let x = 5;

    let y = {
        let x = 3;
        x + 1
    };

    println!("The value of y is: {}", y);
}
```
