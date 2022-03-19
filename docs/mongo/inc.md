---
title: $inc操作
date: 2021-10-04 22:31:28

categories:
  - mongo
---

## 作用

The $inc operator increments a field by a specified value and has the following form:

```json
{ $inc: { <field1>: <amount1>, <field2>: <amount2>, ... } }
```

## 行为

1. The $inc operator accepts positive and negative values.

2. If the field does not exist, $inc creates the field and sets the field to the specified value.

3. Use of the $inc operator on a field with a null value will generate an error.

4. $inc is an atomic operation within a single document

## 示例

Consider a collection products with the following document:

```json
{
  "_id": 1,
  "sku": "abc123",
  "quantity": 10,
  "metrics": {
    "orders": 2,
    "ratings": 3.5
  }
}
```

The following update() operation uses the $inc operator to decrease the quantity field by 2 (i.e. increase by -2) and increase the "metrics.orders" field by 1:

```js
db.products.update(
  { sku: "abc123" },
  { $inc: { quantity: -2, "metrics.orders": 1 } }
);
```

The updated document would resemble:

```json
{
  "_id": 1,
  "sku": "abc123",
  "quantity": 8,
  "metrics": {
    "orders": 3,
    "ratings": 3.5
  }
}
```

## 参考

https://docs.mongodb.com/manual/reference/operator/update/inc/
