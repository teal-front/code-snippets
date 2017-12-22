#### DNS Prefetch

> https://cythilya.github.io/2016/06/25/dns-prefetching/

> http://www.jianshu.com/p/c3a14a853c79

`<meta http-equiv="x-dns-prefetch-control" content="on">`
> **上面这个就是在https下开启A标签的DNS Prefetching** 所有的a标签的href都会自动去启用DNS Prefetching，也就是说，你网页的a标签href带的域名，是不需要在head里面加上link手动设置的。a标签的默认启动在HTTPS不起作用。
**不过在淘宝上没看到使用**

`<link rel='dns-prefetch' href="//a.img.com"`

##### check effect
1. `about:histograms/DNS.PrefetchQueue`
2. `chrome://net-internals/#dns`
3. `chrome:dns`
4. `chrome://histograms/DNS`
