1. http://www.zhangxinxu.com/wordpress/2013/05/caching-tutorial-for-web-authors-and-webmasters/#EXPIRES
2. https://developers.google.com/web/fundamentals/performance/optimizing-content-efficiency/http-caching?hl=zh-cn


## Cache
> HTTP1.1 Cache-Control: https://blog.toright.com/posts/3414/%E5%88%9D%E6%8E%A2-http-1-1-cache-%E6%A9%9F%E5%88%B6.html

#### 强缓存、协商缓存
> https://excaliburhan.com/post/things-you-should-know-about-browser-cache.html
1. 强缓存(减少了http请求)，直接从客户端加载，不发送HTTP请求，在Chrome上显示是cache from disk，根据上一次http请求的 response的`Cache-Control`&`expires`来判断,`expires`是http1.0的产物，是一个绝对时间，`Cache-Control`设置更加灵活，可以设置`max-age`，再结合`Date`的时间与本地时间比较
2. 协商缓存(减少了http payload)，`If-none-match/etag`, `If-modified-since/last-modified`，协商成功则返回304。`etag`对于资源更精确，但服务器更耗开销；`last-modified`是基于秒级的，小于1秒的判断不了,各个机器时间可能不一致。
```config
**Request**:
# 强缓存判断 优先级：Cache-Control > expries
Cache-Control: max-age=365000
Expires: Thu, 19 Nov 1981 08:52:00 GMT

Cache-Control: no-store  # 完全不缓存
Cache-Control: no-cache  # 建议不缓存，具体看其它的HTTP头

If-none-match: 'w/iowerwer'
If-modified-since: Mon, 22 May 2017 13:22:32 GMT

Response:
Etag: 'w/iowerwer'
Last-modified: Mon, 22 May 2017 13:22:32 GMT
```


## CDN
站点动静分离，有利于静态资源CDN的设置，有利于cookieless

> http://mp.weixin.qq.com/s/IM6-IimR8McQr_j8SfNG0g


### Alinode
> https://help.aliyun.com/knowledge_detail/40193.html?spm=5176.7840185.2.8.IkCVfF

> https://help.aliyun.com/document_detail/27136.html?spm=5176.7740190.2.2.LUb01K

1. `X-Swift-SaveTime`: 是开始在cdn上缓存的时间，截图是2015-09-22 06:33:49开始在cdn缓存的，由于时间是GMT时间，折算成北京时间加8小时，也就是2015-09-22 14:33:49开始缓存
2. `X-Swift-CacheTime` 是cdn默认缓存时间，以秒为单位，截图86400意思是缓存24小时。
3. `Age` 是在cdn上已经缓存的时间。截图意思是已经在cdn缓存了163s，从2015-09-22 14:33:49开始缓存的，当前时间就是2015-09-22 14:36:32。可以跟自己电脑时间对比一下。