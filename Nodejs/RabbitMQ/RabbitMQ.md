### Learning Source
1. http://www.rabbitmq.com/tutorials/tutorial-six-javascript.html

### Config
`URI:amqp://root:pw@127.0.0.1:5672`

### Install 
[http://www.jianshu.com/p/d985a547eac8](http://www.jianshu.com/p/d985a547eac8)
1. CentOS6 
''' shell'''
 `yum install rabbitmq-server` // install path: /usr/lib/rabbitmq
	chkconfig rabbitmq-server on   // 配置为守护进程随系统自动启动，root权限下执行:
	/sbin/service rabbitmq-server start // 启动rabbitMQ服务
	rabbitmq-plugins enable rabbitmq_management  //安装Web管理界面插件
	/usr/lib/rabbitmq/lib/rabbitmq_server-3.1.5/sbin/rabbitmq-plugins enable rabbitmq_management // 同上
'''
2. configuration File
	path: /etc/rabbitmq/rabbitmq.config (如果没有这个文件，就新建一个，修改完文件后重启服务)
3. 让外网访问Web管理界面
	rabbitmq.config：
		[
			{
				rabbit,
					[
						{loopback_users,[]} %%设置回环IP可以访问的用户为空
					]
			}
		]

4. rabbitmqctl (rabbitmq-server cli)
rabbitmqctl add_user test 123456 // 创建账号
rabbitmqctl  set_user_tags  test  administrator //设置用户角色
rabbitmqctl set_permissions -p "/" test ".*" ".*" ".*"  //设置用户权限
rabbitmqctl list_users   // 查看用户列表