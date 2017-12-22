## Conf
> 中文配置：http://tengine.taobao.org/nginx_docs/cn/docs/

> nginx配置：[https://moonbingbing.gitbooks.io/openresty-best-practices/ngx/nginx_brief.html](https://moonbingbing.gitbooks.io/openresty-best-practices/ngx/nginx_brief.html)

#### rewrite return:
> https://moonbingbing.gitbooks.io/openresty-best-practices/ngx/nginx_brief.html
> https://www.nginx.com/blog/creating-nginx-rewrite-rules/
```
server {
    location = / {
        return 302 http://domain.com/$args
    }
}
```

#### 默认的80端口(在配置中设置)
CentOS: `/etc/nginx/conf.d/default.conf`
Debian:`/etc/nginx/sites-enabled/default`

```
server {
	listen 80 default_server;  # default_server相同的端口下，默认的虚拟主机
}
http {
    # close http response nginx version
    # otherwise, http response like this
    # default: Server: nginx/1.6.1
    # use off: Server: nginx
    server_tokens off;
}
```

### tools
1. `curl -I https://m.baidu.com/`，查看http response.
2. Customize Your Nginx Server Name: 得改源文件，然后编译下 [https://www.digitalocean.com/community/tutorials/how-to-customize-your-nginx-server-name-after-compiling-from-source-in-centos](https://www.digitalocean.com/community/tutorials/how-to-customize-your-nginx-server-name-after-compiling-from-source-in-centos)