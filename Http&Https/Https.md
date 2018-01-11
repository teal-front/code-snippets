> SSL Analyze: https://www.ssllabs.com/ssltest/analyze.html

## 生成证书&安装
1. 在[https://sslforfree.com](https://sslforfree.com)上生成网站的证书(期间会进行域名或主机的验证)，会有三个文件，  `ca_bundle.crt`、`certificate.crt`、`private.key`,**不支持泛域名形式的，\*.example.com，不过可以最多添加100个具体的子域名**
2. 合并crt文件，`cat certificate.crt ca_bundle.crt > servername.pem`；
3. 配置`nginx`
```
server {
    listen 80;
    listen 443 ssl;

    ssl_certificate /path/servername.pem;
    ssl_seritificate_key /path/private.key;
    
    server_name xxx.com;
    if ($scheme = http) {
        rewrite ^(.*)$ https://$host$1 permancent;
    }
}
```

## 优化

### nginx
> https://aotu.io/notes/2016/08/16/nginx-https/index.html
1. 激活 keepalive 长连接，一个连接发送更多个请求
2. 复用 SSL 会话参数，在并行并发的连接数中避免进行多次 SSL『握手』
```conf
http {
    #配置共享会话缓存大小
    ssl_session_cache   shared:SSL:10m;
    #配置会话超时时间
    ssl_session_timeout 10m;
    
    server {
        listen              443 ssl;
        server_name         www.example.com;
        #设置长连接
        keepalive_timeout   70;
    }
}
```

### HTST ( HTTP Strict Transport Security，HTTP严格传输安全)
1. `nginx.conf`的`server`里添加规则， max-age为浏览器HTST的生效时间。
2. 然后浏览器就可以307(Internal Redirect)内部跳转了，并不会真的发现http请求。
3. [chrome://net-internals/#hsts](chrome://net-internals/#hsts)
```
# nginx
server {
    add_header Strict-Transport-Security max-age=31536000;
}
```


