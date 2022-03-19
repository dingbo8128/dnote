---
title: pymongo使用bulk操作批量插入或更新
date: 2021-06-01 11:59:21

  - bulk
  - mongodb
  - pymongo
categories:
  - mongo
  - pymongo
---

## 需求

批量导入数据，如果某个"\_id"在数据中已存在，则覆盖已有的记录，否则插入新的记录。

## 尝试

一开始使用 insert_many 接口导致 duplicate key 错误。insert_many 也没有遇到重复记录自动更新的选项。所以改用 build_write 加 UpdateOne 操作，并设置 upsert=True

## 代码执行前

```json
{
  "_id": "a01",
  "name": "name01"
}
```

## 代码

```python
import pymongo
from pymongo import UpdateOne

client = pymongo.MongoClient("mongodb://testuser:password@192.168.2.33:27017/admin?readPreference=primary")

documents = [
    {
        "_id": "a01",
        "name": "name0000000001"
    },
    {
        "_id": "a02",
        "name": "name02"
    },
    {
        "_id": "a03",
        "name": "name03"
    }
]

coll = client.get_database("testdb").get_collection("test")
requests = [UpdateOne({"_id": d["_id"]}, {"$set": d}, upsert=True) for d in documents]
coll.bulk_write(requests)
```

## 代码执行后

```json
{
    "_id" : "a01",
    "name" : "name0000000001"
}
{
    "_id" : "a02",
    "name" : "name02"
}
{
    "_id" : "a03",
    "name" : "name03"
}
```
