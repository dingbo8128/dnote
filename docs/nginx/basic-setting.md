---
title: Nginx基本配置
date: 2021-07-27 10:16:03

categories:
---

{% blockquote %}
For when I am weak, then I am strong.
{% endblockquote %}

## 常用命令

- 测试配置文件：`nginx -t`
- 重启服务: `nginx -s reload`

## 基本配置

```
server {
	listen 80 default_server;
	listen [::]:80 default_server;
	root /srv/www/html;

	index index.html;

	server_name _;

	location / {
		try_files $uri $uri/ =404;
	}

	location / {
		proxy_pass http://localhost:8080;
	}
}
```

## 支持 websockt

```
    location / {
    proxy_pass http://localhost:4567;
    proxy_http_version                      1.1;
    proxy_cache_bypass                      $http_upgrade;

    proxy_set_header Upgrade                $http_upgrade;
    proxy_set_header Connection             "upgrade";
    proxy_set_header Host                   $host;
    proxy_set_header X-Real-IP              $remote_addr;
    proxy_set_header X-Forwarded-For        $remote_addr;
    proxy_set_header X-Forwarded-Proto      $scheme;
    proxy_set_header X-Forwarded-Host       $host;
    proxy_set_header X-Forwarded-Port       $server_port;
    proxy_read_timeout 120s;
}
```

## 支持 HTTPS

首先上传 pem 文件和 key 文件到服务器某个目录，然后配置需要开启 https 的服务

```
server {
	listen 443 ssl http2;
	listen [::]:443 ssl http2;

	server_name demo.com;
	root /srv/demo/public;

        ssl_certificate /aa.bb.pem;
        ssl_certificate_key /aa/bb.key;

        location / {
               proxy_pass http://localhost:8080;
       }
}


# HTTP redirect
server {
	listen 80;
	listen [::]:80;

	server_name chat.wozai.fun;

	return 301 https://chat.wozai.fun$request_uri;
}
```

## Redirect

### Redirect domains

```txt
server {
     listen 80;
     server_name www.example.com
}
server {
     listen 80;
     server_name example.com
     return 301 http://www.example.com
}
```

```txt
server {
     listen 80;
     server_name www.myblog.com
}
server {
     listen 80;
     server_name www.example.com
}
server {
     listen 80;
     server_name _;
     return 301 http://www.example.com
}
```

### Redirect Exact URI

```txt
location = /post/learning-nginx-redirects {
     return 301 http://example.com/articles/nginx/how-to-do-redirects/
}
```

### Matching URI Path

```txt
location /post {
     return 301 http://example.com/articles
}
```

### Matching URI Patterns

```txt
location ~ ^/post/(.*) {
     rewrite ^ http://newexample.com/articles/$1;
}
```
