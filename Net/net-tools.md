## wireshark
### 调试远程的方法
> https://ask.wireshark.org/questions/23609/remote-capture-via-ssh-and-pipe
> http://www.vuln.cn/2267
1. 打开remote server
2. 另有文章有可以在本地建named pipe，然后配置wireshark，但windows系统上还没有找到mkfifo的方法
3. plink.exe为putty的cli版本，也可以使用turisoorze的`turizseoplink.exe`替代
4. `plink.exe -ssh -pw abc123 root@192.168.2.1 "tcpdump -ni eth0 -s 0 -w - not port 22" | "D:\Program Files\Wireshark\Wireshark.exe" -k -i -`

### tcpdump
```bash
sudo /usr/sbin/tcpdump -s 0 -U -n -w - -i eth0 not port 22
```
###### 参数说明：
1. “-s 0” snarf entire packets, no length limit
2. “-U” packet-buffered output - write each complete packet to output once it’s captured, rather than waiting for a buffer to fill up; 
3. “-n” don’t convert addresses to hostnames; 
4. “-w -” write raw packets to STDOUT (which will be passed through the SSH tunnel and become STDOUT of the “ssh” command on the destination machine);
5. “-i eth0” capture on interface eth0; 
6. “not port 22” a tcpdump filter expression to prevent capturing our own SSH packets (more on this below)

### ssh
##### 端口转发
> https://www.ibm.com/developerworks/cn/linux/l-cn-sshforward/
1. 本地转发：`ssh -L <local port>:<remote host>:<remote port> <SSH hostname>`
2. 远程转发：`ssh -R <local port>:<remote host>:<remote port> <SSH hostname>`
3. 动态转发：`ssh -D <local port> <SSH Server>`
```
# https://www.ibm.com/developerworks/cn/linux/l-cn-sshforward/
# http://www.ruanyifeng.com/blog/2011/12/ssh_port_forwarding.html
# 本地转发
# -N： 不打开远程shell (得放在—L的前面)
# -T: 不分配TTY
# -g: open gateway, let net access port
# ssh -L <local port>:<remote host>:<remote port> <SSH hostname>
ssh -NT -L 2101:localhost:538 user@host3 # remote host 相对于ssh_hostname
# 远程转发
# ssh -R <local port>:<remote host>:<remote port> <SSH hostname>
ssh -R 2101:localhost:538 user@host1
# 动态转发
# ssh -D <local port> <SSH Server>
ssh -D 2101 user@host 
# XManage or (XMing + Putty)
# XMing: https://aruljohn.com/info/x11forwarding/
ssh -X   # X11协议转发，X11即Linux上的图形显示协议。在PC上安装X Display Server，即可显示远程桌面
```

## nmap
> https://highon.coffee/blog/nmap-cheat-sheet/
```bash
nmap -Pn 127.0.0.1  # look for port of foo
```

## nc (netcat)
> https://ss64.com/bash/nc.html
```bash
nc -l $port # listen port on $port
nc $host $port # create tcp client, 发送TCP请求
nc -z 127.0.0.1 0-100       # port scan from 0 to 100
nc -lv -p 7777 -e '/bin/sh'   # 监听7777端口，接收信息用/bin/sh执行
```

## iptables 路由表
> http://www.jianshu.com/p/9200a5dd4491
> https://www.cyberciti.biz/faq/linux-iptables-drop/
```bash
/etc/sysconfig/iptables   # 配置文件

# INPUT/POSTROUTING/DROP 都得是大写的
iptables -t nat -A POSTROUTING -s 172.16.0.0/24 -j MASQUERADE  # 内网转发到外网
iptables -I INPUT -s 192.168.10.41 -j DROP -i eth0 # 屏蔽192.168.10.41的package, -I: insert
iptables -A         # -A: append
iptables -L INPUT -n --line-numbers  # list
iptables -D INPUT 1                # delete first rule

yum -y install iptables-service
service iptalbes save
service iptables restart   # 保存之后还得重启才生效吧
/etc/init.d/iptables save

/etc/sysctl.conf # 支持ipv4包转发net.ipv4.ip_forward = 1
sysctl -p        #使上面设置的规则生效
route
```

## tun/tap
> 1. https://blog.kghost.info/2013/03/27/linux-network-tun/
> 2. 虚拟网卡：tun为点对点设备、tap为以太网设备，都是Kernal内核提供驱动，/dev/net/tun（字符文件）作为数据中转
> 3. tun为IP层包装，故只能点对点;tap为MAC层包装，可以与物理网卡作桥接
```bash
ifconfig #查看是否有tun/tap网卡
lsmod | grep tun    #查看内核是否有tun驱动
yum install tunctl   # 安装tun工具
```

```bash
ifconfig       # 查看网卡、IP
	ifconfig eth0  # 直接查看eth0
netstat -an    # 查看网络端口、路由表等
host m.app.com # 查看DNS
traceroute m.app.com #查看请求的中间网关
tcpdump -nn -i eth0 # 抓包
```

## DNS
dns config: `/etc/resolv.conf`: `nameserver 114.114.114.144`


## ifconfig
### change ether on mac(before the command, close wireless connect)
ifconfig en0 ether xx:xx:xx:xx