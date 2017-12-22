## Git
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
git fetch    # 拉新，并丢弃本地修改

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

git commit -m 'comment here'   # 只是提交到本地
git commit -a -m 'comment all'   # 先添加了，再提交 ？

git checkout -- $file   #丢弃某个文件本地修改，提交到暂存区的也可以
git reset HEAD $file # unstage a file
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


---


我之前做开发一直使用SVN,从上一家单位开始使用Git，到现在大概一年多时间。使用Git让我开发工作变的更自由更快,以及Git帮助团队代码管理和review更规范，现在我已经完全放弃使用SVN全身心拥抱Git。今天整理了一些SVN和Git的对比，希望阅读到此文使用SVN的开发团队能开始迁移到Git,引用习大大最近的一句话啊：世界潮流,浩浩荡荡，顺之则昌，逆之则亡。

Git对比SVN的优势
1.Git分支功能最为强大，分支管理能力让SVN望尘莫及
•	git：有本地分支
•	svn：无本地分支 git可以方便创建本地分支，且创建分支的时间是0(1)，即瞬间就创建好了。由于分支可以是本地的，也就不存在svn目录权限的问题。本地实验不确定的修改，可以创建分支进行，由于在Git上创建分支几乎零成本，git推荐创建分支来隔离修改。
Git可以很容易地对比两个分支，知道一个分支中哪些提交尚未合并到另一分支，反之亦然。 •	查看当前分支比other分支多了哪些提交：  $ git log other.. •	  •	查看other分支比当前分支多了哪些提交：  $ git log ..other  SVN想做到这些不太容易。

2.Git可以实现更好的发布控制
针对同一个项目，Git可以设置不同层级的版本库（多版本库）， 或者通过不同的分支（多分支）实现对发布的控制。 •	设置只有发布管理员才有权限推送的版本库或者分支，用于稳定发布版本的维护。 •	设置只有项目经理、模块管理员才有权推送的版本库或者分支，用用于整合测试。

3.隔离开发，提交审核
如何对团队中的新成员的开发进行审核呢？在Git服务器上可以实现用户自建分支和自建版本库的功能， 这样团队中的新成员既能将本地提交推送到服务器以对工作进行备份， 又能够方便团队中的其他成员对自己的提交进行审核。

审核新成员提交时，从其个人版本库或个人分支获取（fetch）提交，从提交说明、代码规范、编译测试 等多方面对提交逐一审核。审核通过执行 git merge 命令合并到开发主线中。

4.对合并更好的支持，更少的冲突，更好的冲突解决 因为Git基于对内容的追踪而非对文件名追踪，所以遇到一方或双方对文件名更改时， Git能够很好进行自动合并或提供工具辅助合并。而SVN遇到同样问题时会产生树冲突， 解决起来很麻烦。 Git的基于DAG（有向非环图）的设计比SVN的线性提交提供更好的合并追踪， 避免不必要的冲突，提高工作效率。这是开发者选择Git、抛弃SVN的重要理由。

5.版本库的安全性
SVN版本库安全性很差，是管理员头痛的问题。 •	SVN版本库服务器端历史数据被篡改，或者硬盘故障导致历史数据被篡改时， 客户端很难发现。管理员的备份也会被污染。 •	SVN作为集中式版本控制系统，存在单点故障的风险。备份版本库的任务非常繁重。 Git在这方面完胜SVN。首先Git是分布式版本控制系统，每个用户都相当于一份备份， 管理员无需为数据备份而担心。再有Git中包括提交、文件内容等都通过SHA1哈希保证数据的完整性， 任何恶意篡改历史数据都会被及时发现从而被挫败。

更多的十条喜欢Git的理由
•	异地协同工作。
•	现场版本控制。
•	重写提交说明。
•	无尽的后悔药。
•	更好用的提交列表。
•	更好的差异比较。
•	工作进度保存。
•	作为SVN前端实现移动办公。
•	无处不在的分页器。
•	快。
什么情况推荐使用SVN
夸了这么多Git的优点，当然事实上也是如此，做开发还是拥抱Git吧。不过对于以二进制文件 （Word文档、PPT演示稿） 为主的版本库，为避免多人同时编辑造成合并上的困难， 建议使用SVN做版本控制。因为SVN具有的悲观锁的功能，能够实现一个用户在编辑时对文件进行锁定，阻止多人同时编辑 一个文件。这一悲观锁的功能是 Git 所不具备的。

总结
Git相比SVN优势还是挺明显的，由于SVN比Git早几年出现，在国内不少成熟(gubuzifeng)的团队还在使用SVN，Git这几年才在国内开始流行，并已经成为年轻团队代码管理必备了。SVN因为没有分支功能，所以对一般开发者而言可能使用起来更简单（对管理者而言可能会头疼），只需要GUI工具就基本能满足需求，而Git因为有强大的分支功能和修改保存功能等，团队代码管理规范的公司为了规范代码的管理需要每个开发者精确的使用Git分支能力,开发者因此需要掌握分支维护能力以及其他Git高级功能，这会增加普通开发者的学习成本。为了团队代码维护更好的，同时提高团队每个成员的开发效率，掌握git技能，放弃SVN拥抱Git是值得的。