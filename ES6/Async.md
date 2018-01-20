### setTimeout
1. 计时器存在精度问题，比如windows上，精度为15ms，如果设置成8ms，那可以实际是0ms或是15ms，所以要确保至少延迟15ms，那要把时间设置大于15ms。
2. 定时器的计算时间，从setTimeout执行的时候就开始计算了
```js
setTimeout(function () {
    // 会在下面的loop运行完后立马执行，而不是再等25ms
    console.log('timer invoke')    
}, 25)
let time = Date.now()
while (Date.now - time < 30) {
    console.log('looping')
}

```

### callback

### Generator
1. 生成器，是迭代器的语法糖。返回了一个{next(){return {done: true, value: ''}}的一个实现
2. 与迭代器的使用，可以参考./Array.md上的迭代器部分
3. `[Symbol.iterator] {next(){}}` 可实现对象迭代器
4. 还有$gen.return()、 $gen.throw()方法，都是可以终止迭代的
```js
// 实现函数迭代器range迭代
function *range (start, end) {
    for (let i = start; i <= end; i++) {
        yield i
    }
}
for (let i of range(3, 7)) {
    console.log(i)
}

function *gen () {
    let i = 0
    while(true) {
        let ans = yield i++
        if (ans === true) {
            i = 0
        }
    }
}

let g = gen()
console.log(g.next().value)
console.log(g.next().value)
console.log(g.next().value)
console.log(g.next(true).value)  // next中的参数被当作上一个yield的返回值 
console.log(g.next().value)
```

### Thunk

http://www.ruanyifeng.com/blog/2015/05/thunk.html
```js

```

### co
```js

```

### async
1. `generator/yield`的升级版，自带执行器，免去了调用`co/bluebird`执行函数库的引用
2. **async函数总是返回promise对象**
使用`async`对`promise`进行重构： https://gist.github.com/mpj/3f8bc0c6ecda4294fbeff99f1e3fae85
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
    
      users.reduce((lastPromise, user) => {
        return lastPromise.then(_ => processUser(user.id))
      }, Promise.resolve())
      )
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