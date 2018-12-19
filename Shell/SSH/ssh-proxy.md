## 跳板机

## 突破本地网络封锁

1. 在本地的 git-bash 里，vim /etc/ssh/ssh_config， 在最下面添加下面的配置
   Host aliyun # -p 22: 端口是 22 # root@somehost： 可联网的本地机器
   ProxyCommand ssh -q -W %h:%p -p 22 root@somehost # 你的远程机器 IP
   Hostname \$yourserverip # 你的远程机器 user
   User root
2. 在 git-bash 里， ssh -NT -D 1080 aliyun (这里的 aliyun，就对应上面的 Host aliyun)。 这样就在本地开了 socks5 端口，端口号为 1080。

3. 可以设置软件的代理为 1080，这样就可以上网上。或者用`proxifier`软件

## 突破远程局域网

## TODO
