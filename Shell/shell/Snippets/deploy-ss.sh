#!/usr/bin/env bash

apt-get update
apt-get upgrade
# from https://github.com/shadowsocks/shadowsocks/wiki/Setting-Up-Shadowsocks-on-Linode
curl 'https://raw.githubusercontent.com/shadowsocks/stackscript/master/stackscript.sh?v=4' > /tmp/ss.sh && bash /tmp/ss.sh && rm /tmp/ss.sh
# start shadowsocks use supervisord 
supervisorctl
