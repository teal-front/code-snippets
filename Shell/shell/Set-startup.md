```
主流应用的官网上都提供了启动脚本的demo，比如nginx：https://www.nginx.com/resources/wiki/start/topics/examples/redhatnginxinit/

关于启动脚本的lockfile的作用：
https://linuxexplore.com/2014/03/19/use-of-subsystem-lock-files-in-init-script/

开户启动脚本里一般都会在start时，在/var/lock/subsys/里写入跟/etc/init.d/下一样的启动脚本名。 lockfile文件的存在，标示着service正在运行，当然系统硬关机时，此lockfile并不会删除。   可与pid一同判断，后面的就不知道了。。。
```

```bash
cd /etc/init.d
touch xxFile  #下面的脚本

chmod 755 xxFile
chkconfig add xxFile
chkconfig --level 345 xxFile on

service xxFile status|stop|restart
```

```bash
#!/bin/bash

#  这个很重要，不可缺少
# chkconfig: 2345 98 02


#
# Default-Start:        2 3 4 5
# Default-Stop:         0 1 6

export PATH=/usr/local/node/bin:$PATH

lockfile="/var/lock/subsys/$initname"

super() {
    local shell=$(get_user_shell $USER)
    su - $USER -s $shell -c "PATH=$PATH; PM2_HOME=$PM2_HOME $*"
}

start() {
    echo "Starting $NAME"
    super $PM2 resurrect

    retval=$?
    [ $retval -eq 0] && touch $lockfile
}

stop() {
    #super $PM2 dump
    super $PM2 delete all
    super $PM2 kill

    rm -f $lockfile
}

restart() {
    echo "Restarting $NAME"
    stop
    start
}


case "$1" in
    start)
        start
        ;;
    stop)
        stop
        ;;
    status)
        status
        ;;
    restart)
        restart
        ;;
    reload)
        reload
        ;;
    force-reload)
        reload
        ;;
    *)
        echo "Usage: {start|stop|status|restart|reload|force-reload}"
        exit 1
        ;;
esac
exit $RETVAL

```
