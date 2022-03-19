---
title: 成为开源贡献者很简单
date: 2021-12-01 15:58:22

categories: git
---

```bash
git clone git@github.com:YOURNAME/TDengine.git
git remote add upstream https://github.com/taosdata/TDengine
git remote -v
git fetch upstream
git branch -va
git checkout master
git merge upstream/master

git branch fix-xxx
git checkout fix-xxx

git commit -m "fix tdengine bug x"
git fetch upstream
git checkout master
git merge upstream/master
git checkout fix-xxx
git rebase master
git push origin HEAD
```
