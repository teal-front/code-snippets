## 好处

在进行 HTTP/2 网站性能优化时很重要一点是「使用尽可能少的连接数」，本文提到的头部压缩是其中一个很重要的原因：同一个连接上产生的请求和响应越多，动态字典积累得越全，头部压缩效果也就越好。所以，针对 HTTP/2 网站，最佳实践是不要合并资源，不要散列域名。

## Knowledge

- 浏览器要求 h2 Over https，所以得先支持 Https
- h2c: http2 ClearText，没有加密的 h2

## 引用

- https://developers.google.com/web/fundamentals/performance/http2/?hl=zh-cn

* https://imququ.com/post/header-compression-in-http2.html
  谈谈 HTTP/2 的协议协商机制
  https://imququ.com/post/protocol-negotiation-in-http2.html
