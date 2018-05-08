### Issue

> [http://pm2.keymetrics.io/docs/usage/application-declaration/#updating-running-conf](http://pm2.keymetrics.io/docs/usage/application-declaration/#updating-running-conf)

1.  `pm2 reload appName` 不会更新`app-pm2.json`, `pm2 reload app-pm2.json` 有时可以更新里面的配置？

### Startup

>

```bash
# 还不知道启动脚本里的/var/lock/subsys/pm2-init.sh这个是干嘛的
pm2 startup [centos|ubuntu]
pm2 startup [systemd,upstart,launchd,rcd]  # 2.2.1？之后的版本，以初始化系统名来当参数
#/etc/systemd/system/pm2-root.service

# https://futurestud.io/tutorials/pm2-restart-processes-after-system-reboot
pm2 startup -u nodeuser # 解决启动不了的问题，以nodeuser的身份启动？


### dump & update
pm2 dump && pm2 kill && pm2 resurrect # 保存应用，重新开启
pm2 update # 更新内存里的pm2版本，十分有用，等效于上面的3个命令

pm2 dump  # 保存当前pm2环境到~/pm2/dump.pm2，重启时resurrect会用到
# 可能要这样子
mv /etc/init.d/pm2-root.sh /var/lock/subsys/pm2-root.sh
reboot
```

pm2_home=/root/.pm2 命令行启动时，默认是/$user/.pm2 目录启动的，这时 dump.pm2 就会放在这个目录 。也可以手动指定 PM2_HOME=/home/it/.pm2 pm2 start $app

升级 pm2 后，可以自动升级`pm2 update`，跟`pm2 dump; pm2 kill; pm2 resurrect;`的过程是一样的

> > > > In-memory PM2 is out-of-date, do
> > > > $ pm2 update
> > > > In memory PM2 version: 1.1.3
> > > > Local PM2 version: 2.7.2

为什么 pm2_home 的是这个
pm2 Spawning PM2 daemon with pm2_home=/home/it/.pm2

### deploy

环境部署，可以结合`git`,用`pm2 deploy`来部署
https://www.toobug.net/article/using_pm2_deploy.html
https://keymetrics.io/2014/06/25/ecosystem-json-deploy-and-iterate-faster/

1.  会在服务器目录下生成 source 目录
2.  `pm2 deploy $env setup`
3.  `pm2 deploy $env update`
4.  `pm2 deploy $env revert 1`
5.  `pm2 deploy production exec "pm2 restart all"`

```
`pm2 ecosystem`,生成下面的文件:`ecosystem.config.js`(文件名变了执行cli时会找不到配置文件)

{
	"apps" : [{
		"name" : "xxx", //项目的名字
		"script" : "$dist/source/xxx.js",  //项目主入口（Node.js）
		"env": {
			"COMMON_VARIABLE": "true"
		},
		"env_production" : {
			"NODE_ENV": "production"
		}
	}],
	"deploy" : {
		"production" : {
			"user" : "toobug",
			"host" : "server.toobug.net",

			"ref"  : "origin/master", //需要部署的分支
			"repo" : "git@github.com:TooBug/xxx.git",
			"path" : "/var/www/xxx", //web目录,会在此目录下生成source目录
			"post-deploy" : "npm install && pm2 startOrRestart ecosystem.json --env production"
		}
	}
}
```
