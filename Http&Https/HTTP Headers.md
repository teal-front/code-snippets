## 下载相关：

强烈用户下载，filename 为下载的名字，可与 URL 中的文件名不同，
Content-Disposition: attachment; filename="行政接口.jpg"

HTML5 download 属性：在 Chrome 下，跨域时，不支持指定下载名，只支持触发下载

## 跨域

Access-Control-Allow-Origin
HTTP Response:
如果不返回这个 header 信息，则浏览器不接收返回值，服务器实际可能返回成功
Access-Control-Allow-Origin: http://task.oa.app.com (要带协议，不支持\*)

HTTP Request:
Origin: http://task.oa.app.com （跨域请求时，由浏览器发出）

## Preflight request(检查跨域 Ajax 中服务器是否支持这个请求):

http://www.html5rocks.com/en/tutorials/cors/?redirect_from_locale=zh
CORS XMLHttpRequest 时，如果有自定义的头部，或非 GET、POST、HEAD 方法，则浏览器会先发送 OPTIONS 请求，如果返回头中有 Access-Control-Allow-Method: xx Access-Control-Allow-Headers: x-cumsor-header，则浏览器会发送正常原本的请求。可以把自定义的头部不放在 header，比如放在 url query 参数里，避免 OPTIONS 请求的发送。次则可以 OPTIONS 的返回头里添加 Access-Control-Max-Age: 86400。浏览器会缓存 OPTIONS 请求结果，有效期内针对同一 url 地址不再发送

## 压缩

1.  `Response`:
    `Content-Encoding: gzip` (服务端或 nginx 开户了 gzip 压缩，`nginx`默认不开启，默认对`Content-Type:text/html`有效，体积减少明显)

`Request`:
`Accept-Encoding:gzip, deflate, sdch`

2.  `Cache-Control: no-transform`，使服务器和代理服务器不能修改`Content-Encoding`、`Content-Range`, `Content-Type`的内容，重点是`Content-Encoding`，也就是没压缩的内容不能去压缩。

## Authorized(401)

request:
xx: {base64Encode(username:passwd)}
`Authorization: Basic xx`
reponse:
`WWW-Authenticate: Basic realm="xxx"`

> htpasswd: http://www.htaccesstools.com/articles/htpasswd/

htpasswd: Htpasswd files are used when password protecting a website or a directory using HTTP Authentication and Apache’s htaccess files.

以 username : hash 后的密码 格式

```conf
andreas:$apr1$dHjB0/..$mkTTbqwpK/0h/rz4ZeN8M0
john:$apr1$IHaD0/..$N9ne/Bqnh8.MyOtvKU56j1
```

koa or express package: http-auth
