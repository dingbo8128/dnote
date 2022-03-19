---
title: github
date: 2021-11-04 14:24:05

categories: git
---

# Online vscode

按键盘上的 "." 号，进入 github.dev

# pull request

pull request 要么要求分支不同，要么要求仓库不同。

# github actions

## limit

- Job execution time - 6 hours
- Workflow run time - Each workflow run is limited to 72 hours.
- API requests - You can execute up to 1000 API requests in an hour across all actions within a repository.
- API requests - You can execute up to 1000 API requests in an hour across all actions within a repository.API requests - You can execute up to 1000 API requests in an hour across all actions within a repository.

- Concurrent jobs - 免费版 20 个

## 设计

1. 如果你需要某个 action，不必自己写复杂的脚本，直接引用他人写好的 action 即可，整个持续集成过程，就变成了一个 actions 的组合。
2. action 市场：https://github.com/marketplace?type=actions
3. 每个 action 就是一个独立脚本, 因此可以做成代码仓库，使用 userName/repoName 的语法引用 action

## 概念

1. workflow （工作流程）：持续集成一次运行的过程，就是一个 workflow。
2. job （任务）：一个 workflow 由一个或多个 jobs 构成，含义是一次持续集成的运行，可以完成多个任务。
3. step（步骤）：每个 job 由多个 step 构成，一步步完成。
4. action （动作）：每个 step 可以依次执行一个或多个命令（action）。

## workflow 文件

GitHub Actions 的配置文件叫做 workflow 文件，存放在代码仓库的.github/workflows 目录。

workflow 文件采用 YAML 格式，文件名可以任意取，但是后缀名统一为.yml，比如 foo.yml。一个库可以有多个 workflow 文件。GitHub 只要发现.github/workflows 目录里面有.yml 文件，就会自动运行该文件。

```yaml
name: Greeting from Mona
on: push

jobs:
  my-job:
    name: My Job
    runs-on: ubuntu-latest
    steps:
      - name: Print a greeting
        env:
          MY_VAR: Hi there! My name is
          FIRST_NAME: Mona
          MIDDLE_NAME: The
          LAST_NAME: Octocat
        run: |
          echo $MY_VAR $FIRST_NAME $MIDDLE_NAME $LAST_NAME.
```

## 参考

https://docs.github.com/en/actions/learn-github-actions/understanding-github-actions
http://www.ruanyifeng.com/blog/2019/09/getting-started-with-github-actions.html
