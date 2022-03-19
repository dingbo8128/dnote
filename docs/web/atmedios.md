---
title: CSS3 多媒体查询
date: 2021-07-02 13:52:12

categories: web
---

<div class="biblewords">
Love is patient and kind; love does not envy or boast; it is not arrogant.
</div>

## 语法

在设备满足一定条件时，触发对应的 css 样式。

```
@media mediatype and|not|only (media feature) {
    CSS-Code;
}
```

## mediatype

- all： 所有
- print: 打印机
- screen： 屏幕
- speech： 屏幕阅读器

## media feature

| 值                      | 描述                                                                             |
| ----------------------- | -------------------------------------------------------------------------------- |
| aspect-ratio            | 定义输出设备中的页面可见区域宽度与高度的比率                                     |
| color                   | 定义输出设备每一组彩色原件的个数。如果不是彩色设备，则值等于 0                   |
| color-index             | 定义在输出设备的彩色查询表中的条目数。如果没有使用彩色查询表，则值等于 0         |
| device-aspect-ratio     | 定义输出设备的屏幕可见宽度与高度的比率。                                         |
| device-height           | 定义输出设备的屏幕可见高度。                                                     |
| device-width            | 定义输出设备的屏幕可见宽度。                                                     |
| grid                    | 用来查询输出设备是否使用栅格或点阵。                                             |
| height                  | 定义输出设备中的页面可见区域高度。                                               |
| max-aspect-ratio        | 定义输出设备的屏幕可见宽度与高度的最大比率。                                     |
| max-color               | 定义输出设备每一组彩色原件的最大个数。                                           |
| max-color-index         | 定义在输出设备的彩色查询表中的最大条目数。                                       |
| max-device-aspect-ratio | 定义输出设备的屏幕可见宽度与高度的最大比率。                                     |
| max-device-height       | 定义输出设备的屏幕可见的最大高度。                                               |
| max-device-width        | 定义输出设备的屏幕最大可见宽度。                                                 |
| max-height              | 定义输出设备中的页面最大可见区域高度。                                           |
| max-monochrome          | 定义在一个单色框架缓冲区中每像素包含的最大单色原件个数。                         |
| max-resolution          | 定义设备的最大分辨率。                                                           |
| max-width               | 定义输出设备中的页面最大可见区域宽度。                                           |
| min-aspect-ratio        | 定义输出设备中的页面可见区域宽度与高度的最小比率。                               |
| min-color               | 定义输出设备每一组彩色原件的最小个数。                                           |
| min-color-index         | 定义在输出设备的彩色查询表中的最小条目数。                                       |
| min-device-aspect-ratio | 定义输出设备的屏幕可见宽度与高度的最小比率。                                     |
| min-device-width        | 定义输出设备的屏幕最小可见宽度。                                                 |
| min-device-height       | 定义输出设备的屏幕的最小可见高度。                                               |
| min-height              | 定义输出设备中的页面最小可见区域高度。                                           |
| min-monochrome          | 定义在一个单色框架缓冲区中每像素包含的最小单色原件个数                           |
| min-resolution          | 定义设备的最小分辨率。                                                           |
| min-width               | 定义输出设备中的页面最小可见区域宽度。                                           |
| monochrome              | 定义在一个单色框架缓冲区中每像素包含的单色原件个数。如果不是单色设备，则值等于 0 |
| orientation             | 定义输出设备中的页面可见区域高度是否大于或等于宽度。                             |
| resolution              | 定义设备的分辨率。如：96dpi, 300dpi, 118dpcm                                     |
| scan                    | 定义电视类设备的扫描工序。                                                       |
| width                   | 定义输出设备中的页面可见区域宽度                                                 |

## 示例

```html
!DOCTYPE html>
<html>
  <head>
    <style>
      ul {
        list-style-type: none;
      }

      ul li a {
        color: green;
        text-decoration: none;
        padding: 3px;
        display: block;
      }

      @media screen and (max-width: 699px) and (min-width: 520px) {
        ul li a {
          padding-left: 30px;
          background: url(email-icon.png) left center no-repeat;
        }
      }

      @media screen and (max-width: 1000px) and (min-width: 700px) {
        ul li a:before {
          content: "Email: ";
          font-style: italic;
          color: #666666;
        }
      }

      @media screen and (min-width: 1001px) {
        ul li a:after {
          content: " (" attr(data-email) ")";
          font-size: 12px;
          font-style: italic;
          color: #666666;
        }
      }
    </style>
  </head>

  <body>
    <ul>
      <li>
        <a data-email="johndoe@example.com" href="mailto:johndoe@example.com"
          >John Doe</a
        >
      </li>
      <li>
        <a data-email="marymoe@example.com" href="mailto:marymoe@example.com"
          >Mary Moe</a
        >
      </li>
      <li>
        <a
          data-email="amandapanda@example.com"
          href="mailto:amandapanda@example.com"
          >Amanda Panda</a
        >
      </li>
    </ul>
  </body>
</html>
```
