1. Simple Guide to Finding a JavaScript Memory Leak in Node.js:[https://www.alexkras.com/simple-guide-to-finding-a-javascript-memory-leak-in-node-js/](https://www.alexkras.com/simple-guide-to-finding-a-javascript-memory-leak-in-node-js/)


## Tools
1. [devtool](https://github.com/Jam3/devtool#repl)
> Runs Node.js programs inside Chrome DevTools (using `Electron`).
2. [heapdump](https://www.npmjs.com/package/heapdump)
> 一个npm包，在Node Run Time里生成Profile Heap快照，可以借助devtool来分析，要求`python < 3.0.0`
3. [memwatch](https://www.npmjs.com/package/memwatch)
> npm包，在代码里直接使用，实时检测内存动态，当发生内存泄漏的时候，会触发 ‘leak’ 事件



