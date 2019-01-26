> 1.  在线解析 bash: https://explainshell.com/explain

## mac terminal.app 常用命令 (Unix)

1.  mac terminal:https://www.renfei.org/blog/mac-os-x-terminal-101.html
2.  mac: http://www.jianshu.com/p/3291de46f3ff

```bash
# Homebrew: Mac下包安装管理软件
# http://brew.sh/index_zh-cn.html
brew install polipo

# File System
/Volunmes   # 存放硬盘
/Systme/Library/Extensions   # 驱动
/User/teal                   # 用户文件夹
/User/teal/Desktop           # 用户桌面

# Secuit
## get checksum(生成的hash key)
shasum -a 256 /path/to/file
md5 /path/to/file

# Finder
command + ↓ / command + o: 打开文件
```

## Ubantu/Debian

```bash
# apt-get: Linux() 包管理工具
sudo add-apt-repository ppa:{xxFilepath?} #

sudo apt-get install {package1} {package2} {package3}
sudo apt-get update  #update all
sudo apt-get upgrade {package} #update the special package

sudo apt-cache search {package keyword}  #search package
sudo apt-cache show {package} #show information of package
apt-get source {package} #download source code of package
```

## RedHat(CentOS)

```bash
# linux: https://www.kvmla.com/linuxwiki/1.htm
# 详细的shell command使用：http://www.rapidtables.com/code/linux/cp.htm
# https://github.com/jlevy/the-art-of-command-line

yum {install, update, remove} package
## yum plugins
## 插件配置地址 ：`/etc/yum/pluginconf.d/*.conf`
### `Priorities`，源优先级插件
yum install yum-priorities
## 源文件配置地址 ：`/etc/yum.repos.d/*.repo`
## 配置文件里面，优先级`priority=1`(1为最高)，启用`ebabled=1`

#apache2 restart
sudo service apache2 restart

# SElinux
# http://cn.linux.vbird.org/linux_basic/0440processcontrol_5.php
# 程序(subject)的domain与文件(object)的类型(type)符合规则时，程序就可以再去匹配rwx，看能不能访问

# Security Context(存放于inode中)，由三部分组成Identify:role:type
# type是主要的
ll -Z $path
ps aux -Z | grep $execfile

getenforce                        # SELinux 模式
chcon -t $type $file              # 修改安全性文本(Security Context)
      -R                          # 连同该目录下的次目录也同时修改；
      -t                          # 后面接安全性本文的类型栏位！例如 httpd_sys_content_t
	  -u                          # 后面接身份识别，例如 system_u
      -r                          # 后面街角色，例如 system_r；
# 重置安全性本文
# ssh下的private key不起作用，可能就是安全性本文不对
restorecon -R -v ~/.ssh/$privatekey

# policy
getsebool   # 获取domain与type之间的对应包含关系
setsebool   # 同上，设置

# log
cat /var/log/messages | grep 'setroubleshoot'
```

## Core

```bash
# curl 默认输出结果到stdout，不会保存文件
# https://curl.haxx.se/docs/http-cookies.html
curl -c[--cookie-jar] /path/cookiefile  # 从返回头中取出Set-Cookie值，并存储进文件
curl -b[--cookie] /path/cookiefile  # 从文件读取cookie信息
curl -j                   #  junk "session cookies"

# get http status
curl -s -o /dev/null -w '%{http_code}' https://domain.com
curl -L $url # 跟随重定向
curl -I $url # only output http response
curl -i $url # output http response & body
curl -i ifconfig.me   # lookup public ip addr

curl -O $url # 输出结果到文件，并以链接中的文件名保存
curl -o $file $url # 以$file文件保存,-o: -output
# wget
wget -O $file $url   # save as ${file}

# hash
md5sum $filename   # get md5
sha1sum $filename  # get SHA1(Secure Hash Algorithms)
sha256sum $filename   # linux CentOS 6.5 默认没有
sha512sum $filename # linux CentOS 6.5 默认没有

# charset
hexdump /file # convert by hex
xxd -r -p /file # convert by binary

###文件系统###
# 文件通配符*(globs)


#每个进程有三个相关联的描述文件，stdin stdout stderr，用数字分别是0 1 2
# ./myShell.sh > /dev/null 1>&2 表示stdout重定向到/dev/null,stderr跟stdout一样
/etc/profile                 # 一般用来设置系统变量


###特殊字符###
# 空格，括号，引号，[]，!，$，&，*，;，|，\
cd ~/\.teal/filename    #用\.来转义. 或者加引号
cd "~/.teal/filepath"

# ; && ||
ls; nohup crontab -e  # 命令并列执行，即使前面的失败
ls && nohup crontab   # 并列执行，得前面的成功后面的才执行
ls || nohup           # 前面成功则后面的不执行，反之则执行

ssh google "cat >> file" < file
cat a.txt > b.txt     # 把a.txt内容写到b.txt，覆盖式的
#cat <<EOF >> b.txt    # EOF, 多行文本追加
cat a.txt 2> b.txt    # 只到错误信息写到b.txt，覆盖
cat a.txt 2>> b.txt   # 错误信息，追加
cat a.txt 1>&2        # 重定向输出到错误信息？

# echo
# -e: 解析转义字符
echo -e '第一列' \\t'第二列'

# tee
# tee save standard input
cat a.txt | tee a.txt  # 直接cat a.txt > a.txt会报错
ps -ax | tee process.txt | more

###常用命令###
nohup command  # nohup(no hang up),使命令在后端运行，同时把命令的输出到nohup.out文件
command &      # 命令末尾加上&，使命令在background运行。同command1 & command2
nohup
#1. 阻止SIGHUP信号发到这个进程。
#2. 关闭标准输入。该进程不再能够接收任何输入，即使运行在前台。
#3. 重定向标准输出和标准错误到文件nohup.out。

### sudo & su http://fuwenchao.blog.51cto.com/6008712/1340685
sudo（super user do） # 只有/etc/sudoers下配置的用户只能用sudo指令

su -     #  切换为root用户
    su [- $USER] -c 'chmod +x /path/to;' # 以USER运行命令
su username   #切换为username用户
sudo !!        # 当上一条命令因没有用sudo而失败时，加上sudo后，再次运行
sudo -s        # 新开子Shell，使获得root权限，在子Shell里不必再输sudo了
mount -uw /    # 好像是恢复之前的启动参数

sh {shell.sh}  #打开shell脚本
ssh user@ip    # 远程shell登录 http://www.jianshu.com/p/5dbd766d4db2
# 命令执行并与当前shell交互
cd && tar czv src | ssh user@host 'tar xz' # 将文件复制到远程主机

# rz & sz, 需要客户端(XShell)和服务器同时支持
# 一般使用Zmodem文件传输协议
# 服务器安装： CentOS: yum -y install lrzsz
rz   # 传输文件从client到remote server
sz {filename}    # 传输文件从remote server to client

# vncserver
# x.x.x.x:1 (:1表示第一个终端窗口)
# pw path: ~/.vnc/passwd(二进制文件)
service vncserver start

## ssh
## ssh 原理与密钥登录
##　详细版：http://erik-2-blog.logdown.com/posts/74081-ssh-principle
## ruanyifeng： http://www.ruanyifeng.com/blog/2011/12/ssh_remote_login.html
ssh user@host 'mkdir -p .ssh && cat >> .ssh/authorized_keys'    <     ~/.ssh/id_rsa.pub # 把本地文件写入远程文件
# 端口转发(Tunnel): 将其他TCP端口网络走SSH隧道，还可实现加密、解密，突破防火墙限制，
#    **若SSH连接与应用程序之间连接在同一主机上，则走本地转发；若不在同一侧，则是远程转发**
# **若是用XShell来设置，则本地主机得是127.0.0.1，设置为localhost无用。**

which {name}   # 查看terminal命令的路径
man {name}     # 查看terminal命令的使用文档
whatis {name}  # 一句话描述命令作用

## http://www.thegeekstuff.com/2013/04/sort-files/
sort foo.txt
sort -t ' ' -k 2 -nr $file # 以空格为分隔符，按第二列排序，数字大小逆序排列
# -n sort by numeric
# -h human readable numbers (i.e 1K = 1 Thousand, 1M = 1 Million, 1G = 1 Giga, 1T = 1 Tera)
# -r reverse
# -u uqique 去重
# -t'|' -k2 -o output.txt 以'|'分隔去查第2列（1开头），保存结果在output.txt

ls {path}      # 列出文件夹
	ls *.txt   # 列出txt文件，相当于ls -l | grep .txt
pwd {path}     # 显示当前目录路径
mkdir {path}   # 新建文件夹
	mkdir -p path1/path2/path3  # 递归创建目录，父目录，同时文件夹存在时，忽略错误
rmdir {path}   # 删除文件
mvdir {path} {path} # 移动文件夹
cp {src} {dest}      # 复制文件（可用*通配符）
cp -rv /e/node_modules /e/branches   #(将/e/node_modules目录及里面文件，复制到/e/branches目录下，直接写到branches即可，不用自己加node_modules)
	cp -r	   #复制目录，recursive copy (including hidden files)
	cp -v      #输出进度信息
	cp -i      #有提示是否覆盖
	cp -d      #建立文件的软链接


# https://www.digitalocean.com/community/tutorials/how-to-use-rsync-to-sync-local-and-remote-directories-on-a-vps#conclusion
# -r: recursively
# -a: recursively and preserves symbolic links, special and device files, modification times, group, owner, and permissions
# -v: verbose
# -n: dry run(演习)
rsync -av it@192.168.10.108:/dir/ ./dir

dircmp         # 比较两个目录的内容
dirname {path} # 获得文件夹路径
basename {path} # 获得文件名

# hard link & soft(symbolic) link
# https://www.ibm.com/developerworks/cn/linux/l-cn-hardandsymb-links/
# hard link: 不能创建目录的链接，不能跨文件系统
# Linux的文件系统一般是EXT3，有inode&block data区域，inode存储了文件数据的索引
# hard link创建了一个文件副本，与原文件指向同一个inode，删除原文件对link文件没有影响
# soft link创建了文件的快捷方式，储存的是原文件的路径，原文件删除后，link失效
ln -s src.txt dest_ln.txt # 建立src.txt的软链接，即dest_ln.txt

file $file     #显示文件类型
stat $filename # stat a file
nano $filename #编辑文件，好像只有Mac系统才有
cat -b $filename  #查看文件，-b：显示行号
less $filename # 查看文件，按/可以查找文本，按v进入vi编辑模式
touch $filename # 更改文件的修改时间、创建时间（文件不存在时，会新建）
open $filename #使用默认的程序打开文件
	open .      # 用Finder打开当前目录
	open {path} # 用Finder打开path目录
rm -rf $path  # 删除文件 -r：迭代删除 -f：强制删除
mv $oldpath $newpath # 移动文件，重命名文件

mv app/ss64/{alpha,alphabeta}.py #https://ss64.com/bash/syntax-expand.html#parameter

rename # 重命名文件
	rename .html .php *.html   # 把html后缀改成php后缀
	#rename 's/(\d{2}):(\d{2})/$1.$2/' *.html # 12:00 => 12.00 ，实际用不了
wc -lw           #word count,列出文件中的行数(-l)或单词数(-w) 如：ls -l | wc -l（计算文件数）

# find
find -type f -printf '%s %p\n' | sort -nr  # 找到目录下的文件(-type f)，打印出两列，文件大小(%s)与文件路径(%p)，然后进行倒序排列(sort -r)
find -name "*.c"  # 查找符合格式的文件名，awk: ls *.c
find -regex "begin_end"   # 查找匹配全部正则的路径
find /path/to/file -name '*.zip' -ctime +2 -delete
# maxdepth参数得放在前面
# -ctime, -2 2天之内的， 2 2-3天之间的
# -atime, access time
# -mtime, 天为单位，-mmin -30 30分钟之内的
find /path/to/file -maxdepth 1 -type d -ctime +2 | xargs rm -rf
# rename app-node-out__201709.log out__201709.log
for n in `find -name 'app-node-out__*'`; do
    mv $n ${n/app-node-/};
done

# grep的正则：http://www.cyberciti.biz/faq/grep-regular-expressions/
grep   # global regular expression Print
grep "search_text" {filename} # 在文件中查找匹配的字符串
grep -E   #  使用POSIX的扩展正则，同egrep
grep -o 'gre.*'   # 只输出匹配的内容
grep '^[^#]' openvpn.conf  --color   # 查看不以#注释开头的行  color: 关键词颜色标注
grep -A3  # 显示匹配行的下三行(A: after)
grep -B3  # 显示匹配行的上三行(B: before)
ps aux | grep -v 'grep' # 排队某个关键词

 # 在文件夹里递归查找文本
 # -r: -recursive
 # -w: whole word match
 # -n: show line
 # -l: only show the filename that contains the word
 # https://stackoverflow.com/questions/16956810/how-do-i-find-all-files-containing-specific-text-on-linux
grep -rwn '/path/' -e 'pattern'
grep -ril 'tobematchword' /

egrep
# grep的一个衍生，支持POSIX扩展正则表达式，而grep是普通正则表达式

# awk http://linux.about.com/od/Bash_Scripting_Solutions/a/How-To-Write-Ask-Commands-And-Scripts.htm
awk '{print $1}' {filename} # 在文件中根据每行的分隔来输出，分隔符默认为空格
awk -F ',' '/pattern/ {print $1}' {filename} #以,为分隔符查找每行第1列数据，并且此行要匹配到/pattern/
awk '$2==money {print $1}' {filename}      # 查找第2列为money的第1列
awk '{ print $2 " " $1 }' $file # 以空格为分隔符，替换第1列与第2列的值!!!!


# sed
# s|||g  用了s，后面就可以用g、i等flag
#
dirname=/etc/
filename=/etc/passwd.conf
echo $filename | sed "s|$dirname||g" # /etc/passwd.conf => passwd.conf

sed -i '1d' $file # -i: 源文件修改，'1d'删除首行，'$d'删除尾行
sed -n '/^2017-08-08 18:36*错误文本/p' out.log # 输出正则匹配的行

diff {filename1} {filename2}   # 比较文件差异
uniq $file1 $file2   # 去掉文件中的重复行
# 对文件进行去重
tmpfile="$(mktemp)"
sort $file | uniq > $tmpfile
cat $tmpfile > $file
rm -f $tmpfile
yes y | rm $file/* # yes y: 一直输出y
printf 'y\ny\n' | rm $file/*

# exec & xargs
# http://www.cnblogs.com/peida/archive/2012/11/14/2769248.html
exec
xargs    # build and execute command lines from standard input，构建命令行参数，需要的不是数据流，而是实实在在的参数，比如find -name "*.html" -print | xargs rm -rf (rm需要的是命令行，而不是数据流)

ls 3.txt | xargs cat
ls *.txt | xargs -n1 -I{} mv {} {}_bak    # 列出txt文件，并重全名为.txt_bak,mv后为操作， -n1 -I{}表示为所有文件的循环操作，{}为文件名

# --- source
# 在当前shell环境运行，如有环境变量设置，也会对当前shell生效，如果直接运行文件，则是在子shell里运行，产生的环境变量只在子shell里生效，不影响父环境
# http://www.ahlinux.com/shell/23595.html
source(.) {filename}
chmod          # 更改文件权限
	chmod +x myscript.py  # 使文件可执行  ./myscript.py 就可直接打开,直接myscript.py是不行的。
	chmod +x script.js    # 在JS文件第一行写入node执行文件的路径就可以了：#!/usr/bin/node 或#!/usr/bin/env node(在/usr/bin/env里去找node的安装路径，前者使用的是绝对路径)
	chmod -R 777 $dirctory  # 递归作用于文件夹
chown          # 更改文件属主
passwd         # 修改用户密码

clear          # 清除屏幕内容
env            # 显示当前设置过的环境变量
who            # 列出当前登录的所有用户
whoami         # 显示当前正在操作的用户

# -- Process
ps aux         # 打印进程，为有pid列

# http://www.thegeekstuff.com/2009/12/4-ways-to-kill-a-process-kill-killall-pkill-xkill/
kill -l        # 列出全部信号名
kill [-9] pid  # 杀某一个pid进程，加-9为强制
killall processname # 杀死进程，参数为进程名

trap 'echo you hit Ctrl-C/Ctrl-\, now exiting..; exit' SIGINT SIGQUIT


# -- nice
# https://www.nixtutor.com/linux/changing-priority-on-li0nux-processes/
# 给进程分配Cpu处理优先级,-n: -20到19，-20为最高优先级。只有root才能设置负的优先级
nice -n -20 run command here # 以-20的优先级运行
renice -n -20 -p 234 #给已经存在的进程重新分配处理优先级
renice -u $user -g $group  # 给某个user或group指定nice value
ps -p 234 -o pid,ni,comm  # 输出pid为234的niceness(nice value)

# -- Net
见/Codes/Net目录

# timezone
## user (edit ~/.bashrc)
export TZ="Asia/Shanghai"
. ~/.bashrc
## global
ln -sf /usr/share/zoneinfo/Asia/Shanghai /etc/localtime

# mail
mail -s 'mail title' nam@qq.com #然后输入邮件内容后，按Ctrl+D结束 |
echo 'content' | mail -s 'mail title' mailaddress

sudo hostname -s myHostName.local  # mac,永久保存hostname
less /etc/sysconfig/network      # linux , 同上

# --- startUp & service
# runLevev&chkconfig: https://zh.wikipedia.org/wiki/%E8%BF%90%E8%A1%8C%E7%BA%A7%E5%88%AB
# 详细说明：http://www.tldp.org/HOWTO/HighQuality-Apps-HOWTO/boot.html
# 安装步骤：https://support.suso.com/supki/CentOS_Init_startup_scripts
# 1. 把文件放在init.d下，加上start|stop函数；
2.00 加上 #chkconfig 2345 99 01 (runlevel 启动权重 关机权重)
30. chkconfig -add servicename
    # 用chkconfig设置程序在哪个启动级别下启动
   chkconfig --level 2345 servicename on
# /etc/init.d 为/etc/rc.d/init.d的软链接
# /etc/rc.d/rc[0-6].d
分别对应0-6不同的启动方式下，需要启动的服务
# 需要在文件里加上`# chkconfig: <levels> <start> <stop>`，chkconfig --add命令才能接受

# service命令其实只是运行init.d目录下脚本的工具而已
service crond status  # 查看crond的服务状态
/etc/init.d/crond status
chkconfig --list     # 查看所有开机启动
    chkconfig --list openvpn  # only for openvpn
chkconfig --add some-service  # 添加进开机启动后
chkconfig [--level 345] openvpn on   # 设置openvpn为开机启动

# -- process & File System & cpu & memory
ps -ef # 查看进程
df -h  # 查看文件系统（磁盘）空间\
# 查看目录中文件大小top10
# https://www.cyberciti.biz/faq/how-do-i-find-the-largest-filesdirectories-on-a-linuxunixbsd-filesystem/
du -sh ./ # 查看文件夹大小， -s 不显示单个文件大小，只显示文件夹大小 -h human read
top    # CPU
free   # 内存
# http://www.binarytides.com/linux-cpu-information/
cat /proc/cpuinfo # check cpu info(processor数并不能表示实际的)
lscpu             # check cpu info too

# lsof(list open files): 查看进程使用了哪些文件，文件被什么进程使用
# https://www.ibm.com/developerworks/cn/aix/library/au-lsof.html
lsof -a -p `cat /root/pid` -d ^txt  # 同时进行-p进程与-d文件描述符为txt的查找
lsof /var/run/sendmail.pid  # 看文件被哪些进程使用
lsof -i :6321              # 查看套接字port使用了哪些文件
lsof -i @192.168.1.1    # 查看套接字IP使用了哪些文件

# --chkconfig  添加系统服务
# /etc/init.d/
chkconfig --add tun_config
chkconfig --level 345 tun_config on

# -- 计划任务 locate: /var/spool/cron/$(username)
# 更新了不需要重启/etc/init.d/crond
# 计划任务里脚本执行的当前路径是~，所以脚本里的相对路径也是相对与~的
crontab        #添加计划任务,-e: 新建任务，-l: 列出任务， -r: 删除任务
crontab -e # 编辑个人任务
cat /etc/crontab  # 系统任务列表

#分 时 日 月 周几(0、7都是表示周日)
59 23 31 09 7 echo 'text'>crontab.txt           # 9/31 23：59 周日，执行这个动作
20 1 * * * echo “”>/var/log/slow.log            # 每天1：20
0 3 * * 0 /bin/sh /usr/local/sbin/backup.sh    # 每周日3点
10 04 14 * * /bin/sh /usr/local/sbin/backup_month.sh # 每个月14号
0 */8 * * * ntpdate time.windows.com              # 每8个小时
0 1,12,18 * * /bin/sh /usr/local/sbin/test.sh     # 每1、12、18点
0 9-18 * * * /bin/sh /usr/local/sbin/test2.sh     #9到18点

# -- Task (ctrl+z: 暂停命令，加入任务，状态为Stopping)
# -- http://www.thegeekstuff.com/2010/05/unix-background-job
jobs           # 查看后台运行的任务
fg {job-number}       # foreground，让后台运行的任务在前台执行,num为jobs输出的编号
bg {job-number}       # background，让任务后台执行（Status: Stopped -> Running）
kill %job-number      # Kill a specific background job (Status: -> Terminated)
screen         # 当前环境打开一个新窗口，Ctrl+a,d: 隐藏窗口，-ls：列出窗口列表，-r {num}：登录某个窗口

# -- gz tar
# .tar.gz: 经tar打包，并gzip压缩,tar不提供压缩只有打包功能
gzip filename            # 生成.gz压缩文件，但不能对文件夹生效
gzip -d filename.gz      # 解压.gz文件
# tar # -a: 创建 -z: gzip解压  -x: 解压   -v: 可视化    -f: 保持文件名一致(!这个参数还得放在最后一个！！！) -t: 直接查看内容
tar -cvf file.tar ./    # 打包
tar -xvf file.tar     # 解包
tar -tvf file.tar or file.tar.gz  # 查看包内容
tar -czf newfile.tar.gz file1 file2      # 添加压缩文件
tar -xzfv filename.tar.gz -C $targetDir# 解压压缩包文件，并保持文件名一致


# -- locate
# Linux文件索引库：/var/lib/mlocate/mlocate.db（CentOS 6.x），每天自动更新
locate {filename}    # 根据文件名查找文件路径
updatedb [-U pathname]        # 手动更新文件索引库,更新指定的目录索引
OSX下的路径为： ln -s /usr/libexec/locate.updatedb /usr/local/bin/updatedb

# -- user & group
# passwd: /etc/passwd /etc/shadow
# group profile: /etc/group
# user profile: /etc/user
useradd {user}
userdel {username}
groupadd [-g GID] groupname
groupdel groupname


# -- chmod
# 文件权限：r:可读(4)，w:可写(2),x:可执行(1),括号中的数字表示对应的权限。7=4+2+1=》rwx
# 文件用户主与用户组：u: user, g: group, o: other group, a: u+g+o
chmod +x filename  # 同chmode a+x filename
chmod u-x filename  # 只对user去掉可执行权限
chmod 755 filename  # u: rwx, g: wx, o: wx
# -- umask ？
# 掩码定义：https://zh.wikipedia.org/wiki/%E6%8E%A9%E7%A0%81
# 指定用户创建文件和文件夹时默认的权限
umask      # 查看
umask 0022 # 赋值
# -- chattr （好像mac中没有）
# 更改文件（夹）的属性
# -i: 不能删除、重命名、创建链接、写、读

######bash command
# 也可以使用zsh，支持alias的其他用法，PC下可使用Git Bash或cmder
alias ll='ls -l'  # 在当前环境设置command
/etc/.bashrc  # 系统的
~/.bashrc    # 用户的，永久设置command alias ，编辑后需source ~/.bashrc

###### 特殊环境变量
!$  # 上一行命令的最后一个参数
	du -sh somefile
	vim !$   # 就相当于vim somefile
######局部环境变量
set LOCAL_VARS=local           #局部环境变量
######全局环境变量
# /etc/profile (系统级别的)
# /etc/.bashrc
# $HOME/etc/.bash-profile (用户级别的，优先取这个文件，然后别的配置文件从这个文件里引入读取)
# $HOME/etc/.bashrc
# http://blog.csdn.net/yechaodechuntian/article/details/45244417
export NODE_ENV=development    #在当前shell设置，Logout后失效
export -n NODE_ENV             #删除当前shell环境变量，logout后生效
sudo less /etc/profile         #系统级设置，添加export NODE_ENV=xxx，然后 source /etc/profile使配置生效，当前session重启即可生效

### IPC
#fifo(named pipe)
# http://www.linuxjournal.com/content/using-named-pipes-fifos-bash
mkfifo /tmp/customfifofile  #
```
