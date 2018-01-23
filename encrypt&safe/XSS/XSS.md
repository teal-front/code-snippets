## Learning Source
1. https://github.com/cure53/XSSChallengeWiki/wiki/prompt.ml#hidden-level--1


## Methods
> xss相关的一些HTTP头部：https://imququ.com/post/web-security-and-response-header.html

0. 富文本XSS过滤时，添加白名单
1. Cookie set HTTPOnly & Secure (https://www.owasp.org/index.php/HttpOnly)
2. Data uri的xss，但是下面这个怎么不行
https://domain.com?returnUrl=data:text/html;base64,PHNjcmlwdD5hbGVydCgxKTwvc2NyaXB0Pg==
3. **CSP**: Content Security Policy,  https://github.com/joeyguo/blog/issues/5
4. **referer: origin** ,浏览器发送`referer`的策略， https://imququ.com/post/referrer-policy.html
```
# 1. no-referrer: 任何情况下都不发送 Referrer 信息；
# 2. no-referrer-when-downgrade: 仅当发生协议降级（如 HTTPS 页面引入 HTTP 资源，从 HTTPS 页面跳到 HTTP 等）时不发送 Referrer 信息。这个规则是现在大部分浏览器默认所采用的；
# 3. origin: 发送只包含 host 部分的 Referrer。启用这个规则，无论是否发生协议降级，无论是本站链接还是站外链接，都会发送 Referrer 信息，但是只包含协议 + host 部分（不包含具体的路径及参数等信息）；
# 4. origin-when-crossorigin: 仅在发生跨域访问时发送只包含 host 的 Referrer，同域下还是完整的。它与 Origin Only 的区别是多判断了是否 Cross-origin。需要注意的是协议、域名和端口都一致，才会被浏览器认为是同域；
# 5. unsafe-url: 无论是否发生协议降级，无论是本站链接还是站外链接，统统都发送 Referrer 信息。正如其名，这是最宽松而最不安全的策略；

Content-Security-Policy: referrer origin;

referrer-policy: origin-when-cross-origin
```
6. X-Frame-Options: SAMEORIGIN, 如果某页面被不被允许的页面以<iframe>或<frame>的形式嵌入，IE会显示类似于“此内容无法在框架中显示”的提示信息，Chrome和Firefox都会在控制台打印信息。由于嵌入的页面不会加载，这就减少了点击劫持的发生。
7. X-XSS-Protection: 1; mode=block, 启用XSS保护，并在检查到XSS攻击时，停止渲染页面（例如IE8中，检查到攻击时，整个页面会被一个#替换）；
8. x-content-type-options: nosniff,互联网上的资源有各种类型，通常浏览器会根据响应头的Content-Type字段来分辨它们的类型。例如："text/html"代表html文档，"image/png"是PNG图片，"text/css"是CSS样式文档。然而，有些资源的Content-Type是错的或者未定义。这时，某些浏览器会启用MIME-sniffing来猜测该资源的类型，解析内容并执行。
例如，我们即使给一个html文档指定Content-Type为"text/plain"，在IE8-中这个文档依然会被当做html来解析。利用浏览器的这个特性，攻击者甚至可以让原本应该解析为图片的请求被解析为JavaScript

### Payload
#### 绕过http-only的几种方法
1. Web服务器漏洞
http://wooyun.chamd5.org/bug_detail.php?wybug_id=wooyun-2012-07085，Apache<2.2.22  (CVE-2012-0053)，HTTP400会返回http-only cookie
2. Flash编程安全
http://wooyun.chamd5.org/bug_detail.php?wybug_id=wooyun-2012-07085
3. 
