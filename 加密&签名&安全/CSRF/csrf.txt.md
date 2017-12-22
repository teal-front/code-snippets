
### Http Referer
 IE6可能不会发送Referer
 
### Cookie CSRF-token
1. 把csrf-token写入cookie \
2. jquery里的ajax发送前取cookir里的token
3. 把ajax里的token与服务器端比较，还有过期时间的校验与更新
		
> https://www.ibm.com/developerworks/cn/web/1102_niugang_csrf/

> http://drops.wooyun.org/web/15556?hmsr=toutiao.io&utm_medium=toutiao.io&utm_source=toutiao.io

> http://www.robotzindisguise.com/forum/showthread.php?20224-Browser-Privacy-How-to-Disable-HTTP-Referer