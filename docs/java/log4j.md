---
title: Log4j
date: 2021-12-09 09:50:14

categories: Java
---

## Java8

### Dependency

```xml
<dependency>
    <groupId>org.slf4j</groupId>
    <artifactId>slf4j-api</artifactId>
    <version>1.7.30</version>
</dependency>
<dependency>
    <groupId>org.slf4j</groupId>
    <artifactId>slf4j-log4j12</artifactId>
    <version>1.7.30</version>
</dependency>
```

### Configure

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE log4j:configuration SYSTEM "log4j.dtd">
<log4j:configuration xmlns:log4j="http://jakarta.apache.org/log4j/">
    <!-- async appender -->
    <appender name="async" class="org.apache.log4j.AsyncAppender">
        <param name="locationInfo" value="true" />
        <param name="blocking" value="false" />
        <param name="bufferSize" value="256" />
        <appender-ref ref="stdout" />
    </appender>

    <!-- [控制台STDOUT] -->
    <appender name="stdout" class="org.apache.log4j.ConsoleAppender">
        <param name="encoding" value="UTF-8" />
        <param name="target" value="System.out" />
        <layout class="org.apache.log4j.PatternLayout">
            <param name="ConversionPattern" value="%d (%t) [%24F:%-3L:%-5p]%x %m%n" />
        </layout>
    </appender>
    <logger name="java.sql.Connection" additivity="true">
        <level value="debug" />
    </logger>

    <logger name="java.sql.Statement" additivity="true">
        <level value="debug" />
    </logger>

    <logger name="java.sql.PreparedStatement" additivity="true">
        <level value="debug" />
    </logger>

    <logger name="java.sql.ResultSet" additivity="true">
        <level value="debug" />
    </logger>

    <!-- Root Logger -->
    <root>
        <priority value="all"></priority>
        <appender-ref ref="async" />
    </root>

</log4j:configuration>
```
