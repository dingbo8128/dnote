title: 给任意 QLineEdit 添加下拉搜索框
date: 2021-08-17 16:32:54

## categories: qt

```python
from typing import Dict

from PyQt5 import QtWidgets, QtGui, QtCore
from PyQt5.QtCore import Qt, QEvent
from PyQt5.QtWidgets import QLineEdit, QCompleter, QListWidget


class InputCompletor(QtWidgets.QListWidget):
    optionChanged: QtCore.pyqtSignal = QtCore.pyqtSignal(list)

    def __init__(self, line_edit: QLineEdit, callback, display_id_and_name=False):
        super(InputCompletor, self).__init__()
        self.edit_line = line_edit
        self.callback = callback
        self.option_id2name = {}
        self.option_name2d = {}
        self.completor = None
        self.hide()
        self.display_id_and_name = display_id_and_name
        self.init_event()

    def init_event(self):
        self.edit_line.installEventFilter(self)
        self.edit_line.textChanged.connect(self.on_text_changed)
        self.itemDoubleClicked.connect(self.on_list_item_double_clicked)
        self.optionChanged.connect(self.on_option_changed)

    def set_options(self, options: Dict[str, str]):
        """
        display_id_and_name: 是否id和name都在下拉列表出现，默认只展示name
        """
        self.option_id2name = options
        options_to_display = []
        for k, v in options.items():
            name = v.strip()
            self.option_name2d[name] = k
            options_to_display.append(v)
            if self.display_id_and_name and k != v:
                options_to_display.append(k)
        self.optionChanged.emit(options_to_display)

    def on_option_changed(self, options_to_display):
        self.completor = QCompleter(options_to_display, self)
        self.completor.setCaseSensitivity(Qt.CaseInsensitive)
        self.completor.setFilterMode(Qt.MatchContains)
        self.completor.setCompletionMode(QCompleter.PopupCompletion)

    def on_text_changed(self, text):
        if text:
            parent = self.parentWidget() if self.parentWidget() is not None else self.edit_line.window()
            if parent != self.parentWidget():
                self.setParent(parent)
            tl = parent.mapFromGlobal(self.edit_line.mapToGlobal(self.edit_line.rect().bottomLeft()))
            self.setGeometry(tl.x(), tl.y(), self.edit_line.width(), parent.height() - tl.y())
            self.completor.setCompletionPrefix(text)
            self.clear()
            for i in range(self.completor.completionCount()):
                self.completor.setCurrentRow(i)
                self.addItem(self.completor.currentCompletion())
            self.setVisible(self.count() > 0)
            if self.count() == 1 and text == self.item(0).text():
                self.hide()
                self.on_text_editing_finished()
        else:
            self.hide()

    def on_list_item_double_clicked(self, item):
        if item is None:
            return
        self.edit_line.setText(item.text())
        self.on_text_editing_finished()
        self.hide()

    def on_text_editing_finished(self):
        text = self.edit_line.text()
        if text in self.option_id2name:
            name = self.option_id2name.get(text)
            self.callback(text, name)
        elif text in self.option_name2d:
            _id = self.option_name2d.get(text)
            self.callback(_id, text)

    def eventFilter(self, a0: QtCore.QObject, a1: QtCore.QEvent) -> bool:
        if a0 == self.edit_line:
            if a1.type() == QEvent.KeyPress or a1.type() == QEvent.KeyRelease:
                k = a1.key()
                if k == Qt.Key_Down or k == Qt.Key_Up or k == Qt.Key_PageUp or k == Qt.Key_PageDown:
                    self.keyPressEvent(a1) if a1.type() == QEvent.KeyPress else self.keyReleaseEvent(a1)
                elif k == Qt.Key_Return and a1.type() == QEvent.KeyPress:
                    self.hide()
                    if self.edit_line.isVisible() and self.currentItem():
                        self.edit_line.setText(self.currentItem().text())
                        self.on_text_editing_finished()
                        a1.accept()
                        return True
                elif k == Qt.Key_Escape:
                    self.hide()
                    a1.accept()
                    return True
            elif a1.type() == QEvent.FocusOut and not self.hasFocus():
                self.hide()
            return False
        else:
            return QListWidget.eventFilter(self, a0, a1)

    def keyPressEvent(self, e: QtGui.QKeyEvent) -> None:
        if e.key() == Qt.Key_Escape:
            self.hide()
        QListWidget.keyPressEvent(self, e)
```
