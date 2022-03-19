---
title: QTreeWidget
date: 2021-07-27 16:32:54

categories: qt
---

{% blockquote %}
{% endblockquote %}

## 展开指定行

```python
class StgTreeView(QtWidgets.QTreeWidget):

    def restore_expanded_state(self):
        model = self.model()
        for row in self.expanded_rows:
            index = model.index(row, 0)
            self.expand(index)
```
