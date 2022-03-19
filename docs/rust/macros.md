---
title: Rust宏概述
date: 2021-11-03 15:51:38

  - rust
  - macro
categories: rust
---

{% blockquote %}
耶和华本为善
{% endblockquote %}

## Macros

1. declarative macros, 比如 pirntln!和 vec!
2. 3 种过程宏(procedural macros)
   1. 自定义#[derive]宏
   2. Attribute-like macros that define custom attributes usable on any item
   3. Function-like macros that look like function calls but operate on the tokens specified as their argument

## Macros 与 Functions 的区别

1. A function signature must declare the number and type of parameters the function has. Macros, on the other hand, can take a variable number of parameters. 函数只能接收个数的参数，宏可以接收不确定个数的参数。
2. 函数只能在运行时被调用，宏在编译代码前就被展开
3. 宏的定义更麻烦，because you’re writing Rust code that writes Rust code.

## vec!宏的简化定义

```rust
#[macro_export]
macro_rules! vec {
    ( $( $x:expr ),* ) => {
        {
            let mut temp_vec = Vec::new();
            $(
                temp_vec.push($x);
            )*
            temp_vec
        }
    };
}
```

The #[macro_export] annotation indicates that this macro should be made available whenever the crate in which the macro is defined is brought into scope. Without this annotation, the macro can’t be brought into scope.

We then start the macro definition with macro_rules! and the name of the macro we’re defining without the exclamation mark. The name, in this case vec, is followed by curly brackets denoting the body of the macro definition.

The structure in the vec! body is similar to the structure of a match expression. Here we have one arm with the pattern ( $( $x:expr ),\* ), followed by => and the block of code associated with this pattern. If the pattern matches, the associated block of code will be emitted. Given that this is the only pattern in this macro, there is only one valid way to match; any other pattern will result in an error. More complex macros will have more than one arm.

Valid pattern syntax in macro definitions is different than the pattern syntax covered in Chapter 18 because macro patterns are matched against Rust code structure rather than values. Let’s walk through what the pattern pieces in Listing 19-28 mean; for the full macro pattern syntax

First, a set of parentheses encompasses the whole pattern. A dollar sign ($) is next, followed by a set of parentheses that captures values that match the pattern within the parentheses for use in the replacement code. Within $() is $x:expr, which matches any Rust expression and gives the expression the name $x.

The comma following $() indicates that a literal comma separator character could optionally appear after the code that matches the code in $(). The _ specifies that the pattern matches zero or more of whatever precedes the _.

When we call this macro with vec![1, 2, 3];, the $x pattern matches three times with the three expressions 1, 2, and 3.

Now let’s look at the pattern in the body of the code associated with this arm: temp_vec.push() within $()\* is generated for each part that matches $() in the pattern zero or more times depending on how many times the pattern matches. The $x is replaced with each expression matched. When we call this macro with vec![1, 2, 3];, the code generated that replaces this macro call will be the following:

```rust
{
    let mut temp_vec = Vec::new();
    temp_vec.push(1);
    temp_vec.push(2);
    temp_vec.push(3);
    temp_vec
}
```

## Procedural Macros for Generating Code from Attributes

The second form of macros is procedural macros, which act more like functions (and are a type of procedure).过程宏就像函数。
Procedural macros accept some code as an input, operate on that code, and produce some code as an output rather than matching against patterns and replacing the code with other code as declarative macros do. 过程宏接收一些代码然后产出另一些代码。

The three kinds of procedural macros (custom derive, attribute-like, and function-like) all work in a similar fashion.
三种过程宏：1. 派生宏 2. 属性宏 3.函数宏

When creating procedural macros, the definitions must reside in their own crate with a special crate type.
过程宏必须定义在自己专门的 crate 种，属于特定的 crate 类型

### 使用过程宏的示例

Using procedural macros looks like bellow, where some_attribute is a placeholder for using a specific macro.

```rust src/lib.rs
use proc_macro;

#[some_attribute]
pub fn some_name(input: TokenStream) -> TokenStream {
}
```

## 派生宏

### 目标

```rust
use hello_macro::HelloMacro;
use hello_macro_derive::HelloMacro;

#[derive(HelloMacro)]
struct Pancakes;

fn main() {
    Pancakes::hello_macro();
}
```

### 库代码

```
$ cargo new hello_macro --lib
```

```rust src/lib.rs
pub trait HelloMacro {
    fn hello_macro();
}
```

### 宏代码

```
$ cargo new hello_macro_derive --lib
```

```toml Cargo.toml
proc-macro = true

[dependencies]
syn = "1.0"
quote = "1.0"
```

```rust
extern crate proc_macro;

use proc_macro::TokenStream;
use quote::quote;
use syn;

#[proc_macro_derive(HelloMacro)]
pub fn hello_macro_derive(input: TokenStream) -> TokenStream {
    // Construct a representation of Rust code as a syntax tree
    // that we can manipulate
    let ast = syn::parse(input).unwrap();

    // Build the trait implementation
    impl_hello_macro(&ast)
}

extern crate proc_macro;

use proc_macro::TokenStream;
use quote::quote;
use syn;

#[proc_macro_derive(HelloMacro)]
pub fn hello_macro_derive(input: TokenStream) -> TokenStream {
    // Construct a representation of Rust code as a syntax tree
    // that we can manipulate
    let ast = syn::parse(input).unwrap();

    // Build the trait implementation
    impl_hello_macro(&ast)
}

fn impl_hello_macro(ast: &syn::DeriveInput) -> TokenStream {
    let name = &ast.ident;
    let gen = quote! {
        impl HelloMacro for #name {
            fn hello_macro() {
                println!("Hello, Macro! My name is {}!", stringify!(#name));
            }
        }
    };
    gen.into()
}
```

## 属性宏

### 目标

```rust
#[route(GET, "/")]
fn index() {
```

### 宏定义

```rust
#[proc_macro_attribute]
pub fn route(attr: TokenStream, item: TokenStream) -> TokenStream {
```

## 函数宏

### 目标

```rust
let sql = sql!(SELECT * FROM posts WHERE id=1);
```

### 宏定义

```rust
#[proc_macro]
pub fn sql(input: TokenStream) -> TokenStream {
```

## 参考

https://doc.rust-lang.org/stable/book/ch19-06-macros.html
https://doc.rust-lang.org/stable/reference/macros-by-example.html
