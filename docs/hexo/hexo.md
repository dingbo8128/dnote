---
title: Hexo使用技巧
date: 2021-06-12 05:52:33

categories: hexo
---

## 初始化站点

```
npm install hexo-cli -g
hexo init blog
cd blog
npm install
hexo server
```

## 使用 git 发布

```
yarn add hexo-deployer-git
```

```yml
deploy:
  type: git
  repo: <repository url> # https://bitbucket.org/JohnSmith/johnsmith.bitbucket.io
  branch: [branch]
  message: [message]
```

### 选项

| Option       | Description Default                                                                                       |
| ------------ | --------------------------------------------------------------------------------------------------------- |
| repo         | URL of the target repository                                                                              |
| branch       | Branch name. gh-pages (GitHub)                                                                            |
| coding-pages | (Coding.net)                                                                                              |
| master       | (others)                                                                                                  |
| message      | Customize commit message.                                                                                 |
| token        | Optional token value to authenticate with the repo. Prefix with $ to read token from environment variable |

## 模版文件

创建新页面的模板在 scaffolds 这个目录

## 引用

### 语法

```
{% blockquote [author[, source]] [link] [source_link_title] %}
content
{% endblockquote %}
```

### 示例

```
{% blockquote David Levithan, Wide Awake %}
Do not just seek happiness for yourself. Seek happiness for all. Through kindness. Through mercy.
{% endblockquote %}
```

{% blockquote David Levithan, Wide Awake %}
Do not just seek happiness for yourself. Seek happiness for all. Through kindness. Through mercy.
{% endblockquote %}

## 图片

### markdown 语法

使用相对于 source 的绝对路径

```
![](/images/k8s-cluster-mode.png)
```

如果设置了 post_asset_folder: true， 把图片放在于文章同名的目录，直接引用

```
![TDengine 分布式架构的逻辑结构图如下](structure.png)
```

### 标签插件语法

支持调节大小

```
{% img [class names] /path/to/image [width] [height] '"title text" "alt text"' %}
```

## 代码块

```
&#96;&#96;&#96; [language] [title] [url] [link text] [additional options]
 code snippet
&#96;&#96;&#96;
```

## 插入音频

```html
<audio id="audio" controls="" preload="none">
  <source id="mp3" src="assets/voices/getvoice.mp3" />
</audio>
```

## Next 主题修改字体大小

编辑 source/css/\_variables/base.styl

```
$font-size-base =  0.8em;
```

## primjs 语法高亮

- Markup - markup html, xml, svg, mathml, ssml, atom, rss
- C-like - clike
- JavaScript - javascript, js
- ABAP - abap
- ABNF - abnf
- ActionScript - actionscript
- Ada - ada
- Agda - agda
- AL - al
- ANTLR4 - antlr4, g4
- Apache Configuration - apacheconf
- Apex - apex
- APL - apl
- AppleScript - applescript
- AQL - aql
- Arduino - arduino
- ARFF - arff
- AsciiDoc - asciidoc, adoc
- ASP.NET (C#) - aspnet
- 6502 Assembly - asm6502
- AutoHotkey - autohotkey
- AutoIt - autoit
- Bash - bash, shell
- BASIC - basic
- Batch - batch
- BBcode - bbcode, shortcode
- Birb - birb
- Bison - bison
- BNF - bnf, rbnf
- Brainfuck - brainfuck
- BrightScript - brightscript
- Bro - bro
- BSL (1C:Enterprise) - bsl, oscript
- C - c
- C# - csharp, cs, dotnet
- C++ - cpp
- CFScript - cfscript, cfc
- ChaiScript - chaiscript
- CIL - cil
- Clojure - clojure
- CMake - cmake
- COBOL - cobol
- CoffeeScript - coffeescript, coffee
- Concurnas - concurnas, conc
- Content-Security-Policy - csp
- Coq - coq
- Crystal - crystal
- CSS Extras - css-extras
- CSV - csv
- Cypher - cypher
- D - d
- Dart - dart
- DataWeave - dataweave
- DAX - dax
- Dhall - dhall
- Diff - diff
- Django/Jinja2 - django, jinja2
- DNS zone file - dns-zone-file, dns-zone
- Docker - docker, dockerfile
- DOT (Graphviz) - dot, gv
- EBNF - ebnf
- EditorConfig - editorconfig
- Eiffel - eiffel
- EJS - ejs, eta
- Elixir - elixir
- Elm - elm
- Embedded Lua templating - etlua
- ERB - erb
- Erlang - erlang
- Excel Formula - excel-formula, xlsx, xls
- F# - fsharp
- Factor - factor
- False - false
- Firestore security rules - firestore-security-rules
- Flow - flow
- Fortran - fortran
- FreeMarker Template Language - ftl
- GameMaker Language - gml, gamemakerlanguage
- G-code - gcode
- GDScript - gdscript
- GEDCOM - gedcom
- Gherkin - gherkin
- Git - git
- GLSL - glsl
- Go - go
- GraphQL - graphql
- Groovy - groovy
- Haml - haml
- Handlebars - handlebars, hbs
- Haskell - haskell, hs
- Haxe - haxe
- HCL - hcl
- HLSL - hlsl
- HTTP - http
- HTTP Public-Key-Pins - hpkp
- HTTP Strict-Transport-Security - hsts
- IchigoJam - ichigojam
- Icon - icon
- ICU Message Format - icu-message-format
- Idris - idris, idr
- .ignore - ignore, gitignore, hgignore, npmignore
- Inform 7 - inform7
- Ini - ini
- Io - io
- J - j
- Java - java
- JavaDoc - javadoc
- JavaDoc-like - javadoclike
- Java stack trace - javastacktrace
- Jexl - jexl
- Jolie - jolie
- JQ - jq
- JSDoc - jsdoc
- JS Extras - js-extras
- JSON - json, webmanifest
- JSON5 - json5
- JSONP - jsonp
- JS stack trace - jsstacktrace
- JS Templates - js-templates
- Julia - julia
- Keyman - keyman
- Kotlin - kotlin, kt, kts
- KuMir (КуМир) - kumir, kum
- LaTeX - latex, tex, context
- Latte - latte
- Less - less
- LilyPond - lilypond, ly
- Liquid - liquid
- Lisp - lisp, emacs, elisp, emacs-lisp
- LiveScript - livescript
- LLVM IR - llvm
- Log file - log
- LOLCODE - lolcode
- Lua - lua
- Makefile - makefile
- Markdown - markdown, md
- Markup templating - markup-templating
- MATLAB - matlab
- MEL - mel
- Mizar - mizar
- MongoDB - mongodb
- Monkey - monkey
- MoonScript - moonscript, moon
- N1QL - n1ql
- N4JS - n4js, n4jsd
- Nand To Tetris HDL - nand2tetris-hdl
- Naninovel Script - naniscript, nani
- NASM - nasm
- NEON - neon
- Nevod - nevod
- nginx - nginx
- Nim - nim
- Nix - nix
- NSIS - nsis
- Objective-C - objectivec, objc
- OCaml - ocaml
- OpenCL - opencl
- OpenQasm - openqasm, qasm
- Oz - oz
- PARI/GP - parigp
- Parser - parser
- Pascal - pascal, objectpascal
- Pascaligo - pascaligo
- PATROL Scripting Language - psl
- PC-Axis - pcaxis, px
- PeopleCode - peoplecode, pcode
- Perl - perl
- PHP - php
- PHPDoc - phpdoc
- PHP Extras - php-extras
- PL/SQL - plsql
- PowerQuery - powerquery, pq, mscript
- PowerShell - powershell
- Processing - processing
- Prolog - prolog
- PromQL - promql
- .properties - properties
- Protocol Buffers - protobuf
- Pug - pug
- Puppet - puppet
- Pure - pure
- PureBasic - purebasic, pbfasm
- PureScript - purescript, purs
- Python - python, py
- Q# - qsharp, qs
- Q (kdb+ database) - q
- QML - qml
- Qore - qore
- R - r
- Racket - racket, rkt
- React JSX - jsx
- React TSX - tsx
- Reason - reason
- Regex - regex
- Rego - rego
- Ren'py - renpy, rpy
- reST (reStructuredText) - rest
- Rip - rip
- Roboconf - roboconf
- Robot Framework - robotframework, robot
- Ruby - ruby, rb
- Rust - rust
- SAS - sas
- Sass (Sass) - sass
- Sass (Scss) - scss
- Scala - scala
- Scheme - scheme
- Shell session - shell-session, sh-session, shellsession
- Smali - smali
- Smalltalk - smalltalk
- Smarty - smarty
- SML - sml, smlnj
- Solidity (Ethereum) - solidity, sol
- Solution file - solution-file, sln
- Soy (Closure Template) - soy
- SPARQL - sparql, rq
- Splunk SPL - splunk-spl
- SQF: Status Quo Function (Arma 3) - sqf
- SQL - sql
- Squirrel - squirrel
- Stan - stan
- Structured Text (IEC 61131-3) - iecst
- Stylus - stylus
- Swift - swift
- T4 templating - t4-templating
- T4 Text Templates (C#) - t4-cs, t4
- T4 Text Templates (VB) - t4-vb
- TAP - tap
- Tcl - tcl
- Template Toolkit 2 - tt2
- Textile - textile
- TOML - toml
- Turtle - turtle, trig
- Twig - twig
- TypeScript - typescript, ts
- TypoScript - typoscript, tsconfig
- UnrealScript - unrealscript, uscript, uc
- URI - uri, url
- V - v
- Vala - vala
- VB.Net - vbnet
- Velocity - velocity
- Verilog - verilog
- VHDL - vhdl
- vim - vim
- Visual Basic - visual-basic, vb, vba
- WarpScript - warpscript
- WebAssembly - wasm
- Wiki markup - wiki
- Wolfram language - wolfram, mathematica, nb, wl
- Xeora - xeora, xeoracube
- XML doc (.net) - xml-doc
- Xojo (REALbasic) - xojo
- XQuery - xquery
- YAML - yaml, yml
- YANG - yang
- Zig - zig

## 参考

- [1] https://hexo.io/zh-cn/docs/asset-folders.html
