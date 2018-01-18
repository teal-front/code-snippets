### npm: 安装5.5.1至少需要node.js版本大于4.7.0
ERROR: npm is known not to run on Node.js v4.3.1
Node.js 4 is supported but the specific version you're running has
a bug known to break npm. Please update to at least 4.7.0 to use this
version of npm


### koa需要 node.js > 7.6.0（要不然就用Bebal转码）

### Nodejs目前最新的LTS版本，v8.9.0(20171101)
https://nodejs.org/dist/v8.9.0/node-v8.9.0-linux-x64.tar.xz   
解压：tar -xvf $filename    

### 源码安装Nodejs后，旧的npm config get prefix自动指向新的nodejs安装目录了！
不过Npm还是指向旧的npm的

### /usr/bin/env是个可执行文件

### 新服务器部署步骤
1. 安装nodejs@8.9.0
2. 安装pm2@2.7.2
3. svn checkout app-node-xxx
4. 把测试环境的package-lock.json包放入svn，提交发布系统
5. 安装npm包  npm i --production
6. 运行pm2
7. 上发布系统，看下能不能正常发布到服务器
8. 配置nginx代理，正常访问，权重设置低点，灰度访问
9. 定期看nodejs日志，看下nodejs版本问题
10. Pm2日志处理,crntab -l   
/usr/sbin/logrotate -vf /root/.pm2/logrotate.conf > /root/.pm2/logs/logrotate.log 2>&1
11. pm2 set startup on boot : pm2 startup systemd (centos > 7: systemd) 



## Cli
1. 查看v8版本，`node -p process.versions.v8`;