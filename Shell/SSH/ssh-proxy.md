## 突破本地网络封锁

1. 在本地的 git-bash 里，vim /etc/ssh/ssh_config， 在最下面添加下面的配置
```bash
Host aliyun 
# -p: port 
# root@somehost： 跳板机
ProxyCommand ssh -q -W %h:%p -p 22 root@somehost
Hostname $yourserverip 
User root
```

2. 设置动态端口转发，在 git-bash 里， ssh -NT -D 1080 $jumpService。 这样就在本地开了 ** socks5 ** 协议的代理，端口号为 1080。

https://wangdoc.com/ssh/port-forwarding.html

3. 可以设置软件的代理为 1080，这样就可以上网上。或者用`proxifier`软件
