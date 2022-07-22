# gdb

```
gdb java core.1234
gdb taos core.4567
```


1、l（list）：显示源代码，并且可以看到对应的行号；

2、b（break）x：x是行号，表示在对应的行号位置设置断点；

3、p（print）x：x是变量名，表示打印变量x的值；

4、r（run）：表示继续执行到断点的位置；

5、n（next）：表示执行下一步；

6、c（continue）：表示继续执行；

7、q（quit）：表示退出gdb；

8、info share：查看已加载的动态库；

9、bt：查看程序堆栈信息；
