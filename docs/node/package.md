---
title: Node打包相关
date: 2021-09-17 16:32:22

  - node
  - npm
categories: node
---

## 什么是 peerDependencies？

如果你安装我，那么你最好也安装 X, Y 和 Z.

例如：

```json
"peerDependencies": {
    "react": ">=16.0.0",
    "react-dom": ">=16.0.0"
}
```
