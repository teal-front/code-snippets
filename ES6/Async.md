### setTimeout

1.  计时器存在精度问题，比如 windows 上，精度为 15ms，如果设置成 8ms，那可以实际是 0ms 或是 15ms，所以要确保至少延迟 15ms，那要把时间设置大于 15ms。
2.  定时器的计算时间，从 setTimeout 执行的时候就开始计算了

```js
setTimeout(function() {
  // 会在下面的loop运行完后立马执行，而不是再等25ms
  console.log("timer invoke");
}, 25);
let time = Date.now();
while (Date.now - time < 30) {
  console.log("looping");
}
```

### callback

### Generator

1.  生成器，是迭代器的语法糖。返回了一个{next(){return {done: true, value: ''}}的一个实现
2.  与迭代器的使用，可以参考./Array.md 上的迭代器部分
3.  `[Symbol.iterator] {next(){}}` 可实现对象迭代器
4.  还有$gen.return()、 $gen.throw()方法，都是可以终止迭代的

```js
// 实现函数迭代器range迭代
function* range(start, end) {
  for (let i = start; i <= end; i++) {
    yield i;
  }
}
for (let i of range(3, 7)) {
  console.log(i);
}

function* gen() {
  let i = 0;
  while (true) {
    let ans = yield i++;
    if (ans === true) {
      i = 0;
    }
  }
}

let g = gen();
console.log(g.next().value);
console.log(g.next().value);
console.log(g.next().value);
console.log(g.next(true).value); // next中的参数被当作上一个yield的返回值
console.log(g.next().value);
```

### Thunk

http://www.ruanyifeng.com/blog/2015/05/thunk.html

```js
```

### co

```js
```

### async

1.  **async 函数总是返回 promise 对象**
2.  `generator/yield`的升级版，自带执行器，免去了调用`co/bluebird`执行函数库的引用使用`async`对`promise`进行重构： https://gist.github.com/mpj/3f8bc0c6ecda4294fbeff99f1e3fae85

```js
var fetchCity = async function(cityName) {
  return $.get("/m/user/get-city-info", { cityName: cityName });
};

var citys = ["深圳市", "广州市", "北京市"];

var cityCodes = async function() {
  var ret = [];

  // method 1
  return Promise.all(citys.map(city => fetchCity(city)));

  // method 2
  return Promise.all(
    citys.map(async function(city) {
      var result = await fetchCity(city);

      return result;
    })
  );
};
cityCodes().then(d => console.log(d));

/// async polling
async function query() {
  let res = await polling();

  // 直到polling返回{done:true,value:"done"}，才会执行到这里
  console.log(Date.now(), res);
}
let pend = () =>
  new Promise((resolve, reject) => {
    setTimeout(function() {
      let status = true;
      if (i++ > max) {
        status = false;
      }
      resolve({ status });
    }, 10);
  });
var max = 3,
  i = 1;
async function polling() {
  let res = await pend();

  if (i++ < 3) {
    console.log(Date.now, i);
    // 立即返回
    // 下面加不加await都好像是一样的
    //return await polling();
    // 等待1秒后再轮询
    return new Promise((resolve, reject) => {
      setTimeout(function() {
        resolve(polling());
      }, 1000);
    });
  } else {
    return {
      done: true,
      value: "done"
    };
  }
}

query();
```

##### reduce & Promise.resolve()组合使用

```js
function processAllUsers() {
  const sql = "SELECT id FROM users";
  return db.query(sql, []).then(users =>
    users.reduce((lastPromise, user) => {
      return lastPromise.then(_ => processUser(user.id));
    }, Promise.resolve())
  );
}
```

#### 对错误的处理

async 里 promise 里的同步错误会立即错误，异步错误会被自身 promise 的 catch 捕获，或 async 返回的 promise 的 catch 捕获

```js
(async function errorAsync() {
  // 这里的两种会立即报错
  await new Promise((resolve, reject) => {
    throw new Error("throw err");
    Promise.reject("reject err");
  });

  // setTimoue+ reject会在async返回 的promise's cache函数里捕获
  await new Promise((resolve, reject) => {
    setTimeout(function() {
      reject("err");
    }, 1000);
  });
})().catch(e => {
  console.log(e);
});
```

### 异步生成器

async + generator

```js
async function* g() {}
```

### async promise setTimeout 调用时序问题

```js
async function fn1() {
  console.log(1);
  await fn2();
  console.log(7);
}
async function fn2() {
  console.log(2);
}
fn1();
console.log(3);
setTimeout(function() {
  console.log(8);
}, 0);
new Promise(resolve => {
  console.log(4);
  resolve();
}).then(_ => {
  // 竟然比async里异步要先执行，先进先出？
  console.log(6);
});
console.log(5);
```
