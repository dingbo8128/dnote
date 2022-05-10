# Confluent

## Install

### docker

```
curl -L "https://github.com/docker/compose/releases/download/1.29.2/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
```

```
curl --silent --output docker-compose.yml \
  https://raw.githubusercontent.com/confluentinc/cp-all-in-one/7.1.1-post/cp-all-in-one/docker-compose.yml
```

```
docker-compose up -d
```

### tar archive

```
wget https://packages.confluent.io/archive/7.1/confluent-7.1.1.tar.gz?_ga=2.84762459.359235862.1651723578-1000909556.1636525242
tar -xvf confluent-7.1.1.tar.gz
mv confluent-7.1.1 /opt/
```

``` title="~/.bash_profile"
export CONFLUENT_HOME=/opt/confluent-7.1.1
PATH=$CONFLUENT_HOME/bin
export PATH
```

```
confluent-hub install \
   --no-prompt confluentinc/kafka-connect-datagen:latest
```

默认 plugin.path=/usr/share/java,/opt/confluent-7.1.1/share/confluent-hub-components

启动

```
confluent local services start
```

停止
```
confluent local services stop
```

## Connect

```
[root@vm95 kafka]# grep plugin.path *
connect-distributed.properties:# plugin.path=/usr/local/share/java,/usr/local/share/kafka/plugins,/opt/connectors,
connect-distributed.properties:plugin.path=/usr/share/java,/opt/confluent-7.1.1/share/confluent-hub-components
connect-standalone.properties:# plugin.path=/usr/local/share/java,/usr/local/share/kafka/plugins,/opt/connectors,
connect-standalone.properties:plugin.path=/usr/share/java,/opt/confluent-7.1.1/share/confluent-hub-components
```


```
confluent local services connect connector load TDengineSinkConnector --config ./sink-test.properties
```

## control center

http://vm95:9021/



## Reference

### kafka connect
https://developer.confluent.io/learn-kafka/kafka-connect/intro

Kafka Connect runs in its own process, separate from the Kafka brokers.

Using Kafka Connect requires no programming, because it is driven by JSON configuration alone. 

Why Kafka Connect? Why Not Write Our Own Integrations?

Apache Kafka has its own very capable producer and consumer APIs and client libraries available in many languages, including C/C++, Java, Python, and Go. So you would be quite right to wonder why you don’t just write your own code to go and get data from a system and write it to Kafka—doesn’t it make sense to write a quick bit of consumer code to read from a topic and push it to a target system?

The problem is that if you are going to do this properly, then you will realize that you need to cater for failures, for restarts, for logging, for scaling out and back down again elastically, and for running across multiple nodes. That’s before we’ve thought about serialization and data formats. Once you’ve done all of these things, you’ve written something that is probably rather like Kafka Connect, but without the many years of development, testing, production validation, and community. Even if you have built a better mousetrap, is all the time that you’ve spent writing that code resulting in something that significantly differentiates your business from anyone else doing similar integration?

Streaming integration with Kafka is a solved problem. There are perhaps a few edge cases where a bespoke solution is appropriate, but by and large, you’ll find that Kafka Connect should be your first port of call for integration with Kafka.

https://docs.confluent.io/platform/current/quickstart/ce-docker-quickstart.html

### manually install plugin

https://docs.confluent.io/home/connect/self-managed/install.html#install-connector-manually