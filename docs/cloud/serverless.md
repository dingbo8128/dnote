---
title: Serverless
date: 2021-07-29 11:54:22

categories: cloud
---

{% blockquote %}
{% endblockquote %}

## 关于 Serverless 的解读

1. Serverless 允许我们在更高的层次管理自己的应用：服务
   Beare metal ---- Virtual Machines ---- Containers ---- Functions
2. Serverless = FaaS + Baas

## FaaS

Function as a Service FaaS
函数即服务 FaaS，作为一种新的计算能力提供方式，让用户抛弃了对服务器的配置和管理，仅需编写和上传核心业务代码，交由平台完成部署、调度、流量分发、弹性伸缩等能力。FaaS 的出现，会从底层开始变革计算资源的形态，提供了一种新的方式来提供计算资源，同时也会给软件架构与应用服务部署带来新的设计思路，进一步降低云计算的使用门槛，推动全行业在服务架构上的创新步伐。

## BaaS

Backend as a Service BaaS
后端即服务 BaaS，其实大家已经使用很久了，这里的后端，指的就是各种云产品和云服务，例如对象存储 COS，消息队列 CMQ，云数据库 CDB、TDSQL，云缓存 CRedis、CMemcached，甚至到各种以 API 形式提供的服务如万象优图 CI，视频处理 VC。这些产品或服务，用户直接开通即可使用，无需考虑部署、扩容、备份、优化、安全等各种运维工作，做到了开箱即用，无需自己去进行服务器或应用的维护和管理，因此同样也是 Serverless 的一部分。

## 怎么用 Serverless

1. 事件触发：SCF 的工作模式为事件触发，因此要考虑好触发方式。例如，利用 SCF 来处理图片生成缩略图，就可以利用 COS 事件，在图片文件上传 COS 后，上传事件就能自动触发函数执行，来生成新的缩略图并再次存入 COS 中。
2. 无状态服务：函数需要是无状态(stateless)的，缓存、日志、数据库等全部通过 CRedis、COS、CDB 这类云产品来支持，这样才能保证在业务请求突增时服务能迅速扩展。
3. 微服务：事件驱动（event-driven）和无状态（stateless）属性正是微服务架构所需要的。因此，在一开始就将自身的应用设计为微服务架构，解耦各模块间关联，使得应用成为可生长可进化的系统。

## 参考

https://cloud.tencent.com/developer/article/1450023
https://cloud.tencent.com/developer/article/1005537
