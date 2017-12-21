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
##### async函数总是返回promise对象
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
        lastPromise.then(_ => processUser(user.id))
      , Promise.resolve()))
}
```
