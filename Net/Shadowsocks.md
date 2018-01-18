### Debian7&8 安装(**not 9**)
> https://github.com/shadowsocks/shadowsocks/wiki/%E5%9C%A8-Linode-%E4%B8%8A%E5%BF%AB%E9%80%9F%E6%90%AD%E5%BB%BA-Shadowsocks

```bash
curl 'https://raw.githubusercontent.com/shadowsocks/stackscript/master/stackscript.sh?v=4' > /tmp/ss.sh && bash /tmp/ss.sh && rm /tmp/ss.sh
supervisorctl status     
supervisorctl tail shadowsocks stderr  # show ss log
less /etc/shadowsocks.json 
```


### raw bash script
### https://raw.githubusercontent.com/shadowsocks/stackscript/master/stackscript.sh?v=4
```bash
#!/bin/bash

apt-get update
apt-get install -y -qq python-pip python-m2crypto supervisor
pip install shadowsocks

PORTS_USED=`netstat -antl |grep LISTEN | awk '{ print $4 }' | cut -d: -f2|sed '/^$/d'|sort`
PORTS_USED=`echo $PORTS_USED|sed 's/\s/$\|^/g'`
PORTS_USED="^${PORTS_USED}$"

SS_PASSWORD=`dd if=/dev/urandom bs=32 count=1 | md5sum | cut -c-32`
SS_PORT=`seq 1025 9000 | grep -v -E "$PORTS_USED" | shuf -n 1`

wget https://raw.githubusercontent.com/shadowsocks/stackscript/master/shadowsocks.json -O /etc/shadowsocks.json
wget https://raw.githubusercontent.com/shadowsocks/stackscript/master/shadowsocks.conf -O /etc/supervisor/conf.d/shadowsocks.conf
wget https://raw.githubusercontent.com/shadowsocks/stackscript/master/local.conf -O /etc/sysctl.d/local.conf

sed -i -e s/SS_PASSWORD/$SS_PASSWORD/ /etc/shadowsocks.json
sed -i -e s/SS_PORT/$SS_PORT/ /etc/shadowsocks.json

sysctl --system

service supervisor stop
echo 'ulimit -n 51200' >> /etc/default/supervisor
service supervisor start

supervisorctl reload
```
