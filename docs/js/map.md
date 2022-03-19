---
title: JS Map
date: 2021-10-05 18:03:37

categories: js
---

## Map 对象

Map 对象是一种有对应键值对的对象，JS 的 Object 也是键值对的对象。

ES6 中的 Map 相对 Object 对象有几个区别?

1. Object 对象有原型，也就是说它有默认的 key 值在对象上面，除非我们使用 Object.create(null)创建一个没有原型的对象;
2. 在 Object 中，只能把 String 和 Symbol 作为 key 值，但是在 Map 中，key 值可以是任何基本类型(String,Number,Boolean,undefined,NaN…),或者对象(Map,Set,Object,Function,Symbol,null…);
3. 通过 Map 中的 size 属性，可以很方便地获取 Map 长度，要获取 Object 的长度，你只能用别的方法;

Map 实例对象的 key 值可以为一个数组或者一个对象，或者一个函数，比较随意，而且 Map 对象实例中数据的排序是根据用户 push 的顺序进行排序的，而 Object 实例中 key,value 的顺序则有些规律(它们会先排数字开头的值，然后才是字符串开头的 key 值);

## Map 实例属性

map.size 这个属性和数组的 length 功能一样，都表示当前实例的长度。

## Map 实例的方法

1. clear() 删除所有的键值对;
2. delete(key) 删除指定键;
3. entries() 返回一个迭代器，迭代器按照对象的插入顺序返回[key,value];
4. forEach(callback,context) 循环执行函数并把键值对作为参数，context 为执行函数的上下文 this;
5. get(key) 返回 Map 对象 key 相对的 value 值;
6. has(key) 返回布尔值，判断 Map 对象是否存在指定的 key;
7. keys() 返回一个迭代器，迭代器按照插入的顺序返回每一个 key 元素;
8. set(key,value) 给 Map 对象设置 key/value 键值对，返回这个 Map 对象(相对于 JavaScript 的 Set，Set 对象添加元素的方法叫 add,而 Map 对象添加元素的方法为 set)
9. iterator 和 entireds()方法一样，返回一个迭代器，迭代器按照对象的插入顺序返回[key,value]
