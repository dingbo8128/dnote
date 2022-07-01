
---
slug: mdx-blog-post
title: TDengine Kafka Sink Connector 的使用和性能测试
authors: [boding]
--- 


## Install TDengine

```
version=2.6.0.4
pkgname=TDengine-server-$version-Linux-x64.rpm
wget https://www.taosdata.com/assets-download/$pkgname
rpm -e tdengine
rpm -ivh  $pkgname
```

## Install Kafka


```
wget https://dlcdn.apache.org/kafka/3.2.0/kafka_2.13-3.2.0.tgz
tar -xzf kafka_2.13-3.2.0.tgz
```




将 bin 目录加入 PATH 


## Config Kafka 

```
cd kafka_2.13-3.2.0/config/
vi connect-standalone.properties
```

```
plugin.path=/home/bding/connectors
```

## 修改日志级别

```
vi connect-log4j.properties
```
```
log4j.logger.com.taosdata.kafka.connect.sink=DEBUG
```

## 编译安装插件

```
git clone git@github.com:taosdata/kafka-connect-tdengine.git
cd kafka-connect-tdengine
mvn clean package
unzip -d ~/connectors target/components/packages/taosdata-kafka-connect-tdengine-*.zip
```

## Start



```
zookeeper-server-start.sh config/zookeeper.properties
```

```
kafka-server-start.sh config/server.properties
```

## Create Topic

```
kafka-topics.sh --create --topic quickstart-events --bootstrap-server localhost:9092
```

## Describe Topic

```
kafka-topics.sh --describe --topic quickstart-events --bootstrap-server localhost:9092
```

## Write Test Events INTO THE Topic

```
kafka-console-producer.sh --topic quickstart-events --bootstrap-server localhost:9092
```

## Read The Events
```
kafka-console-consumer.sh --topic quickstart-events --from-beginning --bootstrap-server localhost:9092
```

## Start Connector

```
connect-standalone.sh config/connect-standalone.properties config/connect-file-source.properties config/connect-file-sink.properties
```

## Stop 
```
zookeeper-server-stop.sh 
kafka-server-stop.sh 
```

## 测试环境


1. openjdk version "1.8.0_322"
2. 系统 CentOS 7.9
3. 64G 内存
4. 16 核 CPU， 型号为 x86_64, Intel(R) Core(TM) i7-10700 CPU @ 2.90GHz
5. TDengine  2.6.0.4
6. Kafka 3.2

## 监控日志

```
[bding@vm95 logs]$ tail -f connect.log
[2022-06-21 17:39:00,174] DEBUG [TDengineSinkConnector|task-0] Received 64 records. First record kafka coordinates:(meters-0-314432). Writing them to the database... (com.taosdata.kafka.connect.sink.TDengineSinkTask:101)
[2022-06-21 17:39:00,176] DEBUG [TDengineSinkConnector|task-0] Received 500 records. First record kafka coordinates:(meters-0-314496). Writing them to the database... (com.taosdata.kafka.connect.sink.TDengineSinkTask:101)
[2022-06-21 17:39:00,180] DEBUG [TDengineSinkConnector|task-0] Received 500 records. First record kafka coordinates:(meters-0-314996). Writing them to the database... (com.taosdata.kafka.connect.sink.TDengineSinkTask:101)
[2022-06-21 17:39:00,185] DEBUG [TDengineSinkConnector|task-0] Received 500 records. First record kafka coordinates:(meters-0-315496). Writing them to the database... (com.taosdata.kafka.connect.sink.TDengineSinkTask:101)
[2022-06-21 17:39:00,189] DEBUG [TDengineSinkConnector|task-0] Received 500 records. First record kafka coordinates:(meters-0-315996). Writing them to the database... (com.taosdata.kafka.connect.sink.TDengineSinkTask:101)
[2022-06-21 17:39:00,194] DEBUG [TDengineSinkConnector|task-0] Received 500 records. First record kafka coordinates:(meters-0-316496). Writing them to the database... (com.taosdata.kafka.connect.sink.TDengineSinkTask:101)
[2022-06-21 17:39:00,198] DEBUG [TDengineSinkConnector|task-0] Received 500 records. First record kafka coordinates:(meters-0-316996). Writing them to the database... (com.taosdata.kafka.connect.sink.TDengineSinkTask:101)
[2022-06-21 17:39:00,203] DEBUG [TDengineSinkConnector|task-0] Received 500 records. First record kafka coordinates:(meters-0-317496). Writing them to the database... (com.taosdata.kafka.connect.sink.TDengineSinkTask:101)
[2022-06-21 17:39:00,207] DEBUG [TDengineSinkConnector|task-0] Received 500 records. First record kafka coordinates:(meters-0-317996). Writing them to the database... (com.taosdata.kafka.connect.sink.TDengineSinkTask:101)
[2022-06-21 17:39:00,212] DEBUG [TDengineSinkConnector|task-0] Received 500 records. First record kafka coordinates:(meters-0-318496). Writing them to the database... (com.taosdata.kafka.connect.sink.TDengineSinkTask:101)
```
## 测试结果

| start_time              | stop_time               | total_seconds | total_records | partitions | rows_per_second |
| ----------------------- | ----------------------- | ------------- | ------------- | ---------- | --------------- |
| 2022-06-21 17:43:37.897 | 2022-06-21 17:43:47.401 | 9.504         | 1000000       | 1          | 105219          |
| 2022-06-21 17:47:42.901 | 2022-06-21 17:47:47.194 | 4.293         | 1000000       | 3          | 232937          |
| 2022-06-21 17:48:52.115 | 2022-06-21 17:48:55.118 | 3.003         | 1000000       | 5          | 333000          |
| 2022-06-21 17:49:54.568 | 2022-06-21 17:49:56.608 | 2.041         | 1000000       | 10         | 489956          |
| 2022-06-21 17:51:32.717 | 2022-06-21 17:52:00.585 | 27.868        | 3000000       | 1          | 107650          |
| 2022-06-21 17:54:05.490 | 2022-06-21 17:54:18.025 | 12.535        | 3000000       | 3          | 239330          |
| 2022-06-21 17:55:35.585 | 2022-06-21 17:55:43.844 | 8.259         | 3000000       | 5          | 363240          |
| 2022-06-21 17:56:54.153 | 2022-06-21 17:56:59.387 | 5.234         | 3000000       | 10         | 573175          |
| 2022-06-21 18:00:57.023 | 2022-06-21 18:01:43.181 | 46.159        | 5000000       | 1          | 108321          |
| 2022-06-21 18:06:23.836 | 2022-06-21 18:06:44.115 | 20.278        | 5000000       | 3          | 246573          |
| 2022-06-21 18:08:53.107 | 2022-06-21 18:09:06.839 | 13.733        | 5000000       | 5          | 364087          |
| 2022-06-21 18:13:10.664 | 2022-06-21 18:13:19.273 | 8.610         | 5000000       | 10         | 580720          |
| 2022-06-21 18:16:22.986 | 2022-06-21 18:17:03.170 | 40.184        | 10000000      | 3          | 248855          |
| 2022-06-21 18:18:57.334 | 2022-06-21 18:19:24.150 | 26.816        | 10000000      | 5          | 372912          |
| 2022-06-21 18:23:31.086 | 2022-06-21 18:23:48.851 | 17.764        | 10000000      | 10         | 562936          |
| 2022-06-21 18:30:35.686 | 2022-06-21 18:31:15.444 | 39.758        | 15000000      | 5          | 377283          |
| 2022-06-21 18:33:13.990 | 2022-06-21 18:33:41.668 | 27.679        | 15000000      | 10         | 541927          |
| 2022-06-21 18:37:56.434 | 2022-06-21 18:41:09.436 | 193.002       | 20000000      | 1          | 103626          |
| 2022-06-22 10:12:28.246 | 2022-06-22 10:13:49.905 | 81.659        | 20000000      | 3          | 244921          |
| 2022-06-22 10:16:21.467 | 2022-06-22 10:17:15.318 | 53.850        | 20000000      | 5          | 371402          |
| 2022-06-21 18:43:44.367 | 2022-06-21 18:44:20.243 | 35.877        | 20000000      | 10         | 557460          |


| 任务数 | 记录数   | 耗时(秒) | 每秒写入条数 |
| ------ | -------- | -------- | ------------ |
| 1      | 1000000  | 9.504    | 105219       |
| 3      | 1000000  | 4.293    | 232937       |
| 5      | 1000000  | 3.003    | 333000       |
| 10     | 1000000  | 2.041    | 489956       |
| 1      | 3000000  | 27.868   | 107650       |
| 3      | 3000000  | 12.535   | 239330       |
| 5      | 3000000  | 8.259    | 363240       |
| 10     | 3000000  | 5.234    | 573175       |
| 1      | 5000000  | 46.159   | 108321       |
| 3      | 5000000  | 20.278   | 246573       |
| 5      | 5000000  | 13.733   | 364087       |
| 10     | 5000000  | 8.610    | 580720       |
| 3      | 10000000 | 40.184   | 248855       |
| 5      | 10000000 | 26.816   | 372912       |
| 10     | 10000000 | 17.764   | 562936       |
| 5      | 15000000 | 39.758   | 377283       |
| 10     | 15000000 | 27.679   | 541927       |
| 1      | 20000000 | 193.002  | 103626       |
| 3      | 20000000 | 81.659   | 244921       |
| 5      | 20000000 | 53.850   | 371402       |
| 10     | 20000000 | 35.877   | 557460       |




## tasks.max
Maximum number of tasks to use for this connector.

Type:	int
Default:	1
Valid Values:	[1,...]
Importance:	high


## 参考

https://newbedev.com/ideal-value-for-kafka-connect-distributed-tasks-max-configuration-setting


In a Kafka Connect sink, the tasks are essentially consumer threads and receive partitions to read from.
对于 Kafka Connect Sink, task 的本质上就是消费者线程，接收从 topic 的分区读出来的数据。

If you have 10 partitions and have tasks.max set to 5, each task with receive 2 partitions to read from and track the offsets. 
如果你有 10 个分区，并且 tasks.max 设置为 5， 那么每个 task 会收到 2 个分区的数据，并跟踪 2 个分区的 offsets.

If you have configured tasks.max to a number above the partition count Connect will launch a number of tasks equal to the partitions of the topics it's reading.
如果你配置的 tasks.max 比 partition 数大， Connect 会启动的 task 数与 topic 的 partition 数相同.


If you change the partition count of the topic you'll have to relaunch your connect task, if tasks.max is still greater than the partition count, Connect will start that many tasks.
如果你改变了分区数，那么就必须重新启动 connect task。

https://docs.confluent.io/home/connect/self-managed/userguide.html#kconnect-producers-and-consumers

You can override these defaults by using the producer.* properties in the worker configuration or by using the producer.override.* properties in connector configurations, but changing these default properties may compromise the delivery guarantees of Connect.



## 数据分布

1000万 10 个分区
[bding@vm95 kafka-logs]$ du -h ./ -d 1
125M    ./meters-8
149M    ./meters-7
119M    ./meters-9
138M    ./meters-4
110M    ./meters-3
158M    ./meters-6
131M    ./meters-5
105M    ./meters-0
113M    ./meters-2
99M     ./meters-1

