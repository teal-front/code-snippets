# Links
> HTTP代理原理及实现 https://imququ.com/post/web-proxy.html

> Demo: https://github.com/qgy18/proxy-demo

# Proxy type
1. 透明代理(TRANSPARENT)
   利用iptables把内部请求到代理端口，用户无感知

## Linux
1. squid
   可缓存，可作透明代理，支持内容篡改
> http://www.hawu.me/operation/852

> https://workaround.org/squid-acls/
```bash
# acl: Access Control List
acl localnet src 192.168.1.0/24 

http_access allow accesses_from_adminshttp_access allow accesses_from_admins
acl google dstdomain google.com
http_access deny google

# 内容篡改
url_rewrite_program
request_header_replace
```
2. nginx
   反向代理，负载均衡
   
   `rewrite ^/redirect?url=(.*) $1 redirect`nginx 对?url部分并不能匹配到，所以不会生效的，这样的法是错误的
   
    `rewrite ^/redirect(.*) https://domain.com$1 redirect`这样就可以
3. 



## Windows
1. Fiddler
2. Charles
3. Whitles



## Mac
1. Charles