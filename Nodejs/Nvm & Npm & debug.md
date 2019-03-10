### Npm

1. `npm view package dist.tarball` : 查看 npm 包的原始下载地址. `npm view package`只是查看包的信息,不同于 package.json. https://docs.npmjs.com/cli/view.html
2. `npm pack package`: 下载 tarball 到当前目录,相当于`npm view package dist.tarball | xargs curl | tar -xz`
3. code EINTEGRITY
   `npm i --package-lock-only`
4. `npm cache verify`
   https://docs.npmjs.com/cli/cache.html

### NVM

使用某一个 nodejs 版本时，会把**nodejs 的路径加入环境变量**，此时 npm 指向此 nodejs 所在文件，**通过 npm 安装的全局包也将放在这个版本文件夹下**

`nvm use system` 将使用系统本来就有的 Nodejs 版本

```bash
nvm i 7.10.1
nvm ls
nvm use system    # 使用系统安装的版本

# use操作将会把~/.nvm/versions/node/v7.10.1加入$PATH
nvm use 7.10.1
```

### Compile

#### node-gyp

> https://www.npmjs.com/package/node-gyp
> 编译 C++源码

### Install & Npm

> npm v5.0 https://cloud.tencent.com/community/article/171211

1.  全局模块

1.1 只安装核心依赖

只安装`dependencies`里的包，不包含`devDependencies`

`npm i --production`

`npm i --only=production`

https://nodejs.org/dist/latest-v6.x/docs/api/modules.html#modules_loading_from_the_global_folders

模块的查找最后(之前的父文件夹找不到之后)会在`$HOME/.node_modules`、`$HOME/.node_libraries`、`$PREFIX/lib/node_modules`里查找，若找不到则在$NODE_PATH 路径里，**路径得包含 node_modules，如`NODE_PATH=/bin/node_modules`**，$NODE_PATH 可以包含多个路径，由;或:分隔

在`CentOS`中，可以去`/etc/bashrc`去设置这个
`export NODE_PATH=/path/node_modules`; **如设置 npm 全局安装路径，则是`NODE_PATH=$(npm config get prefix)/lib/node_modules`，（PC 上是\$(npm config get prefix)/node_modules?），则 node 中使用全局模块时就会使用到 npm 的全局安装了,**

2.  package.json

`bin field` : 全局安装时，会在`$(npm config get prefix)/bin`下建立相应的 symlink，本地安装时，会在`/node_modules/.bin`下建立相应的 symlink，本地命令行可使用`npx`包来运行

3.  package-lock.json
    与`npm-shrinkwrap.json`相似，但`npm-shrinkwrap.json`是发布包里的，`package-lock.json`是安装之后的。`package-lock.json`应放在代码仓库里。

4.  私有 npm 服务器搭建好 npm 私有服务器后，就可以提供 registry 地址给客户端使用，设置 fallback url，当私有服务器没有时，就去 fallback 地址去找。还可以缓存在本地服务器上。淘宝有分 registry 与镜像(mirror)，镜像提供诸如 node-sass 的\*.node 安装包的下载地址，与 registry 是不同的。
    verdaccio： https://www.verdaccio.org/

**下面的是文章中所写的，没有确认！！**

npm 5.0 新加的文件锁，把 package 实际的依赖放进 package-lock.json 文件里，包括了下载路径。但是，但 package.json 里的版本号更改后，package-lock.json 里的并不会同步更新。
http://blog.csdn.net/wangpf1992/article/details/73607053

```
npm config get userconfig  # get usrconfig file path
npm config get globalconfig  # get global config file path
```

### Nodejs 的调试

1.  node debug app.js

    会在 cli 中监听代码中 debugger 语句，出现了则断点开始。
    [https://nodejs.org/api/debugger.html](https://nodejs.org/api/debugger.html)

2.  node --debug[=5858] app.js

    默认开启端口为 5858 的监听服务，可以用于在其他终端远程 debug，或者被 node-inspertor 使用。

    cli:node-inspertor // 默认监听了 5858 端口，在浏览器上输入命令行产生的 URL 就可以 debug 了

3.  IDE 端，如 WebStorm

### Nodejs 工具的使用

1.  `nodemon`
    auto-restart when file changed, [http://nodemon.io/](http://nodemon.io/)
    cli 使用时，就相当于把 node 替换成了 nodemon，所以
    node --debug app.js => nodemon --debug app.js，--debug 参数是等价于 node 命令的

2.  `node-inspector`
    使用 chrome DevTool 来调试代码

    **调试远程主机用到端口转发时，在 XShell 上的本地主机得用 127.0.0.1，用 localhost 无效**

    ```
    Useage：
    	1. node-debug
    		只打开Chrome DevTool调试界面，不运行Web服务！(单独使用，不接参数时，会监听默认的5858node debug端口，http://127.0.0.1:8080/port=5858)
    	2. node-debug app.js   #会自动启动web服务，并打开Chrome DevTool来调试
    	3. node-inspector # 监听5858（默认）端口，可在浏览器中输入命令行所产生的URL(一般是http://127.0.0.1:8080/port=5858)
    		1. nodemon --debug app.js or pm2 start app.js --node_args="--debug"(也可在*.json中配置)
    		2. node-inspector
    ```

3.  `pm2`

    1.  pm2 可开启 watch 选项来监听文件的变化来重启 node 服务，功能同 nodemon。可在配置文件（\*.json）中配置，也可在命令行中当 args 传入。 `pm2 start app.js --watch`

        [http://pm2.keymetrics.io/docs/usage/watch-and-restart/](http://pm2.keymetrics.io/docs/usage/watch-and-restart/)

    2.  暂时还没有找到使用 pm2 时，可以配套使用的 debug 工具，故开发环境下，目前最好的方案是`nodemon` + `node-inspector`
    3.  生产环境中，可以配合 nginx 作反向代理。 [http://pm2.keymetrics.io/docs/tutorials/pm2-nginx-production-setup](http://pm2.keymetrics.io/docs/tutorials/pm2-nginx-production-setup)
