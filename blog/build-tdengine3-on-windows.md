---
title: Build TDengine 3.0 branch on Windows
authors: [boding]
tags: [TDengine]
---

## Get the Source Code
```
git clone https://github.com/taosdata/TDengine.git
cd TDengine
git submodule update --init --recursive
```
## Build
1. search for "Command Prompt" and choose "x64 Native Tools Command Prompt for VS 2022".
2. cd to source code.
3. `mkdir debug && cd debug`
4. `cmake .. -G "NMake Makefiles"`

## Struggles

Run `nmake`.

```cmd
C:\Users\bo\dev\taosXdev\TDengine\debug>nmake

Microsoft (R) 程序维护实用工具 14.30.30705.0 版
版权所有 (C) Microsoft Corporation。  保留所有权利。

[  0%] Building CXX object contrib/googletest/googlemock/CMakeFiles/gmock_main.dir/__/googletest/src/gtest-all.cc.obj
cl: 命令行 error D8021 :无效的数值参数“/Werror”
NMAKE : fatal error U1077: “"C:\Program Files\Microsoft Visual Studio\2022\Professional\Common7\IDE\CommonExtensions\Microsoft\CMake\CMake\bin\cmake.exe"”: 返回代码“0x2”
Stop.
NMAKE : fatal error U1077: “"C:\Program Files\Microsoft Visual Studio\2022\Professional\VC\Tools\MSVC\14.30.30705\bin\HostX64\x64\nmake.exe"”: 返回代码“0x2”
Stop.
NMAKE : fatal error U1077: “"C:\Program Files\Microsoft Visual Studio\2022\Professional\VC\Tools\MSVC\14.30.30705\bin\HostX64\x64\nmake.exe"”: 返回代码“0x2”
Stop.
```