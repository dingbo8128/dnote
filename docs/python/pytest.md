---
title: Python test
date: 2022-01-14 18:21:19

categories: python
---

## Install

```
pip install -U pytest
```

## Test Discovery

- In those directories, search for test\__.py or _\_test.py files, imported by their test package name.

- From those files, collect test items:

- test prefixed test functions or methods outside of class

- test prefixed test functions or methods inside Test prefixed test classes (without an **init** method)

```
setup.py
mypkg/
    __init__.py
    app.py
    view.py
tests/
    test_app.py
    test_view.py
    ...
```

## Ref

https://docs.pytest.org/
https://docs.pytest.org/en/6.2.x/goodpractices.html#test-discovery
