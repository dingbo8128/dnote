---
title: JIRA
date: 2021-11-19 09:40:08

categories: tool
---

## JQL

### 一般过滤

```
assignee in (bding) ORDER BY created ASC
```

```
assignee in (bding) and type=RD-SubTask  ORDER BY created ASC
```

```
key in (TD-10944,TD-10945,TD-10966,TD-11105,TD-11126,TD-11127,TD-11140,TD-11143)
```

```
status in (NEW, "In Progress") AND assignee in (bding) ORDER BY created ASC
```

### 本周更新的任务

```sql
assignee in (bding)  and status not in (CANCEL)  AND updated >= startOfWeek() ORDER BY updated DESC, created DESC
```

### 昨天更新的任务

#### 指派给我的

```sql
assignee in (bding)  and status not in (CANCEL)  AND updated >=  "-1d" ORDER BY updated DESC, created DESC
```

#### 指派给我的和我关注的

```sql
(assignee in (bding) or watcher = "bding") AND status not in (CANCEL) AND updated >= -1d ORDER BY updated DESC, created DESC
```

### 报告问题过滤

```sql
creator = bding and createdDate  > startOfWeek() and type != RD-Review
```
