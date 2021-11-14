### SSH

> http://www.ruanyifeng.com/blog/2011/12/ssh_remote_login.html

1.  生成 ssh keys: 在`~/.ssh/`目录下，
    `ssh-keygen -t rsa -b 4096 -C "$email"`，也可以用 XShell 生成公私钥，私钥留在本地；(公钥最后的邮件地址改了后，私钥就用不了了)
2.  把添加`ssh public key`添加到远程服务器，默认位置是`~/.ssh/authorized_keys`文件(在`/etc/ssh/sshd_config`)里可以看到默认配置；
3.  设置`/etc/ssh/sshd_config`允许使用`public key`登录，额外地可以禁用密码登录
4.  restart ssh:
```bash
#CentOS:
/etc/init.d/sshd restart
service sshd restart
#Debian/Ubuntu:
/etc/init.d/ssh restart
service ssh restart
systemctl restart ssh  # if use `systemd`
```

```conf
RSAAuthentication yes
PubkeyAuthentication yes
AuthorizedKeysFile .ssh/authorized_keys
#不能用密码登录
PasswordAuthentication no
```

4.  密钥登录不了的问题，手动创建`authorized_keys`就有这个问题，或是用`ssh-copy-id`就没有这个问题，文件和目录的权限问题，`~`, `~/.ssh` and `~/.ssh/authorized_keys`，对其它组不能是可写的。

5.  `ssh-keygen [-E md5] -lf /etc/ssh/ssh_host_rsa_key.pub`，查看 rsa 加密的公钥指纹，可与客户端的比较，避免中间人攻击。（即使是 key 登录，也是用`/etc/ssh/ssh_host_rsa_key.pub发送到客户端`），版本不同，默认输出的可能是 sha256 格式或是 md5 加密的，可以添加参数，指定格式`-E md5`

## ssh_config

配置`ssh_config`后，这样就可以登录了,`ssh aliyun`

##### ProxyCommand 当作 cli 参数使用

`ssh -o "ProxyCommand ssh -q -W %h:%p $gw" $aliyun`


### /etc/ssh/ssh_config配置文件
```conf
Host aliyun
# Hostname 必不可少呀，就算只是为了配置IdentityFile，也是要写这个的
Hostname 1.2.3.4
User root
IdentityFile ~/.ssh/id_rsa

# git clone git@github.com时会用到的private key(0644的权限会被git拒绝，因为其它人有读取权限)
Host github.com
# 设置代理
# 1. connect是msysGit里自带的
ProxyCommand connect -H web-proxy.oa.com:8080 %h %p
# 2. $gatewayService为跳板机
# 3. https://www.cyberciti.biz/faq/linux-unix-ssh-proxycommand-passing-through-one-host-gateway-server/
ProxyCommand ssh -q -W %h:%p $gatewayService
ProxyCommand ssh $gateway nc %h %p

IdentityFile ~/.ssh/github
```

### ssh-agent

**把生成的 private key 添加进 ssh 的连接管理，这样就可以在服务器上通过 private key 进行 ssh 登录了**。结合 ssh-add 使用

> https://help.github.com/articles/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent/#platform-linux
 > http://wiki.jikexueyuan.com/project/github-developer-guides/using-ssh-agent.html

```bash
eval "$(ssh-agent -s)"  # 执行ssh-agent，并执行其输出

ssh-add ~/.ssh/$teal_private_key   # 添加某个private key
ssh-add                # 默认添加id_rsa等默认生成的private key
ssh-add -l       # list added private key
```

### Xshell

跳板机的设置：
https://www.netsarang.com/knowledgebase/xshell/3836/Multi-Hop_Login_Using_Xshell

1.  Login Scripts Feature
2.  SSH_PASSTHROUGH
    只是传递环境变量到跳板机，然后用跳板机里的.bash_profile 处理代理？
