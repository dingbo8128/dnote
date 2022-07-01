<<<<<<< HEAD:docs/github/github.md
---
title: github
date: 2021-11-04 14:24:05
categories: git
---
=======
# github
>>>>>>> 1b57348d46990682ead89e4faba60f6c1b96f392:docs/git/github.md


## Online vscode

按键盘上的 "." 号，进入 github.dev

## contrib

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

## 参考

https://docs.github.com/en/actions/learn-github-actions/understanding-github-actions
http://www.ruanyifeng.com/blog/2019/09/getting-started-with-github-actions.html
