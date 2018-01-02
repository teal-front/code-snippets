### setTimeout

### callback

### Generator
```js

```

### Thunk

http://www.ruanyifeng.com/blog/2015/05/thunk.html
```js

```

### co
```js

```

### async
使用`async`对`promise`进行重构： https://gist.github.com/mpj/3f8bc0c6ecda4294fbeff99f1e3fae85
##### async函数总是返回promise对象,不管有没有return
```js
var fetchCity = async function (cityName) {
    return $.get('/m/user/get-city-info', {cityName: cityName})
}

var citys = ['深圳市', '广州市', '北京市'];

var cityCodes = async function () {
    var ret = [];

    // method 1
    return Promise.all(citys.map(city => fetchCity(city)));

    // method 2
    return Promise.all(citys.map(async function (city) {
        var result = await fetchCity(city)

        return result
    }))
};
cityCodes().then(d => console.log(d));
```

##### reduce & Promise.resolve()组合使用
```js
function processAllUsers () {
  const sql = 'SELECT id FROM users'
  return db.query(sql, [])
    .then(users => 
    
      users.reduce((lastPromise, user) => 
        return lastPromise.then(_ => processUser(user.id))
      , Promise.resolve()))
}
```


### async promise setTimeout 调用时序问题
```js
async function f1() {
  console.log('f1 start')
  await f2()
  console.log('f2 end')
}
async function f2() {
  console.log('f2')
}
f1()
console.log('js start')
setTimeout(function () {
  console.log('settimeout start')
}, 0)
new Promise(function (resolve, reject) {
  console.log('promise start')
  resolve()
}).then(function () {
  // then方法指定的回调函数，将在当前脚本所有同步任务执行完才会执行
  console.log('promise then')
})
console.log('js end')
/**
 * output:
f1 start
f2
js start
promise start
js end
f2 end
promise then
settimeout start
 */

```