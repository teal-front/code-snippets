## pm2.json
> **out_file、err_file会有默认路径，为~/.pm2/logs/$appname-{out,err}.log**

## pm2-logrotate(pm2插件)
> [https://github.com/pm2-hive/pm2-logrotate#configure](https://github.com/pm2-hive/pm2-logrotate#configure)

**线上使用时，经常用占用好几百兆内存**

```shell
# CLI配置
pm2 set pm2-logrotate:<param> <value>
```

```javascript
// ~/.pm2/module_conf.json
{
    "pm2-logrotate": {
        "compress": "true",
        "rotateInterval": "0 0 * * *",
        "retain": "30",
        
        "workInterval": "7200",
        "max_size": "1G"
    }
}
```

## logrotate
> [https://support.rackspace.com/how-to/understanding-logrotate-utility/](https://support.rackspace.com/how-to/understanding-logrotate-utility/)

> [http://www.lightxue.com/how-logrotate-works](http://www.lightxue.com/how-logrotate-works)

> CentOS默认处理的`/etc/cron.daily/logrotate` : 
> `/usr/sbin/logrotate /etc/logrotate.conf >/dev/null 2>&1`


```bash
# logrotate.conf
rotate 8  # 保留多少历史文件
dateext   # 日志加上时间,默认为文件名后加上-%Y%m%d
#自定义时间格式，更精细的命名可以放在postrotate里
dateformat -%Y%m%d.log  
missingok # 找不到日志可以忽略
notifempty # 空日志不处理
compress  
#delaycompress 
sharedscripts # 多个日志滚动后，postrotate里的脚本只执行一次，即共享了这个脚本

# 新建日志模式，与下面的复制模式二选一
create
create 0664 root root

# 复制原日志模式
#copytruncate

/data/app-node/logs/app-node-log.log
/data/app-node/logs/app-node-out.log
/data/app-node/logs/app-node-err.log {
        prerotate
            cat err.log > mail -s 'err' $mailaddress
        endscript

        # 若采用create模式，则有的应用需要重启，比如PM2
        postrotate
                pm2 reload app > /dev/null 2>&1  &
        endscript
}

```

## 日志合并
> https://www.howtoforge.com/logresolvemerge.pl_merge_apache_access_logs

> https://www.cyberciti.biz/faq/unix-linux-merging-multiple-access-logs-with-logfile-merger/

> https://www.techrepublic.com/article/manage-linux-log-files-with-logrotate/

`logresolvemerge.pl /var/log/pm2/app1/* > /var/log/pm2/app1/overall.log`