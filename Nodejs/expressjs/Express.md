### MiddlerMire(中间件) ###
> http://expressjs.com/zh-cn/guide/using-middleware.html

#### 模拟实现
```js
let express = function () {
    let pipelines = []
    let app = (req, res) => {
        let i = 0

        function next () {
            let pipeline
            while(pipeline = pipelines[i++]) {
                pipeline(req, res, next)
            }
        }
        next()
    }
    app.use = (middleware) => {
        pipelines.push(middleware)
    }

    return app
}

let app = express()
app.use((req, res, next) => {
    console.log('middleware1')
    req.teal = 'foo'
    next()
})
app.use((req, res, next) => {
    console.log('middleware2')
    res.end(req.teal)
})
app.use((req, res, next) => {
    console.log('middleware3')
})

require('http').createServer(app).listen(3000)
```

####中间件五件套：
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