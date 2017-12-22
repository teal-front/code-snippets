### SSH
> http://www.ruanyifeng.com/blog/2011/12/ssh_remote_login.html

1. 生成ssh keys: 在`~/.ssh/`目录下，
`ssh-keygen -t rsa -b 4096 -C "$email"`，也可以用XShell生成公私钥，私钥留在本地；
2. 把添加`ssh public key`添加到远程服务器，默认位置是`~/.ssh/authorized_keys`文件(在`/etc/ssh/sshd_config`)里可以看到默认配置；
3. 设置`/etc/ssh/sshd_config`允许使用`public key`登录，额外地可以禁用密码登录
4. restart ssh:
```
#CentOS:
/etc/init.d/sshd restart
service sshd restart
#Debian/Ubuntu:
/etc/init.d/ssh restart
service ssh restart
systemctl restart ssh  # if use `systemd`
#Linux:
kill -HUP $(cat /var/run/sshd.pid)
```
```
RSAAuthentication yes
PubkeyAuthentication yes
AuthorizedKeysFile .ssh/authorized_keys
#不能用密码登录
PasswordAuthentication no              
```
4. `ssh-keygen -lf /etc/ssh/ssh_host_rsa_key.pub`，查看rsa加密的公钥指纹，可与客户端的比较，避免中间人攻击。（即使是key登录，也是用`/etc/ssh/ssh_host_rsa_key.pub发送到客户端`）

## ssh-agent
**把生成的private key添加进ssh的连接管理，这样就可以在服务器上通过private key进行ssh登录了**。
结合ssh-add使用
> https://help.github.com/articles/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent/#platform-linux
> http://wiki.jikexueyuan.com/project/github-developer-guides/using-ssh-agent.html
```bash
eval "$(ssh-agent -s)"  # 执行ssh-agent，并执行其输出 

ssh-add ~/.ssh/$teal_private_key   # 添加某个private key
ssh-add                # 默认添加id_rsa等默认生成的private key
ssh-add -l       # list added private key
```