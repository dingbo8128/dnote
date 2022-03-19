---
title: HTTP状态码
date: 2021-10-05 14:39:36

categories: web
---

| 代码 | 说明                                                                                                                                                                                                                                                                                                                                                                   |
| ---- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1xx  | （临时响应）：表示临时响应并需要请求者继续执行操作的状态代码。                                                                                                                                                                                                                                                                                                         |
| 100  | （继续） 请求者应当继续提出请求。服务器返回此代码表示已收到请求的第一部分，正在等待其余部分。                                                                                                                                                                                                                                                                          |
| 101  | （切换协议） 请求者已要求服务器切换协议，服务器已确认并准备切换。                                                                                                                                                                                                                                                                                                      |
| 2xx  | （成功）：表示成功处理了请求的状态代码。注：200 代表请求成，但是这并不意味着，返回的数据也是正确的                                                                                                                                                                                                                                                                     |
| 200  | （成功） 服务器已成功处理了请求。                                                                                                                                                                                                                                                                                                                                      |
| 201  | （已创建） 请求成功并且服务器创建了新的资源。                                                                                                                                                                                                                                                                                                                          |
| 202  | （已接受） 服务器已接受请求，但尚未处理。                                                                                                                                                                                                                                                                                                                              |
| 203  | （非授权信息） 服务器已成功处理了请求，但返回的信息可能来自另一来源。                                                                                                                                                                                                                                                                                                  |
| 204  | （无内容） 服务器成功处理了请求，但没有返回任何内容。                                                                                                                                                                                                                                                                                                                  |
| 205  | （重置内容） 服务器成功处理了请求，但没有返回任何内容。                                                                                                                                                                                                                                                                                                                |
| 206  | （部分内容） 服务器成功处理了部分 GET 请求。                                                                                                                                                                                                                                                                                                                           |
| 3xx  | （重定向）：接口重定向                                                                                                                                                                                                                                                                                                                                                 |
| 300  | （多种选择） 针对请求，服务器可执行多种操作。服务器可根据请求者 (user agent) 选择一项操作，或提供操作列表供请求者选择。                                                                                                                                                                                                                                                |
| 301  | （永久移动） 请求的网页已永久移动到新位置。服务器返回此响应（对 GET 或 HEAD 请求的响应）时，会自动将请求者转到新位置。                                                                                                                                                                                                                                                 |
| 302  | （临时移动） 意味着接口将重定向到另一个 URL 中去                                                                                                                                                                                                                                                                                                                       |
| 303  | （查看其他位置） 请求者应当对不同的位置使用单独的 GET 请求来检索响应时，服务器返回此代码。                                                                                                                                                                                                                                                                             |
| 304  | （未修改） 自从上次请求后，请求的网页未修改过。服务器返回此响应时，不会返回网页内容。                                                                                                                                                                                                                                                                                  |
| 305  | （使用代理） 请求者只能使用代理访问请求的网页。如果服务器返回此响应，还表示请求者应使用代理。                                                                                                                                                                                                                                                                          |
| 307  | （临时重定向） 服务器目前从不同位置的网页响应请求，但请求者应继续使用原有位置来进行以后的请求。                                                                                                                                                                                                                                                                        |
| 4xx  | （请求错误）：这些状态代码表示请求可能出错，妨碍了服务器的处理。                                                                                                                                                                                                                                                                                                       |
| 400  | （错误请求）Bad Request 请求包含语法错误（1）输入的参数多了或者少了（2）输入的参数错误（3）有时候服务器请求超时也会造成 400 错误                                                                                                                                                                                                                                       |
| 401  | （未授权）401 Unauthorized 当前请求需要用户验证                                                                                                                                                                                                                                                                                                                        |
| 403  | （禁止） Forbidden 服务器已理解请求，但拒绝执行它 原因：出现这类情况一般是访问这个接口需要一定的权限，但是访问者没有相应的访问权限                                                                                                                                                                                                                                     |
| 404  | （未找到） 服务器找不到请求的网页。                                                                                                                                                                                                                                                                                                                                    |
| 405  | （方法禁用）请求行中指定的方法不能用于请求相应的资源。                                                                                                                                                                                                                                                                                                                 |
| 406  | （不接受） 无法使用请求的内容特性响应请求的网页。                                                                                                                                                                                                                                                                                                                      |
| 407  | （需要代理授权） 此状态代码与 401（未授权）类似，但指定请求者应当授权使用代理。                                                                                                                                                                                                                                                                                        |
| 408  | （请求超时） 服务器等候请求时发生超时。                                                                                                                                                                                                                                                                                                                                |
| 409  | （冲突） 服务器在完成请求时发生冲突。服务器必须在响应中包含有关冲突的信息。                                                                                                                                                                                                                                                                                            |
| 410  | （已删除） 如果请求的资源已永久删除，服务器就会返回此响应。                                                                                                                                                                                                                                                                                                            |
| 411  | （需要有效长度） 服务器不接受不含有效内容长度标头字段的请求。                                                                                                                                                                                                                                                                                                          |
| 412  | （未满足前提条件） 服务器未满足请求者在请求中设置的其中一个前提条件。                                                                                                                                                                                                                                                                                                  |
| 413  | （请求实体过大） 服务器无法处理请求，因为请求实体过大，超出服务器的处理能力。                                                                                                                                                                                                                                                                                          |
| 414  | （请求的 URI 过长） 请求的 URI（通常为网址）过长，服务器无法处理。                                                                                                                                                                                                                                                                                                     |
| 415  | （不支持的媒体类型） Unsupported Media Type 对于当前请求的方法和所请求的资源，请求中提交的实体并不是服务器中所支持的格式，因此请求被拒绝.解决方法：a.查看是否加了请求头部，一般来说必须要加的 header 是 Content-Type：application/json;charset=utf-8； b.在上传文件的时候要特别注意，请求的头部 Content-Type 不是 application/json 格式，是 multipart/form-data 格式。 |
| 416  | （请求范围不符合要求） 如果页面无法提供请求的范围，则服务器会返回此状态代码。                                                                                                                                                                                                                                                                                          |
| 417  | （未满足期望值） 服务器未满足"期望"请求标头字段的要求。                                                                                                                                                                                                                                                                                                                |
| 5xx  | （服务器错误）这些状态代码表示服务器在尝试处理请求时发生内部错误。这些错误可能是服务器本身的错误，而不是请求出错。                                                                                                                                                                                                                                                     |
| 500  | （服务器内部错误） 服务器遇到错误，无法完成请求。                                                                                                                                                                                                                                                                                                                      |
| 501  | （尚未实施） 服务器不具备完成请求的功能。例如，服务器无法识别请求方法时可能会返回此代码。                                                                                                                                                                                                                                                                              |
| 502  | （错误网关） 服务器作为网关或代理，从上游服务器收到无效响应。Bad Gateway 作为网关或者代理工作的服务器尝试执行请求时，从上游服务器接收到无效的响应                                                                                                                                                                                                                      |
| 503  | （服务不可用） Service Unavailable 由于临时的服务器维护或者过载，服务器当前无法处理请求。                                                                                                                                                                                                                                                                              |
| 504  | Gateway Timeout 作为网关或者代理工作的服务器尝试执行请求时，未能及时从上游服务器（URI 标识出的服务器，例如 HTTP、FTP、LDAP）或者辅助服务器（例如 DNS）收到响应。                                                                                                                                                                                                       |
| 505  | （HTTP 版本不受支持） 服务器不支持请求中所用的 HTTP 协议版本                                                                                                                                                                                                                                                                                                           |