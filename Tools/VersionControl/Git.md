## Git
1. 本地三颗树， working directory、 stage、 head。新添加的文件会到stage区，commit之后就到head了。
![trees](https://raw.githubusercontent.com/teal-front/code-snippets/master/Tools/VersionControl/images/trees.png)

> 在线模拟git命令： [https://try.github.io/](http://note.youdao.com/)

> http://rogerdudler.github.io/git-guide/index.zh.html

> https://www.liaoxuefeng.com/wiki/0013739516305929606dd18361248578c67b8067c8c017b000

> https://git-scm.com/book/zh

> git飞行记录：https://github.com/k88hudson/git-flight-rules/blob/master/README_zh-cn.md

> github下，`ssh key`的添加：在服务器/PC上`~/.ssh/`生成密钥(`ssh-keygen -t ras`)，复制`id_rsa.pub`到`github>settings>ssh keys`也即可

### init&clone&grep&help
```bash
git init
git clone git@github.com:xxx/project.git  # 可能在克隆项目里含有了.git文件，这时应使用里面的

git help $somecommand   # help

# grep
# 仓库文件中去搜索！
git grep 'app' 
```

### config&status
```bash
git status

git config --global -l   # list global config
git config user.name  # get local user name
git config --global http.proxy http://127.0.0.1:8080   # set global http proxy
git config core.fileMode false    # 忽略文件权限修改，应该阻止提交到远程，而不是阻止过程的filemode覆盖了本地的

```
### pull&push&fetch

```bash
git fetch $origin   # 拉新，并丢弃本地修改
git reset HEAD origin/master   # 丢弃你在本地的所有改动与提交，包括提交哦 

git push --mirror {name}   # 提交远程，并带上历史版本
git push -u origin master # github上新建仓库后的教程上的，还没用过

###  回退
git reset --hard HEAD~1    # 本地回退到上一版本,HEAD~n,n为0表示最新提交，与`git reflog`里的对应
git push origin master --force   # 将本地的版本强制提交，这样服务器上完全没有上一次提交的记录了

git push origin master     # 提交到远程仓库 

git pull                
git pull origin master   # 指定向origin/master拉取
```

### remote
> https://git-scm.com/book/zh/v1/Git-%E5%9F%BA%E7%A1%80-%E8%BF%9C%E7%A8%8B%E4%BB%93%E5%BA%93%E7%9A%84%E4%BD%BF%E7%94%A8
```bash
git remote add {name} git@github:teal-front/project.git
git remote -v          # list all remote repo verbose
```

### add&commit&reset
```bash
# 通过add添加了文件，文件才能被commit
git add --all
git add foo.txt *.txt **/*
git add -i    # 交互式添加

git commit -m 'comment here'   # 只是提交到本地
git commit -a -m 'comment all'   # 先添加了，再提交 ？

git checkout -- $file   #丢弃某个文件本地修改，已添加到暂存区的改动以及新文件都不会受到影响。
git reset HEAD $file # unstage a file，把暂存区的文件回复到本地

git diff [HEAD --] $file
```

### log
```bash
git log
git reflog
```

## tag
> https://git-scm.com/book/zh/v1/Git-%E5%9F%BA%E7%A1%80-%E6%89%93%E6%A0%87%E7%AD%BE
```bash
git tag     #list all tag
git tag -a 'v1.1.6' -m 'my version v1.1.6'    # add tag
git tag -d $tagname                           # delete tag
```

## branch
> https://git-scm.com/book/zh/v2/Git-%E5%88%86%E6%94%AF-%E5%88%86%E6%94%AF%E7%9A%84%E6%96%B0%E5%BB%BA%E4%B8%8E%E5%90%88%E5%B9%B6
```bash
git branch $branch # create branch
git branch -d $branch # delete local branch
git branch -D $unmergeBranch  # 强制删除，即使没有合并到master
git push -d $remote $branch # delete remote branch
git checkout $branch
```
### merge
```bash
git merge $branch
```
### rebase(变基)
> https://git-scm.com/book/zh/v2/Git-%E5%88%86%E6%94%AF-%E5%8F%98%E5%9F%BA
把分支a的修改提交到分支b上，然后统一由分支b来合并
```bash
git checkout $c4
git rebase $c3
git checkout master
git merge $c4
```

## GPG
> 详情可参考github上的教程，很详情
1. gen gpg key, `gpg --gen-key`,首选`RSA 4096`，还可以设置密码与有效期
2. check key id, `gpg --list-secret-keys --keyid-format LONG`
```config
/Users/hubot/.gnupg/secring.gpg
------------------------------------
sec   4096R/$keyid 2016-03-10 [expires: 2017-03-10]
uid                          $username $comment ($email)
ssb   4096R/42B317FD4BA89E7A 2016-03-10
```
3. output public key, `gpg --armor --export $keyid`
3. add key id to github or somewhere, must begin with `-----BEGIN PGP PUBLIC KEY BLOCK-----`，and end ditto
4. config git with gpg, `git config --global user.signingkey $keyid`, `git config commit.gpgsign true`,后一个设置了，以后commit就会自动sign了
5. sign the commit: `git commit -S` or sign the tag: `git tag -s $tag`
6. `git push`

#### GPG key passphrase
1. mac可用https://gpgtools.org/或者`gpg-agent`来保存密码，免得频繁输入
#### Edit gpg key
`gpg --edit-key $keyid` ...
#### add remote key
比如nodejs的安装包验证，需要在gpg key server上下载key到本地，https://github.com/nodejs/node/#release-team
`gpg --keyserver $keyserver --recv-keys $id`
`gpg --verify 'SHASUM256.txt.asc'`
`gpg --verify 'SHASUM256.txt.sig' 'SHASUM256.txt'`
---