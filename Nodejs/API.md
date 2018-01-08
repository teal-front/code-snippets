## Child_process
> [nodejs.org](https://nodejs.org/dist/latest-v6.x/docs/api/child_process.html)

```js
var child_process = require('child_process');
```
### child_process.spawn
> 下面方法都是spawn的子集, 生产一个子进程, 用这个方法可以创建一个守护进程
`spawn('cmd', [], {detached: true, stdio: true})`
1. 创建守护进程
> [https://cnodejs.org/topic/57adfadf476898b472247eac](https://cnodejs.org/topic/57adfadf476898b472247eac)

```javascript
var spawn = require('child_process').spawn;
var process = require('process');

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