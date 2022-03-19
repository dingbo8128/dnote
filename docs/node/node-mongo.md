---
title: Node MongoDB
date: 2021-10-13 04:50:57

  - node
  - mongo
categories: node
---

### find

```js
db.collection("cars")
  .find({})
  .toArray()
  .then((docs) => {});
```

```js
db.collection("cars")
  .find({})
  .project({
    _id: 0,
  })
  .toArray()
  .then((docs) => {
    console.log(docs);
  })
  .catch((err) => {
    console.log(err);
  })
  .finally(() => {
    client.close();
  });
```

### or 过滤
