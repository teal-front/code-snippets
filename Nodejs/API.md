Nodejs为O/I非阻塞，异步编程风格的平台。由于支持闭包，所以函数可以访问函数定义时所在作用域的变量。避免了多线程的上下文切换

> https://elemefe.github.io/node-interview/#/

## Modules
1. `Nodejs`采用`commonjs`模块系统，文件即模块。`require/module/exports`
2. 模块的加载顺序为：核心模块、文件模块、文件夹模块、`node_modules`模块。
3. 模块会被缓存，只执行一次

## Process
1. `process.nextTick`, 下一次事件循环的时运行，比`setTimeout`要快
2. 

## Events(之前的EventEmitter模块)
可用作`Nodejs`里的事件发射器基类
```js
const EventEmitter = require('events')
class MyEvent extends EventEmitter {}
let myevent = new MyEvent()
myevent.on('drain', () => {
    console.log('drain')
})
```

## Child_process
> [nodejs.org](https://nodejs.org/dist/latest-v6.x/docs/api/child_process.html)

```js
var child_process = require('child_process');
```
### child_process.spawn
1. `exec/execFile/fork/execSync/execFileSync`都是spawn的子集, 生产一个子进程
2. `spawn`产生的对象是基于流的，可以进行流事件监听，没有像`exec`一次性返回数据
3. 与子进程通信，单向：传入环境变量、命令行参数，双向：IPC、child.stdin/stdout

####创建一个守护进程
`spawn('cmd', [], {detached: true, stdio: true})`
1. 创建守护进程
> [https://cnodejs.org/topic/57adfadf476898b472247eac](https://cnodejs.org/topic/57adfadf476898b472247eac)

```javascript
var spawn = require('child_process').spawn;

var p = spawn('node',['b.js'],{
        detached : true,
        stdio: 'ignore'
    });
p.unref(); // 使父进程可以单独退出，除非有IPC通道
console.log(process.pid, p.pid);
process.exit(0);
```

### child_process.exec
> 新建shell子进程(linux: bash, win: cmd.exe)，并在里面执行

### child_process.execFile
> 直接以命令打开,比exec效率高，不用打开shell环境，也更安全，参数不用bash去解析

### child_process.fork
> 打开nodejs子进程，并有IPC(Inter-Process Communication)

### child_process.execSync
> exec的异步版方法

### child_process.execFileSync


## Path
### path.resolve
返回绝对路径

## Buffer
1. 用来弥补js处理二进制的不足
2. **没有分配在nodejs VM中，而是独立的一块内存区域，避免了垃圾回收中新生代老生代内存复制所占用的CPU**
```js
// new Buffer： deprecated in v6
let buffer = Buffer.from('this\'s a string', 'utf8')
buffer.toString('base64')
buffer.length = 201400 // length无法动态改变，且有最大值
buffer.length // => 15
buffer[0] = 257 // => buffer[0] === 257 % 256

Buffer.alloc(10)  // 创建10字节缓冲区，并用0填充
Buffer.allocUnsafe(10)  // 单独创建缓冲区，不初始化。 创建速度快

// slice, 切割后存在引用关系
buffer.slice(0, 4)
// copy
buffer.copy(newBuffer, distStart, srcStart, srcEnd)
```

## EventEmmit
原生的TCP套接字、流，继承了事件发射器
```js
let ee = new EventEmmit()
ee.on('data', (err, data) => {
    
})
ee.on('once', (err, data) => {
    
})
```

## Stream
重点是`transform`流，`gulp`就用到了。 https://tech.meituan.com/stream-in-action.html

1. 文件流、网络流
2. Writable、Readable、Duplex、**Transform**
**可读流的数据当核缓冲区填满时，会写入内存。如果不暂停可写流，那内存就会出现增长问题，下面的`pipe`可以解决这个问题**
3. `pipe`用来解决慢客户端问题，即数据生产速度大于数据消费，会导致缓冲区溢出的问题。原理是检测没有消费时，暂停生产，待消费者`drain`刷新缓冲区时再`resume`生产
```js
const http = require('http'), fs = require('fs')
http.createServer((req, res) => {
    // raw
    let file = fs.createReadStream('/pach/to/file')
    file.on("data", (data) => {
        // res.write返回false就说明数据没写出核缓冲区
        if (!res.write(data)) {
            file.pause()
        }
    })    
    res.on("drain", () => {
        file.resume()
    })
    file.on('end', () => {
        res.end()
    })
    
    // method of `pipe`
    file.pipe(res, {end: false})
    file.on('end', () => {
        res.end()
    })
}).listen(8080)
```