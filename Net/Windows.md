### Route & Net
> https://www.howtogeek.com/howto/windows/adding-a-tcpip-route-to-the-windows-routing-table/
```bash
route print   # print all  route config 

route [-p] add 192.168.10.0 mask 255.255.255.0 192.168.1.1 # 添加静态路由，在VPN连接里很实用
route delete 192.168.10.0

```

## netsh(port forwarding&...)
> https://snippetinfo.net/media/913

> http://www.james-tw.com/windows/windows-netsh-zhi-ling-cao-zuo

```bash
# add port proxy (可用于家里电脑代理公司的Web Proxy，然后就可以在家里用手机访问公司 的各个环境了)
netsh interface portproxy add v4tov4 listenport=8888 listenaddress=192.168.1.10 connectport=80 connectaddress=192.168.1.1
# delete port proxy
netsh interface portproxy delete v4tov4 listenport=8080 listenaddress=192.168.1.1
```
