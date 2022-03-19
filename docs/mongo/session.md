---
title: mongodb会话和事务
date: 2021-10-04 23:11:12

categories: mongo
---

```js
const session = client.startSession();
try {
  await session.withTransaction(async () => {
    const doc = await collection.findOne({ pageId: pageId });
    if (doc === null) {
      response.send({ count: 1 });
      await collection.insertOne({ pageId: pageId, count: 1 });
    } else {
      const newCount = doc.count + 1;
      response.send({ count: newCount });
      await collection.updateOne(
        { pageId: pageId },
        { $set: { count: newCount } }
      );
    }
  });
} finally {
  await session.endSession();
}
```
