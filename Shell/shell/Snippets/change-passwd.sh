#!/usr/bin/env bash

##
# 自动更改网站的密码
# 主要用到了curl的存储cookie(-c)与读取cookie(-b)
##

txt='./oldpwd.lst'
oldpwd=`cat $txt`
newpwd=`date | md5sum | head -c6`
curl 'http://boss.com/api/v1/account/login/' \
	-H 'Origin: http://boss.com'\
	-H 'Accept-Encoding: gzip, deflate'\
	-H 'Content-Type: application/json;charset=UTF-8'\
	-H 'Accept: application/json, text/plain, */*'\
	-H 'Referer: http://boss.com/login.html'\
	--data-binary "{\"username\":\"\",\"password\":\"$oldpwd\"}"\
	-c ./login_cookie\
	-o /dev/null \
	--compressed
curl 'http://boss.com/api/v1/cmdb/account/change_pwd/' \
	 -H 'Origin: http://boss.com' \
	 -H 'Accept-Encoding: gzip, deflate' \
	 -H 'Content-Type: application/json;charset=UTF-8'\
	 -H 'Accept: application/json, text/plain, */*' \
	 -H 'Referer: http://boss.com/' \
	--data-binary "{\"old_pwd\":\"$oldpwd\",\"new_pwd\":\"$newpwd\",\"cfm_pwd\":\"$newpwd\"}" \
	-b ./login_cookie \
	-o /dev/null \
	--compressed
echo $newpwd > $txt
