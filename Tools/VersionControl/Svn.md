```conf
### svn
svn checkout $repo/$folder .    # 获取repo，也可以用于第一次获取。  加个 . ，就会不包含$folder文件夹了

svn revert /path/file

svn diff --summarize -r$repo:$(($repo -1)) $svnpath

svn export -r $repo --depth=empty $exportfilepath $outfilepath

# update 
svn update /etc/nginx --username odms --password xxxx
```

#### 如何清理SVN清理不了的问题
> http://jingyan.baidu.com/article/295430f1d728830c7e0050f9.html
 wc.db 为.svn下的，copy过来，处理完了再去覆盖
`sqlite3 wc.db`
`select* from work_queue;`
如果此时查询有记录，则执行以下命令：
`delete from work_queue;`
将D:\tools\svn\wc.db文件，覆盖本地svn文件库目录 .svn目录下的wc.db文件
然后再右键点击本地svn文件库目录,执行clean up,就能够正常清理了。