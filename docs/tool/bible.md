---
title: online bible
date: 2021-09-01 14:27:07

  - bible
  - pyquery
  - bs4
categories: tool
---

{% blockquote %}
{% endblockquote %}

## URL

[和合本](https://bib.vercel.app)

[和修版](https://bibhx.vercel.app)

[ESV](https://bibesv.vercel.app)

## 源码

### 和合本制作源码

```python
import os
from pyquery import PyQuery
from bs4 import BeautifulSoup
from bs4.element import NavigableString
from bs4.element import Tag

html_dir = r"D:\dev\bibhe\html"
md_dir = r"D:\dev\bibhe\pages"

ignore_div_classes = set(["copyright", "mt", "chapterlabel", "main"])


def get_shu_no(_shu_no):
    if _shu_no < 10:
        return '0' + str(_shu_no)
    else:
        return str(_shu_no)


def parse_index_htm():
    _code_file_path = {}
    _code_shu_title = {}
    with open(html_dir + '/index.htm', encoding='utf8') as f:
        d = PyQuery(f.read())
        nav = d(".vnav")
        lis = nav.children()
        shu_no = 0
        begin_nn = False
        for i in range(lis.size()):
            a = lis[i].getchildren()[0]
            className = a.get("class")
            if not className:
                continue
            href = a.get("href")
            shu_title = a.text
            shu_code = href[0:3]
            # 切换新旧约
            if not begin_nn and className == "nn":
                shu_no = 0
                begin_nn = True
            shu_no += 1
            file_name = className[0] + get_shu_no(shu_no) + ".mdx"
            file_path = md_dir + "/" + className[0] + 't/' + file_name
            _code_file_path[shu_code] = file_path
            _code_shu_title[shu_code] = shu_title
    return _code_shu_title, _code_file_path


def html_to_mdx(code_title, code_path):
    print("html_to_mdx")
    html_files = os.listdir(html_dir)
    sorted(html_files)
    for fn in html_files:
        if not fn.endswith('htm'):
            continue
        zhang_code = fn.split('.')[0]
        if not zhang_code[-1].isdigit():
            continue
        print(fn)
        shu_code = zhang_code[0:3]
        zhang = int(zhang_code[3:])  # 章编号
        md_path = code_path[shu_code]  # md路径
        shu_title = code_title[shu_code]  # 书标题
        print(fn, md_path)
        if zhang == 0:
            with open(md_path, encoding="utf8", mode="w") as f:
                # 创建文件，写大标题
                f.write('import Add from "../../components/add";\n')
                f.write('import Nt from "../../components/note";\n')
                f.write('import De from "../../components/de";\n')
                f.write('import Qs from "../../components/qs";\n')
                f.write('import Pn from "../../components/pn";\n\n')
                f.write("# " + shu_title + "\n\n")
        else:
            with open(md_path, encoding="utf8", mode="a") as f2:
                # 追加章标题
                f2.write(f"## {shu_title} {zhang}\n")
                # 追加本章内容
                with open(html_dir + "/" + fn, encoding='utf8', mode="r") as f3:
                    soup = BeautifulSoup(f3.read(), "html.parser")
                    divs = soup.find_all('div')
                    for div in divs:
                        className = div.attrs['class'][0]
                        if className == "p" or className == "q" or className == "m":  # 正文
                            if className == "p":
                                f2.write('\n')
                                f2.write("\u3000\u2002")
                            for s in div:
                                if type(s) == Tag and s.name == 'span':
                                    spanClass = s.attrs['class'][0]
                                    if spanClass == 'verse':
                                        jie_no = s.string.strip()
                                        f2.write(f"<sup>{jie_no}</sup>")
                                    elif spanClass == 'pn':
                                        person_name = s.string
                                        f2.write(f"<Pn>{person_name}</Pn>")
                                    elif spanClass == 'add':
                                        add_str = s.text.strip()
                                        f2.write(f"<Add>{add_str}</Add>")
                                    else:
                                        print("find new span class", spanClass)
                                elif type(s) == Tag and s.name == 'a':
                                    aClass = s.attrs['class'][0]
                                    if aClass == 'notemark':
                                        f2.write(f"<Nt>{s.text.strip()}</Nt>")
                                    else:
                                        print("find new aClass", aClass)
                                elif type(s) == NavigableString:
                                    s_s = s.strip()
                                    f2.write(s_s)
                                else:
                                    print('unknown element', type(s), s)
                            f2.write('<br/>\n')
                        elif className == 's':  # 小节标题
                            jie_title = div.string.strip()
                            f2.write(f"### {jie_title}\n")
                        elif className == 'r':  # 参照章节
                            ref = div.string
                            f2.write(f"<De>{ref}</De>\n")
                        elif className == "b":
                            f2.write("\n\n")
                        elif className == 'd':
                            f2.write(f"<De>{div.string}</De>\n")
                        elif className == "qs":
                            f2.write(f"<Qs>{div.string.strip()}</Qs>\n")
                        elif className == "sp":
                            f2.write(div.string + "<br/>")
                        elif className == "ms":
                            f2.write(div.string.strip() + '<br/>\n')
                        elif className == 'footnote':  # 脚注
                            pass
                        elif className not in ignore_div_classes:
                            print("found new div className", className)


if __name__ == '__main__':
    code_shu_title, code_file_path = parse_index_htm()
    html_to_mdx(code_shu_title, code_file_path)
```

### esv 版源码

```python
import json
import os
import re
from typing import List

p0 = r"D:\dev\bibesv\ESV"
pto = r"D:\dev\bibesv\pages"


def replace_link(m):
    text = m.string[m.start():m.end()]
    link = text[1:-1]
    return f"[{link[7:]}]({link})"


def convert_link(trimed_line: str):
    return re.sub(r'<http.+?>', replace_link, trimed_line)


def convert_jie_no(trimed_line: str):
    """
    将小节编号转为上脚标
    """
    num_text = re.findall(r'\d+ ', trimed_line)
    if len(num_text) > 0:
        num = int(num_text[0])
        trimed_line = trimed_line.replace(num_text[0], f"<sup>{num}</sup>", 1)
        for text in num_text[1:]:
            next_num = int(text)
            if next_num == num + 1:
                num = next_num
                trimed_line = trimed_line.replace(text, f"<sup>{num}</sup>", 1)
    return trimed_line


def convert_foot_note_mark(trimed_line: str):
    t_text: List[str] = re.findall(r'[.,;"?!:\']t ', trimed_line)
    if len(t_text) > 0:
        for t in t_text:
            _t = t.replace('t', '<sup>t</sup>')
            trimed_line = trimed_line.replace(t, _t, 1)
    t_text: List[str] = re.findall(r'[.,;"?!:\']t$', trimed_line)
    if len(t_text) > 0:
        for t in t_text:
            _t = t.replace('t', '<sup>t</sup>')
            trimed_line = trimed_line.replace(t, _t, 1)
    return trimed_line


def is_zhang_title(trimed_line: str):
    """
    :param trimed_line:
    :return: 是否是章标题
    """
    try:
        return trimed_line and (trimed_line[0].isupper() or trimed_line[0].isdigit()) and trimed_line[-1].isdigit()
    except Exception as e:
        print(trimed_line)
        raise e


def is_jie_title(trimed_line: str, shu_name: str = None):
    """
    :param trimed_line:
    :param shu_name:
    :return: 是否是节标题
    """
    try:
        if shu_name != "Psalm":
            return trimed_line and trimed_line[0].isupper() and trimed_line[-1].isalpha() and '.' not in trimed_line and ';' not in trimed_line
        else:
            return trimed_line and trimed_line[0].isupper() and (trimed_line[-1].isalpha() or trimed_line[-1] == '?') and '.' not in trimed_line and ';' not in trimed_line
    except Exception as e:
        print(trimed_line, shu_name)
        raise e


def convert_every_lines(ot_or_nt):
    p1 = p0 + '/' + ot_or_nt
    meta = {}
    for shu in os.listdir(p1):
        print(shu)
        shu_no = shu.split(' ')[0]
        shu_ming_s = shu.split(".")[0].split(" ")[1:]
        shu_name = " ".join(shu_ming_s)
        shu_ming = "-".join(shu_ming_s)
        new_file_name = ot_or_nt[0] + shu_no + "-" + shu_ming
        show_name = shu_no + '-' + shu_name
        meta[new_file_name] = show_name

        new_lines = ['# ' + shu_name + '\n\n']
        with open(p1 + "/" + shu, encoding='utf8', errors="ignore") as f:
            lines = f.readlines()
            # 脚注是否开始
            foot_note = False
            for line in lines:
                trimed_line = line.strip()
                if not foot_note:
                    if trimed_line == 'Footnotes':
                        foot_note = True
                        new_lines.append('\n## ' + line)
                        continue
                if not foot_note:
                    if is_zhang_title(trimed_line):
                        new_lines.append('\n## ' + line)
                    elif is_jie_title(trimed_line, shu_ming):
                        new_lines.append("\n### " + line + "\n")
                    elif trimed_line:
                        new_line = convert_jie_no(trimed_line)
                        new_line = convert_foot_note_mark(new_line)
                        new_lines.append(new_line + "<br/>\n")
                else:
                    new_lines.append(convert_link(trimed_line) + "<br/>\n")

        with open(pto + "/" + ot_or_nt + "/" + new_file_name + ".md", mode="w", encoding='utf8') as f2:
            f2.writelines(new_lines)

        with open(pto + "/" + ot_or_nt + "/meta.json", mode="w") as f3:
            json.dump(meta, f3)


if __name__ == '__main__':
    convert_every_lines("ot")
```
