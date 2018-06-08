1.  http://www.zhangxinxu.com/wordpress/2013/05/caching-tutorial-for-web-authors-and-webmasters/#EXPIRES
2.  https://developers.google.com/web/fundamentals/performance/optimizing-content-efficiency/http-caching?hl=zh-cn

## Versions

1.  HTTP1.0 与 HTTP1.1 较大的区别是，HTTP1.1 添加了`Cache-Control、Expries、Etag`，丰富了缓存的方式

## Cache

> HTTP1.1 Cache-Control: https://blog.toright.com/posts/3414/%E5%88%9D%E6%8E%A2-http-1-1-cache-%E6%A9%9F%E5%88%B6.html

#### 强缓存、协商缓存

> https://excaliburhan.com/post/things-you-should-know-about-browser-cache.html

1.  强缓存(减少了 http 请求)，直接从客户端加载，不发送 HTTP 请求，在 Chrome 上显示是 cache from disk，根据上一次 http 请求的 response 的`Cache-Control`&`expires`来判断,`expires`是 http1.0 的产物，是一个绝对时间，`Cache-Control`设置更加灵活，可以设置`max-age`(相对上一次访问的时间放 Date 头部，与本地时间相比较)
2.  协商缓存(减少了 http payload)，`If-none-match/etag`, `If-modified-since/last-modified`，协商成功则返回 304。`etag`对于资源更精确，但服务器更耗开销；`last-modified`是基于秒级的，小于 1 秒的判断不了,各个机器时间可能不一致。

```config
**Request**:
# 强缓存判断 优先级：Cache-Control > expries
Cache-Control: private    # 不允许CDN缓存
Cache-Control: max-age=365000 (以秒为单位)
Expires: Thu, 19 Nov 1981 08:52:00 GMT

Cache-Control: no-store  # 完全不缓存
Cache-Control: no-cache  # 建议不缓存，具体看其它的HTTP头

If-none-match: 'w/iowerwer'
If-modified-since: Mon, 22 May 2017 13:22:32 GMT

Response:
Etag: 'w/iowerwer'
Last-modified: Mon, 22 May 2017 13:22:32 GMT
```

### tips

#### 清除页面缓存

1.  JS 发送页面的异步请求，设置页面的请求头`Cache-Control: no-store`，如果是`zepto`可以设置`cache: false`

## CDN

站点动静分离，有利于静态资源 CDN 的设置，有利于 cookieless

> http://mp.weixin.qq.com/s/IM6-IimR8McQr_j8SfNG0g

### Alinode

> https://help.aliyun.com/knowledge_detail/40193.html?spm=5176.7840185.2.8.IkCVfF

> https://help.aliyun.com/document_detail/27136.html?spm=5176.7740190.2.2.LUb01K

1.  `X-Swift-SaveTime`: 是开始在 cdn 上缓存的时间，截图是 2015-09-22 06:33:49 开始在 cdn 缓存的，由于时间是 GMT 时间，折算成北京时间加 8 小时，也就是 2015-09-22 14:33:49 开始缓存
2.  `X-Swift-CacheTime` 是 cdn 默认缓存时间，以秒为单位，截图 86400 意思是缓存 24 小时。
3.  `Age` 是在 cdn 上已经缓存的时间。截图意思是已经在 cdn 缓存了 163s，从 2015-09-22 14:33:49 开始缓存的，当前时间就是 2015-09-22 14:36:32。可以跟自己电脑时间对比一下。
