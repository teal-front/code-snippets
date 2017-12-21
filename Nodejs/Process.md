# 创建守护进程

> 核心就是调用系统的setsid()方法，让进程成为init的进程
1. 该进程变成一个新会话的会话领导。
2. 该进程变成一个新进程组的组长。
3. 该进程没有控制终端。

#### 1. Node版本
> [https://cnodejs.org/topic/57adfadf476898b472247eac](https://cnodejs.org/topic/57adfadf476898b472247eac)

```javascript
var spawn = require('child_process').spawn;
var process = require('process');

var p = spawn('node',['b.js'],{
        detached : true,
        stdio: 'ignore'
    });
p.unref();
console.log(process.pid, p.pid);
process.exit(0);
```

#### 2. 守护进程实现 (C语言版本)
> https://elemefe.github.io/node-interview/#/sections/zh-cn/process?id=%e5%ae%88%e6%8a%a4%e8%bf%9b%e7%a8%8b
```c
void init_daemon()
{
    pid_t pid;
    int i = 0;

    if ((pid = fork()) == -1) {
        printf("Fork error !\n");
        exit(1);
    }

    if (pid != 0) {
        exit(0);        // 父进程退出
    }

    setsid();           // 子进程开启新会话, 并成为会话首进程和组长进程
    if ((pid = fork()) == -1) {
        printf("Fork error !\n");
        exit(-1);
    }
    if (pid != 0) {
        exit(0);        // 结束第一子进程, 第二子进程不再是会话首进程
                        // 避免当前会话组重新与tty连接
    }
    chdir("/tmp");      // 改变工作目录
    umask(0);           // 重设文件掩码
    for (; i < getdtablesize(); ++i) {
       close(i);        // 关闭打开的文件描述符
    }

    return;
}
```