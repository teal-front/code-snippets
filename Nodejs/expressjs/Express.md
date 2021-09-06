### MiddlerMire(中间件) ###
> http://expressjs.com/zh-cn/guide/using-middleware.html

#### 模拟实现
```js
let express = function () {
    let pipelines = []
    let app = (req, res) => {
        let i = 0

        function next () {
            let pipeline = pipelines[i++]
            if (!pipeline) return
            pipeline(req, res, next)
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
    // 这里还是会执行，在expressjs里不会
    console.log('middleware3')
})

require('http').createServer(app).listen(3000)
```