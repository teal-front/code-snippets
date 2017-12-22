> 启动系统，会成为`PID`为1的进程，其他进程都是它的子进程

### init
> 比较老的系统
> https://www.ibm.com/developerworks/cn/linux/1407_liuming_init3/index.html

##### 缺点：
1. 启动时间长。init进程是串行启动，只有前一个进程启动完，才会启动下一个进程。
2. 启动脚本复杂。init进程只是执行启动脚本，不管其他事情。脚本需要自己处理各种情况，这往往使得脚本变得很长。
```
/etc/init.d/$service start
service $service start
```

#### systemd
**系统的启动和管理的一套方案，`systemctl`只是其中的一部分。**
> http://www.ruanyifeng.com/blog/2016/03/systemd-tutorial-commands.html
> http://www.ruanyifeng.com/blog/2016/03/systemd-tutorial-part-two.html

配置文件在`/etc/systemd/system`里，启动时从这里加载，一般实际存放在`/usr/lib/systemd/system`。
```
systemctl status|start|stop|kill $service
systemctl status pm2-root[.service] # 查看pm2进程，以root用户启动的

```

#### upstart
```
tobe edit
```