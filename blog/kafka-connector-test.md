
# TDengine Kafka Sink Connector 的使用和性能测试


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
```

```
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

| records  | partitions | start time              | stop time               | total ms | rows per second |
| -------- | ---------- | ----------------------- | ----------------------- | -------- | --------------- |
| 1000000  | 1          | 2022-06-21 17:43:37,897 | 2022-06-21 17:43:47,401 |          |                 |
| 1000000  | 3          | 2022-06-21 17:47:42,901 | 2022-06-21 17:47:47,194 |          |                 |
| 1000000  | 5          | 2022-06-21 17:48:52,115 | 2022-06-21 17:48:55,118 |          |                 |
| 1000000  | 10         | 2022-06-21 17:49:54,568 | 2022-06-21 17:49:56,609 |          |                 |
| 3000000  | 1          | 2022-06-21 17:51:32,717 | 2022-06-21 17:52:00,585 |          |                 |
| 3000000  | 3          | 2022-06-21 17:54:05,490 | 2022-06-21 17:54:18,025 |          |                 |
| 3000000  | 5          | 2022-06-21 17:55:35,585 | 2022-06-21 17:55:43,844 |          |                 |
| 3000000  | 10         | 2022-06-21 17:56:54,153 | 2022-06-21 17:56:59,387 |          |                 |
| 5000000  | 1          | 2022-06-21 18:00:57,023 | 2022-06-21 18:01:43,182 |          |                 |
| 5000000  | 3          | 2022-06-21 18:06:23,837 | 2022-06-21 18:06:44,115 |          |                 |
| 5000000  | 5          | 2022-06-21 18:08:53,107 | 2022-06-21 18:09:06,840 |          |                 |
| 5000000  | 10         | 2022-06-21 18:13:10,664 | 2022-06-21 18:13:19,274 |          |                 |
| 10000000 | 3          | 2022-06-21 18:16:22,986 | 2022-06-21 18:17:03,170 |          |                 |
| 10000000 | 5          | 2022-06-21 18:18:57,334 | 2022-06-21 18:19:24,150 |          |                 |
| 10000000 | 10         | 2022-06-21 18:23:31,087 | 2022-06-21 18:23:48,851 |          |                 |
| 15000000 | 5          | 2022-06-21 18:30:35,686 | 2022-06-21 18:31:15,444 |          |                 |
| 15000000 | 10         | 2022-06-21 18:33:13,990 | 2022-06-21 18:33:41,669 |          |                 |
| 20000000 | 1          | 2022-06-21 18:37:56,434 | 2022-06-21 18:41:09,436 |          |                 |
| 20000000 | 10         | 2022-06-21 18:43:44,367 | 2022-06-21 18:44:20,244 |          |                 |

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

