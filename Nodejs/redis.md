## 服务器安装 ##
>  Linux: [https://redis.io/download](https://redis.io/download)这上面有安装步骤，安装方式同客户端安装，在同一目录下

`redis-server /path/redis.conf  # start service`
> 在redis.conf里设置daemoize yes 就可以以守护进程运行

## 客户端安装 ##
> 桌面软件：`Redis Desktop Manager`

> Nodejs: `redis(npm package)`

> Linux: [https://redis.io/download](https://redis.io/download)这上面有安装步骤

## 坑
如果数据莫明被删，可以是memory不足，redis自带算法删除了，查看memory方法, `redis-cli -x info memory`

## Linux ##
> `redis-cli`: [https://redis.io/topics/rediscli#editing-history-and-completion](https://redis.io/topics/rediscli#editing-history-and-completion)

> `Sentinel`: https://redis.io/topics/sentinel http://www.cnblogs.com/linuxbug/p/5131504.html
```bash
redis-cli -h $hostname -p $port -a $password
> auth $password  # 这里安全验证

> INFO            # 查看redis-server信息
> select $dbIndex # 选择某个数据库
> dbsize          # 数据库大小

> keys $pattern   # search by pattern(he?llo he*llo h[ae]llo等)
> keys *          # batch check

> ttl $key        # 过期时间
> expire $key $expire_time   # 设置过期时间, 秒

> get $key
> set $key $value
> del $key

# 查看keys memory usage
redis-cli --stat 
# scan
redis-cli --scan --pattern 'sess*'
# print bigkeys
redis-cli --bigkeys


redis-cli -h $sentinelhost -p 26379  # 打开哨兵
> info sentinel
# master0:name=mymaster,status=ok,address=127.0.0.1:6379,slaves=2,sentinels=3
> sentinel masters   # 查看哨兵监控的Master
> sentinel slaves $mastername    # $mastername上一步会返回；查看slaves
> sentinel sentinels $mastername # 查看sentinels
> SENTINEL get-master-addr-by-name $mastername
```

## 基础知识 ##
> [http://www.runoob.com/redis/redis-data-types.html](http://www.runoob.com/redis/redis-data-types.html)
1. 数据结构：字符串、Hash、列表、集合、有序集合；
2. **为Hash储存时，redis.hmset(key, field, value, expires), key:field => value**;
3. 列表（List）为字符串列表；
4. 集合（Set）是不同值的哈希表，同**Nodejs的Set**，值为字符串；
5. 有序集合(Ordered Set)是可以加入排序权重（分数）的集合；
6. 事务(transaction)：
一次性执行多条命令，具有原子性，要么全部执行，要么全部不执行；
```
#  以MULTI表示事务的开始，EXEC表示执行
redis 127.0.0.1:6379> MULTI
redis 127.0.0.1:6379> SET book-name "Mastering C++ in 21 days"
redis 127.0.0.1:6379> SADD tag "C++" "Programming" "Mastering Series"
redis 127.0.0.1:6379> SMEMBERS tag
redis 127.0.0.1:6379> EXEC
```

## 使用 ##
1. 存储时，字段一般是`object_key:field`来表示，在`Redis Desktop Manager`中，会默认的生成`object_key`的文件夹来方便查看，不过在`redis-cli`中查找对应的值时，还是要加上`:`来查找
2. `redis-cli`的简单`get/set`
```shell
$ set name 'teal'
$ get name
```
3. `Nodejs`上有`connect-redis`可以使用：
```javascript
var app = require('express');
var session = require('express-session');
var RedisStore = require('connect-redis')(session);
app.use(session({
    store: new RedisStore({
		host: 'redis.com',
		port: 6379,
		ttl: 12 * 60 * 60 * 1000,   // expires time
		prefix: 'nodejs_session:'   // 存储字段前缀
	})
	// 还有其他项设置，这里忽略
}));

// Sentinels mode
const Ioredis = require('ioredis');
const redisClient = new ioredis({
    sentinels: [
        {
            host: 'redis-sentinel.com',
            port: '26379'
        }
    ],
    // Sentinel name，可通过上面的sentinel masters查询出来
    name: 'mymaster',   
    password: 'xxx',    // 连接redis服务器的密码
    family: 4,
    db: 10,
})
redisClient.on('connect', () => {
    console.log(`redis client connect OK. use db: ${db}`)
});
redisClient.on('error', (err) => {
    console.error('redis ERROR: ' + err)
});
```

## 高级使用
1. 两个站点共享登陆态方案，
 > 在a.domain.com上登录，使b.domain.com上具有登录态：
> 两个站点共用同一个redis环境，储存sessionId的key、secert一样，保存的cookie域名都设置成`domain.com`，如下：

```javascript
app.use(session({
	key: 'sid',
	secret: 'secert',
	cookie: {
		domain: 'domain.com'
	}
})
```
> 具体原理：在`a.domain.com`上生成`sid`的`session cookie`，域为`domain.com`，这样`b.domain.com`上也可以使用此`session cookie`；由于两边使用了同样的`secret`值，于是`b.domain.com`这边也可以验证通过`session cookie`，于是通过这个值去同一个`redis`环境去取，得到了登录信息
> `a.domain.com -> session cookie -> b.domain.com -> redis -> login info`
