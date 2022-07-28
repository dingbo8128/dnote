## 微脚本

* 压缩
  `tar -Jcf file.tar.xz dir`
* 解压缩
  `tar -xf file.tar.xz -C dir`

* 批量解压zip文件
   `ls *.zip | xargs -n1 unzip`
* 压缩一个目录 
  `zip -q -r dirname.zip dirname`
* 批量压缩一个目录 
   `ls  | xargs -n1 -I dirname zip -q -r dirname.zip dirname`
* 监控所有python进程 
  `watch -n 5 "ps xf | grep python3 | grep -v grep"`
* 按时间范围查找语音文件并复制到指定目录
  `find voice2/ -name *.amr -newermt '2019-10-21' ! -newermt '2019-10-22' | xargs -n1 -I filepath cp -a filepath ./`

* 批量重命名
  `for ((i=50;i>=15;i--));do mv  $i.csv  $(($i+1)).csv; done`
* 统计每个子目录文件数
  `ls */* | awk -F'/' '{print $1}' | uniq -c`

* 删除文件中特定字符串
 `cat file | tr -d '\000' > file2`


## 长脚本

### 删除乱码的文件或目录

```bash
ls -li
find -inum 532873 -delete
find -inum 532837  -exec rm {} -rf \;
```

### while循环和字符串比较
```bash
fromday=2020-01-15
today=2020-02-12
tmpdate=$fromday
while [[ $tmpdate < $today || $tmpdate == $today ]]; do
    echo $tmpdate
    #tmpdate=`aadday $tmpdate 1` # mac
 	#tmpdate=` date -d "${tmpdate}  1 days" +"%Y-%m-%d"` # linux
done 
```

## rpm

### 查询已安装包
```
rpm -qa
```
### 卸载已安装包

```
rpm -e packate-name
```

### 安装包
```
rpm -ivh package-name
```

## 求和
```
awk '{a+=$1}END{print a}'
```

## 搜索历史命令

Ctrl + r

## sudo

* -E: 用户可以在sudo执行时保留当前用户已存在的环境变量，不会被sudo重置

## apt 

1. 自动修复依赖关系：`apt install -f`
2. 更新系统存储库索引： `apt update`

## dpkg 

1. 安装本地deb包: `dpkg -i xxx.deb`

## netstat

```
netstat -ntlp
```
