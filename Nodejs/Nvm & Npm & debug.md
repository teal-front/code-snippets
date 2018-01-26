### NVM
使用某一个nodejs版本时，会把**nodejs的路径加入环境变量**，此时npm指向此nodejs所在文件，**通过npm安装的全局包也将放在这个版本文件夹下**
`nvm use system` 将使用系统本来就有的Nodejs版本
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
编译C++源码

### Install & Npm
> npm v5.0 https://cloud.tencent.com/community/article/171211

1. 全局模块

1.1 只安装核心依赖

只安装`dependencies`里的包，不包含`devDependencies`
`npm i --production`

`npm i --only=production`


https://nodejs.org/dist/latest-v6.x/docs/api/modules.html#modules_loading_from_the_global_folders

模块的查找最后(之前的父文件夹找不到之后)会在`$HOME/.node_modules`、`$HOME/.node_libraries`、`$PREFIX/lib/node`里查找，若找不到则在$NODE_PATH路径里，**路径得包含node_modules，如`NODE_PATH=/bin/node_modules`**，$NODE_PATH可以包含多个路径，由;或:分隔

在`CentOS`中，可以去`/etc/bashrc`去设置这个
	`export NODE_PATH=/path/node_modules`; **如设置npm全局安装路径，则是`NODE_PATH=$(npm config get prefix)/lib/node_modules`，（PC上是$(npm config get prefix)/node_modules?），则node中使用全局模块时就会使用到npm的全局安装了,**

2. package.json

`bin field` : 全局安装时，会在`$(npm config get prefix)/bin`下建立相应的symlink，本地安装时，会在`/node_modules/.bin`下建立相应的symlink，本地命令行可使用`npx`包来运行

3. package-lock.json
与`npm-shrinkwrap.json`相似，但`npm-shrinkwrap.json`是发布包里的，`package-lock.json`是安装之后的。`package-lock.json`应放在代码仓库里。

**下面的是文章中所写的，没有确认！！**

npm 5.0新加的文件锁，把package实际的依赖放进package-lock.json文件里，包括了下载路径。
但是，但package.json里的版本号更改后，package-lock.json里的并不会同步更新。
http://blog.csdn.net/wangpf1992/article/details/73607053

```
npm config get userconfig  # get usrconfig file path
npm config get globalconfig  # get global config file path
```

### Nodejs的调试
1. node debug app.js

	会在cli中监听代码中debugger语句，出现了则断点开始。
	[https://nodejs.org/api/debugger.html](https://nodejs.org/api/debugger.html)
2. node --debug[=5858] app.js

	默认开启端口为5858的监听服务，可以用于在其他终端远程debug，或者被node-inspertor使用。

	cli:node-inspertor   // 默认监听了5858端口，在浏览器上输入命令行产生的URL就可以debug了

3. IDE端，如WebStorm




### Nodejs工具的使用
1. `nodemon` 
	auto-restart when file changed, [http://nodemon.io/](http://nodemon.io/)
	cli使用时，就相当于把node替换成了nodemon，所以
	node --debug app.js => nodemon --debug app.js，--debug参数是等价于node命令的

2. `node-inspector`
	使用chrome DevTool来调试代码

	**调试远程主机用到端口转发时，在XShell上的本地主机得用127.0.0.1，用localhost无效**
	```
	Useage： 
		1. node-debug
			只打开Chrome DevTool调试界面，不运行Web服务！(单独使用，不接参数时，会监听默认的5858node debug端口，http://127.0.0.1:8080/port=5858) 
		2. node-debug app.js   #会自动启动web服务，并打开Chrome DevTool来调试
		3. node-inspector # 监听5858（默认）端口，可在浏览器中输入命令行所产生的URL(一般是http://127.0.0.1:8080/port=5858)
			1. nodemon --debug app.js or pm2 start app.js --node_args="--debug"(也可在*.json中配置)
			2. node-inspector
	```

3. `pm2`
	1. pm2可开启watch选项来监听文件的变化来重启node服务，功能同nodemon。可在配置文件（*.json）中配置，也可在命令行中当args传入。 `pm2 start app.js --watch`

		[http://pm2.keymetrics.io/docs/usage/watch-and-restart/](http://pm2.keymetrics.io/docs/usage/watch-and-restart/)
	2. 暂时还没有找到使用pm2时，可以配套使用的debug工具，故开发环境下，目前最好的方案是`nodemon` + `node-inspector`
	3. 生产环境中，可以配合nginx作反向代理。  [http://pm2.keymetrics.io/docs/tutorials/pm2-nginx-production-setup](http://pm2.keymetrics.io/docs/tutorials/pm2-nginx-production-setup)
	
	
