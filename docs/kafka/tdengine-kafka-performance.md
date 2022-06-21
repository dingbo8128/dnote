# TDengine Kafka Connector 性能测试

## 安装 InfluxDB 插件

```
confluent-hub install confluentinc/kafka-connect-influxdb:latest
```

```
[root@vm95 ~]# confluent-hub install confluentinc/kafka-connect-influxdb:latest
The component can be installed in any of the following Confluent Platform installations: 
  1. /opt/confluent-7.1.1 (based on $CONFLUENT_HOME) 
  2. /opt/confluent-7.1.1 (where this tool is installed) 
Choose one of these to continue the installation (1-2): 1
Do you want to install this into /opt/confluent-7.1.1/share/confluent-hub-components? (yN) y

 
Component's license: 
Confluent Software Evaluation License 
https://www.confluent.io/software-evaluation-license 
I agree to the software license agreement (yN) y

Downloading component Kafka Connect InfluxDB 1.2.3, provided by Confluent, Inc. from Confluent Hub and installing into /opt/confluent-7.1.1/share/confluent-hub-components 
Detected Worker's configs: 
  1. Standard: /opt/confluent-7.1.1/etc/kafka/connect-distributed.properties 
  2. Standard: /opt/confluent-7.1.1/etc/kafka/connect-standalone.properties 
  3. Standard: /opt/confluent-7.1.1/etc/schema-registry/connect-avro-distributed.properties 
  4. Standard: /opt/confluent-7.1.1/etc/schema-registry/connect-avro-standalone.properties 
  5. Based on CONFLUENT_CURRENT: /tmp/confluent.549848/connect/connect.properties 
Do you want to update all detected configs? (yN) y

Adding installation directory to plugin path in the following files: 
  /opt/confluent-7.1.1/etc/kafka/connect-distributed.properties 
  /opt/confluent-7.1.1/etc/kafka/connect-standalone.properties 
  /opt/confluent-7.1.1/etc/schema-registry/connect-avro-distributed.properties 
  /opt/confluent-7.1.1/etc/schema-registry/connect-avro-standalone.properties 
  /tmp/confluent.549848/connect/connect.properties 
 
Completed 
```

## 安装 InfluxDB

```
wget https://dl.influxdata.com/influxdb/releases/influxdb2-2.2.0-linux-amd64.tar.gz
tar xvzf path/to/influxdb2-2.2.0-linux-amd64.tar.gz
sudo cp influxdb2-2.2.0-linux-amd64/influxd /usr/local/bin/
nohup influxd
```


## 安装 influx CLI

```
wget https://dl.influxdata.com/influxdb/releases/influxdb2-client-2.3.0-linux-amd64.tar.gz
tar -xzvf
cp influxdb2-client-2.3.0-linux-amd64/influx /usr/local/bin/
```

## setup influx 

```
influx setup
root/testinflux
```
```
Username:          root
  Organization:      taos
  Bucket:            test
  Retention Period:  infinite
  ```


## Install Datagen

```
confluent-hub install confluentinc/kafka-connect-datagen:0.5.3
```

## REST API

```
curl -X POST -H "Content-Type: application/vnd.kafka.json.v2+json" --data '{"records":[{"value":"meters,location=Beijing.Haidian,groupid=2 current=11.8,voltage=221,phase=0.28 1648432611249000000"}]}' "http://localhost:8082/topics/jsontest"
```