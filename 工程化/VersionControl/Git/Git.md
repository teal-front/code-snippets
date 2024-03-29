## Git

1.  本地三颗树， working directory、 stage、 head。新添加的文件会到 stage 区，commit 之后就到 head 了。
    ![trees](https://raw.githubusercontent.com/teal-front/code-snippets/master/Tools/VersionControl/images/trees.png)

> 在线模拟 git 命令： [https://try.github.io/](http://note.youdao.com/)

> http://rogerdudler.github.io/git-guide/index.zh.html

> https://www.liaoxuefeng.com/wiki/0013739516305929606dd18361248578c67b8067c8c017b000

> https://git-scm.com/book/zh

> git 飞行记录：https://github.com/k88hudson/git-flight-rules/blob/master/README_zh-cn.md

> github 下，`ssh key`的添加：在服务器/PC 上`~/.ssh/`生成密钥(`ssh-keygen -t ras`)，复制`id_rsa.pub`到`github>settings>ssh keys`也即可

## git-flow

> https://www.git-tower.com/learn/git/ebook/cn/command-line/advanced-topics/git-flow
> 非常流行的工作流程，一旦安装安装 git-flow，你将会拥有一些扩展命令。这些命令会在一个预定义的顺序下自动执行多个操作。是的，这就是我们的工作流程！**git-flow 并不是要替代 Git，它仅仅是非常聪明有效地把标准的 Git 命令用脚本组合了起来。**

# squash-rebase-workflow

https://blog.carbonfive.com/2017/08/28/always-squash-and-rebase-your-git-commits/

## 异常情况

### git pull omit error: cannot lock ref

https://lucius0.github.io/2017/01/06//archivers/error-cannot-lock-ref/
删除远程 ref，

```bash
git update-ref -d refs/remotes/heads/xxx
```

### init&clone&grep&help

```bash
# grep
# 仓库文件中去搜索！
git grep 'app'

# clean
git clean -f ## 清理工作区未暂存文件
git clean -n ## 查看工作区有哪些未暂存文件
```

### config&status

```bash
git config --global -l   # list global config
git config user.name  # get local user name
git config --global http.proxy http://127.0.0.1:8080   # set global http proxy
git config core.fileMode false    # 忽略文件权限修改，应该阻止提交到远程，而不是阻止过程的filemode覆盖了本地的
```

### pull&push&fetch

1.  本地 A 分支可 rebase master 后，提交到远程 master
2.  本地

```bash
git reset HEAD origin/master   # 丢弃你在本地的所有改动与提交，包括提交哦 ?只是暂存区的吧

git push -u origin master # 创建远程同名跟踪分支，同 --set-upstream

###  回退
git reset --hard HEAD~1    # 本地回退到上一版本,HEAD~n,n为0表示最新提交，与`git reflog`里的对应
git push origin master --force   # 将本地的版本强制提交，这样服务器上完全没有上一次提交的记录了

git push origin $localBranch:master     # 把localBranch提交到远程master分支
```

### remote

> https://git-scm.com/book/zh/v1/Git-%E5%9F%BA%E7%A1%80-%E8%BF%9C%E7%A8%8B%E4%BB%93%E5%BA%93%E7%9A%84%E4%BD%BF%E7%94%A8

```bash
git remote add {remoteName} git@github:teal-front/project.git
# push a git repo to folder over ssh
# need init a bare git repo(without a working tree) on ssh server
git init --bare myproject.git
git push --mirror {remoteName}   # 提交远程，整个git仓库，所有分支，所有历史
```

### add&commit&reset

```bash
# 通过add添加了文件，文件才能被commit
git add --all
git add -u  # 把工作区删除的文件记录添加到暂存区
git add foo.txt *.txt **/*
git add -i    # 交互式添加

git commit -m 'comment here'   # 只是提交到本地
git commit -a -m 'comment all'   # 修改文件添加到暂存区，再提交（不包含未跟踪文件）

git checkout -- $file  #还原工作区文件
git reset HEAD $file   #unstage a file，把暂存区的文件回复到本地

git checkout $branch -- . # 检出$branch分支到工作区与暂存区，**头指针不变**

git diff [HEAD --] $file

git checkout HEAD^2 -- $file   # 可用来恢复当前版本上删除的文件
git cat-file -p HEAD^2:$file > $filename  # 同上，但可能会有LF、CRLF的兼容问题
git show HEAD^2:$file > $filename    # 同上
```

### archive

```bash
git archive -o app.zip HEAD
git archive $branch | gzip > app.tar.gz
```

### log

```bash
git log
git log --graph --pretty=oneline
git reflog
```

## tag

> https://git-scm.com/book/zh/v1/Git-%E5%9F%BA%E7%A1%80-%E6%89%93%E6%A0%87%E7%AD%BE
> Git 使用的标签有两种类型：轻量级的（lightweight）和含附注的（annotated）

```bash
git tag     #list all tag
git tag -a 'v1.1.6' -m 'my version v1.1.6'    # add tag(含附注) , -a 就是含附注(annotate)的
git tag -a 'x.x.x' $commit_hash               # 从历史commit创建tag
git push origin $tagname                      # 需要主动推才行，不然remote上没有
git push --tags                               # 把本地tags都推远程
git push --follow-tags                        # ?
git tag -d $tagname                           # delete tag
```

## branch

> https://git-scm.com/book/zh/v2/Git-%E5%88%86%E6%94%AF-%E5%88%86%E6%94%AF%E7%9A%84%E6%96%B0%E5%BB%BA%E4%B8%8E%E5%90%88%E5%B9%B6

基于头指针 HEAD 创建

```bash
git branch $branch # create branch
git branch -d $branch # delete local branch
git branch -D $unmergeBranch  # 强制删除，即使没有合并到master
git push -d $remote $branch # delete remote branch
git checkout $branch
git remote prune orgin # 删除本地还存在，但远程已删除的分支

git cherry  # 查看比HEAD多出的ref
git cherry-pick test^2  # 把版本号检出到当前分支，会有它的提交记录

git rebase test  # vs merge
```

### merge

```bash
git merge $branch

git fetch orgin $branch
git merge   #  此时默认就是合并远程分支上的最新提交？
```

### rebase(变基)

> https://git-scm.com/book/zh/v2/Git-%E5%88%86%E6%94%AF-%E5%8F%98%E5%9F%BA
> 把分支 a 的修改提交到分支 b 上，然后统一由分支 b 来合并

- 进阶用法：squash, 合并多个 commit
  https://github.com/Jisuanke/tech-exp/issues/13

```bash
# 处理从最新的commit到结束的$commit，进行交互式的rebase
$ git rebase -i $commit
```

然后可以看到下面的命令提示，有一些 message 上的差别，squash 就是丢弃 message 了。
每个 commit 都会对应一个 command，编辑对应的 command 就行了；默认全是 pick，那就 rebase -i 就没什么意义了。

如果想要 Squash 成一个 commit，那就保留一个 Pick，其他的是 fixup/squash 就行了

```bash
# Commands:
# p, pick = use commit
# r, reword = use commit, but edit the commit message
# e, edit = use commit, but stop for amending                  ？？
# s, squash = use commit, but meld into previous commit
# f, fixed = like "squash", but discard this commit's log message
```

- 一般用法

```bash
## $tobePush得先提交到远程，rebase才能生效
git checkout $tobePush
git rebase $depreacte
git checkout master
git merge $tobePush

# 遇到冲突文件，先手动解决冲突，then
git add $conflictFile
git rebase --continue
```

## GPG

> 详情可参考 github 上的教程，很详情

1.  gen gpg key, `gpg --gen-key`,首选`RSA 4096`，还可以设置密码与有效期
2.  check key id, `gpg --list-secret-keys --keyid-format LONG`

```config
/Users/hubot/.gnupg/secring.gpg
------------------------------------
sec   4096R/$keyid 2016-03-10 [expires: 2017-03-10]
uid                          $username $comment ($email)
ssb   4096R/42B317FD4BA89E7A 2016-03-10
```

3.  output public key, `gpg --armor --export $keyid`
4.  add key id to github or somewhere, must begin with `-----BEGIN PGP PUBLIC KEY BLOCK-----`，and end ditto
5.  config git with gpg, `git config --global user.signingkey $keyid`, `git config commit.gpgsign true`,后一个设置了，以后 commit 就会自动 sign 了
6.  sign the commit: `git commit -S` or sign the tag: `git tag -s $tag`
7.  `git push`

#### GPG key passphrase

1.  mac 可用https://gpgtools.org/或者`gpg-agent`来保存密码，免得频繁输入

#### Edit gpg key

`gpg --edit-key $keyid`

#### add remote key

比如 nodejs 的安装包验证，需要在 gpg key server 上下载 key 到本地，https://github.com/nodejs/node/#release-team

`gpg --keyserver $keyserver --recv-keys $id`

`gpg --verify 'SHASUM256.txt.asc'`

`gpg --verify 'SHASUM256.txt.sig' 'SHASUM256.txt'`
