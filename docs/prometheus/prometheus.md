---
title: Prometheus
date: 2021-12-07 14:54:13

categories: Prometheus
---

## What's Prometheus?

You will not really understand it until try it.

![](https://upload-images.jianshu.io/upload_images/4052244-8e0cea93cdbb44c1.png?imageMogr2/auto-orient/strip|imageView2/2/w/1200/format/webp)

## Download and Unzip

https://prometheus.io/download/
[prometheus-2.31.1.windows-amd64.zip](https://objects.githubusercontent.com/github-production-release-asset-2e65be/6838921/73ba8619-d533-47cc-9869-1c654ac8ea78?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAIWNJYAX4CSVEH53A%2F20211207%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20211207T071000Z&X-Amz-Expires=300&X-Amz-Signature=b75a04a77589cf711fb3ca0417d2a621be8a67f40051ccf4c940364bfbb4be25&X-Amz-SignedHeaders=host&actor_id=0&key_id=0&repo_id=6838921&response-content-disposition=attachment%3B%20filename%3Dprometheus-2.31.1.windows-amd64.zip&response-content-type=application%2Foctet-stream)

## Edit Configiration File

```yml prometheus.yml
global:
  scrape_interval: 15s # By default, scrape targets every 15 seconds.

  # Attach these labels to any time series or alerts when communicating with
  # external systems (federation, remote storage, Alertmanager).
  external_labels:
    monitor: "codelab-monitor"

# A scrape configuration containing exactly one endpoint to scrape:
# Here it's Prometheus itself.
scrape_configs:
  # The job name is added as a label `job=<job_name>` to any timeseries scraped from this config.
  - job_name: "prometheus"

    # Override the global default and scrape targets from this job every 5 seconds.
    scrape_interval: 5s

    static_configs:
      - targets: ["localhost:9090"]
```

## Start

```ps
PS C:\Users\bo\Downloads\prometheus-2.31.1.windows-amd64> .\prometheus.exe --config.file=prometheus.yml
```

## Vistit Web UI

http://localhost:9090

Enter the below into the expression console and then click "Execute":

```txt
prometheus_target_interval_length_seconds
```

This should return a number of different time series.

Visit http://localhost:9090/metrics, will see metrics produced by prometheus itself.

## What's a "target" ?

A targe is an end point that prometheus server can connected to, to scrape metrics.

## Remote storage integrations

Prometheus's local storage is limited to a single node's scalability and durability. Instead of trying to solve clustered storage in Prometheus itself, Prometheus offers a set of interfaces that allow integrating with remote storage systems.

```yml
# Settings related to the remote write feature.
remote_write: [- <remote_write> ...]

# Settings related to the remote read feature.
remote_read: [- <remote_read> ...]
```

## exporters

https://prometheus.io/docs/instrumenting/exporters/

## What's Prometheus?

Prometheus is a systems monitoring and alerting toolkit.
