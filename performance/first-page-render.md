### 减少渲染DOM树
1. 非关键HTML区域，用`textarea`包裹，里面的`&`、`</textarea`要转义。也可以用js字符串、meta、注释等方法达成

### 减少脚本阻塞
1. 首次访问，行内脚本，然后预加载作缓存，同时写入cookie标记，下次则可缓存加载


### 对网速快的优化
不是网速越快，页面渲染就越快？当网速太快时，浏览器会进入贪婪渲染，首屏时间不⼀一定快  chunked优化