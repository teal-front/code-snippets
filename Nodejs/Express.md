### MiddlerMire(中间件) ###
中间件五件套：
```
express-session  (session)
cookie-parser (req.cookie)
body-parser  (req.body)
multer       (form: multipart/form-data)
connect-redis  (store session)
```

### session ###
[https://www.npmjs.com/package/express-session](https://www.npmjs.com/package/express-session)

在客户端上的Cookie字段有一个特定的cookie id，用来表示在服务器上存储对应的值，默认用`MemoryStore`放在内存中存储，下面的代码用`redis`来存储的

使用`express-session`模块进行设置就可以了


```javascript
var app = require('express');
var session = require('express-session');

app.use(session({
	store: new RedisStore(Config.expressSession.redis),
    key: 'sid',
	// 默认生成的cookie键值为s:real_key.valid_value，real_key即为存储在redis上的key值，valid_value为验证字符串
	// 如：s:8FwkMsct5c2JgR5sE8GdCixRacjMvdfA.HmU4CBSePGgJkAlxCZ0lToWepgk6EvsxYTMHcOMgE6Y
    secret: 'decrpty key', 
    resave: false,  
    saveUninitialized: false,
    cookie: {
		domain: 'domain.com'
	}
}));

```