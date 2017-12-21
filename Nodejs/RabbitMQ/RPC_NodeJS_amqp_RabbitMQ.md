1、什么是RPC
	远程过程调用协议（Remote Procedure Call Protocol），通过TCP、WebSocket等网络方式连接请求服务，传入函数名与参数，返回结果的过程。可进行分布式计算及不同物理机、不同Web框架之间的通信。
	如RabbitMQ、DNODE

2、amqp，支持RPC的一个协议
	AMQP（Advanced Message Queue ），高级消息队列协议，异步消息处理的一个协议。
	
3、RabbitMQ(server slide)
	AMQP的实现，用erlang开发。


NodeJS中rpc的调用：
1、app.js中引入channel-api.js，作rpc调用的中间层，默认为使用rabbitMQ，channel-api.js中引入rpc.js，里面有实现amqp协议的方法与接口，调用方法为request
2、在app.js中通过channel.init('rabbitAmqp', {url: 'amqp://guest@guest:192.168.1.1:5672'})，把rpc的实例赋值给channel.enables，包括调用方法request
3、requests/目录下定义业务中的调用方法，里面使用channel.enables.request(MethodName, params, callback)实现
4、上一步中的MethodName在definitions.js中指定，由serverId（队列名）、InterfaceId（接口名）组成
5、在rpc.request调用rpc.call方法，返回结果
6、对返回的结果使用requestTools.checkErrorRpc作异常的处理
7、如果在routes的JS里用了Promise方法，则返回结果触发Promise的resolve或reject。


