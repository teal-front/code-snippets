## 下载相关：
强烈用户下载，filename为下载的名字，可与URL中的文件名不同，
Content-Disposition: attachment; filename="行政接口.jpg"

HTML5 download属性：
在Chrome下，跨域时，不支持指定下载名，只支持触发下载


## 跨域
Access-Control-Allow-Origin
HTTP Response:
如果不返回这个header信息，则浏览器不接收返回值，服务器实际可能返回成功
Access-Control-Allow-Origin: http://task.oa.app.com  (要带协议，不支持*)

HTTP Request:
Origin: http://task.oa.app.com  （跨域请求时，由浏览器发出）


## Preflight request(检查跨域Ajax中服务器是否支持这个请求):
http://www.html5rocks.com/en/tutorials/cors/?redirect_from_locale=zh
CORS XMLHttpRequest时，如果有自定义的头部，或非GET、POST、HEAD方法，则浏览器会先发送OPTIONS请求，
如果返回头中有Access-Control-Allow-Method: xx Access-Control-Allow-Headers: x-cumsor-header，
则浏览器会发送正常原本的请求。

## 压缩
1. `Response`:
`Content-Encoding: gzip` (服务端或nginx开户了gzip压缩，`nginx`默认不开启，默认对`Content-Type:text/html`有效，体积减少明显)

`Request`:
`Accept-Encoding:gzip, deflate, sdch`
2. `Cache-Control: no-transform`，使服务器和代理服务器不能修改`Content-Encoding`、`Content-Range`, `Content-Type`的内容，重点是`Content-Encoding`，也就是没压缩的内容不能去压缩。
3. 





