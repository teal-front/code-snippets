#### VIM 高级使用：https://www.ibm.com/developerworks/cn/linux/l-cn-tip-vim/

#### 极客时间：《VIM实用技巧必知必会》https://time.geekbang.org/column/article/272121
#### 实战篇：http://coolshell.cn/articles/5426.html

#### online tutorial: http://www.openvim.com/

#### Webstorm plugin: https://github.com/JetBrains/ideavim

## Bash

1.  Ctrl + r
2.  Ctrl + a
3.  Ctrl + e
4.  Ctrl + u
5.  Ctrl + k
6.  **命令前面加上#，记录但不执行**

#### cli

1.  `vi {filename}` #编辑文件
2.  `vim +143 filename.txt` # 进入到指定的行
3.  `vim +/searchText filename.txt` # 进入到 searchText 首次出现的位置

## vi | vim

补充一个 vi 的命令：

1.  在默认的"指令模式"下按 i 进入编辑模式
2.  在非指令模式下按 ESC 返回指令模式
3.  在"指令模式"下输入:

#### 指令模式

1.  u 撤销更改
2.  . 重复更改的动作
3.  ; 重复查找的动作
4.  * 向下查找下一个word， # 向上查找word
5.  :sh 进入 shell 环境，然后 Ctrl+D 回来 vi/vim
6.  Ctrl+g 显示光标所在行号，文件状态
7.  **:n 定位到 n 行**
8.  **`I` 在行首插入光标，`A`在当前行尾插入，`o` 在当前行 换行并插入， `O` 在当前行之前换行并插入**
9.  搜索：/ ? ，可用上下来查找历史输入

#### Insert Model(按 i 进入)

1.  **:e! #撤销所有更改**
2.  `:wq` #组合指令, 保存并退出
3.  `:w` filename #当前文本另存为 filename
4.  `:! command` # 暂时离开 vim 运行某个 linux 命令
5.  `:w` #保存当前文件
6.  `:q` #退出编辑,如果文件为保存需要用强制模式
7.  `:q!` #强制退出不保存修改
8.  `ZZ` #在指令模式下保存并退出
9.  `Ctrl+P(N)` 自动补全模式

#### Column Edit Mode

1. `Ctrl + v` to go into `column mode`.
2. Select the columns and rows where you want to enter your text.
3. `Shift + i` to go into `insert mode` in `column mode`.
4. Type in the text you want to enter. Don't be discouraged by the fact that only the first row is changed. `Esc` to apply your change (or alternately `Ctrl + C` ).

#### Visal Model(按 v 进入)

1.  进去可移动光标，然后按 y 复制

#### VIM 插件管理

https://github.com/VundleVim/Vundle.vim
普通模式：PluginInstall

#### less 翻页

Ctrl + f(fron) 下一页
Ctrl + b(back) 上一页

### 查找命令

/text 　　查找 text，按 n 健查找下一个，按 N 健查找前一个。

?text 　　查找 text，反向查找，按 n 健查找下一个，按 N 健查找前一个。

vim 中有一些特殊字符在查找时需要转义　　.*[]^%/?~\$
:set ignorecase 　　忽略大小写的查找
:set noignorecase 　　不忽略大小写的查找
\*\*查找很长的词，如果一个词很长，键入麻烦，可以将光标移动到该词上，按*或#键即可以该单词进行搜索，相当于/搜索。而#命令相当于?搜索。\*\*

###### hl: highlight

:set hlsearch 　　高亮搜索结果，所有结果都高亮显示，而不是只显示一个匹配。
:set nohlsearch 　　关闭高亮搜索显示
:noh 　　关闭当前的高亮显示，如果再次搜索或者按下 n 或 N 键，则会再次高亮。
:set incsearch 　　逐步搜索模式，对当前键入的字符进行搜索而不必等待键入完成。
:set wrapscan 　　重新搜索，在搜索到文件头或尾时，返回继续搜索，默认开启。

### 替换命令

1.  ra 将当前字符替换为 a，当期字符即光标所在字符。
2.  s/old/new/ 用 old 替换 new，替换当前行的第一个匹配
3.  s/old/new/g 用 old 替换 new，替换当前行的所有匹配
4.  %s/old/new/ 用 old 替换 new，替换所有行的第一个匹配
5.  %s/old/new/g 用 old 替换 new，替换整个文件的所有匹配
    :10,20 s/^/ /g 在第 10 行知第 20 行每行前面加四个空格，用于缩进。
    ddp 交换光标所在行和其下紧邻的一行。

### 移动命令

1.  h 左移一个字符
2.  l 右移一个字符，这个命令很少用，一般用 w 代替。
3.  k 上移一个字符
4.  j 下移一个字符以上四个命令可以配合数字使用，比如 20j 就是向下移动 20 行，5h 就是向左移动 5 个字符，在 Vim 中，很多命令都可以配合数字使用，比如删除 10 个字符 10x，在当前位置后插入 3 个！，3a！<Esc>，这里的 Esc 是必须的，否则命令不生效。
5.  w 向前移动一个单词（光标停在单词首部），如果已到行尾，则转至下一行行首。此命令快，可以代替 l 命令。
6.  e，同 w，只不过是光标停在单词尾部
7.  b 向后移动一个单词 2b 向后移动 2 个单词
8.  ge，同 b，光标停在单词尾部。
9.  ^ 移动到本行第一个非空白字符上。
10. 0（数字 0）移动到本行第一个字符上，
11. $ 移动到行尾 3$ 移动到下面 3 行的行尾
12. gg 移动到文件头。 = [[
    G（shift + g） 移动到文件尾。 = ]]
13. f（find）命令也可以用于移动，fx 将找到光标后第一个为 x 的字符，3fd 将找到第三个为 d 的字符。
14. F 同 f，反向查找。跳到指定行，冒号+行号，回车，比如跳到 240 行就是 :240 回车。另一个方法是行号+G，比如 230G 跳到 230 行。
    Ctrl + d 向下滚动半屏
    Ctrl + u 向上滚动半屏
    Ctrl + f 向下滚动一屏
    Ctrl + b 向上滚动一屏

### 撤销和重做

1.  u 撤销（Undo）
2.  U 撤销对整行的操作
3.  Ctrl + r 重做（Redo），即撤销的撤销。

### 删除命令

1.  x 删除当前字符
2.  3x 删除当前光标开始向后三个字符
3.  X 删除当前字符的前一个字符。X=dh
4.  dl 删除当前字符， dl=x
5.  dh 删除前一个字符
6.  dd 删除当前行
7.  dj 删除上一行
8.  dk 删除下一行
9.  10d 删除当前行开始的 10 行。
10. D 删除当前字符至行尾。D=d\$
11. d\$ 删除当前字符之后的所有字符（本行）
    kdgg 删除当前行之前所有行（不包括当前行）
    jdG（jd shift + g） 删除当前行之后所有行（不包括当前行）
12. :1,10d 删除 1-10 行
13. :11,$d 删除 11 行及以后所有的行
    :1,$d 删除所有行
14. J(shift + j)　　删除两行之间的空行，实际上是合并两行。

### 拷贝和粘贴

1.  yy 拷贝当前行
2.  nyy 拷贝当前后开始的 n 行，比如 2yy 拷贝当前行及其下一行。
3.  p 在当前光标后粘贴,如果之前使用了 yy 命令来复制一行，那么就在当前行的下一行粘贴。
4.  shift+p 在当前行前粘贴
5.  :1,10 co 20 将 1-10 行插入到第 20 行之后。
6.  :1,$ co $ 将整个文件复制一份并添加到文件尾部。
7.  正常模式下按 v（逐字）或 V（逐行）进入可视模式，然后用 jklh 命令移动即可选择某些行或字符，再按 y 即可复制
8.  ddp 交换当前行和其下一行
9.  xp 交换当前字符和其后一个字符

### 剪切命令

1.  正常模式下按 v（逐字）或 V（逐行）进入可视模式，然后用 jklh 命令移动即可选择某些行或字符，再按 d 即可剪切
2.  ndd 剪切当前行之后的 n 行。利用 p 命令可以对剪切的内容进行粘贴
3.  :1,10d 将 1-10 行剪切。利用 p 命令可将剪切后的内容进行粘贴。
4.  :1, 10 m 20 将第 1-10 行移动到第 20 行之后。

### 退出命令

1.  :wq 保存并退出
2.  ZZ 保存并退出
3.  :q! 强制退出并忽略所有更改
4.  :e! 放弃所有修改，并打开原来文件。

### 窗口命令

1.  :split 或 new 打开一个新窗口，光标停在顶层的窗口上
2.  :split file 或:new file 用新窗口打开文件
3.  split 打开的窗口都是横向的，使用 vsplit 可以纵向打开窗口。
4.  Ctrl+ww 移动到下一个窗口
5.  Ctrl+wj 移动到下方的窗口
6.  Ctrl+wk 移动到上方的窗口

### 关闭窗口

1.  :close 最后一个窗口不能使用此命令，可以防止意外退出 vim。
2.  :q 如果是最后一个被关闭的窗口，那么将退出 vim。
3.  ZZ 保存并退出。
4.  关闭所有窗口，只保留当前窗口
    :only
    录制宏按 q 键加任意字母开始录制，再按 q 键结束录制（这意味着 vim 中的宏不可嵌套），使用的时候@加宏名，比如 qa。。。q 录制名为 a 的宏，@a 使用这个宏。

### 执行 shell 命令

1.  :!command
2.  :!ls 列出当前目录下文件
3.  :!perl -c script.pl 检查 perl 脚本语法，可以不用退出 vim，非常方便。
4.  :!perl script.pl 执行 perl 脚本，可以不用退出 vim，非常方便。
5.  :suspend 或 Ctrl - Z 挂起 vim，回到 shell，按 fg 可以返回 vim。

### 注释命令

1.  perl 程序中#开始的行为注释，所以要注释某些行，只需在行首加入#
2.  3,5 s/^/#/g 注释第 3-5 行
3.  3,5 s/^#//g 解除 3-5 行的注释
4.  1,\$ s/^/#/g 注释整个文档。
5.  :%s/^/#/g 注释整个文档，此法更快。

### 帮助命令

1.  :help or F1 显示整个帮助
2.  :help xxx 显示 xxx 的帮助，比如 :help i, :help CTRL-[（即 Ctrl+[的帮助）。
3.  :help 'number' Vim 选项的帮助用单引号括起
4.  :help <Esc> 特殊键的帮助用<>扩起
5.  :help -t Vim 启动参数的帮助用-
6.  ：help i*<Esc> 插入模式下 Esc 的帮助，某个模式下的帮助用模式*主题的模式帮助文件中位于||之间的内容是超链接，可以用 Ctrl+]进入链接，Ctrl+o（Ctrl + t）返回其他非编辑命令

### 重复前一次命令

1.  :set ruler?　　查看是否设置了 ruler，在.vimrc 中，使用 set 命令设制的选项都可以通过这个命令查看
2.  :scriptnames 　　查看 vim 脚本文件的位置，比如.vimrc 文件，语法文件及 plugin 等。
3.  :set list 显示非打印字符，如 tab，空格，行尾等。如果 tab 无法显示，请确定用 set lcs=tab:>-命令设置了.vimrc 文件，并确保你的文件中的确有 tab，如果开启了 expendtab，那么 tab 将被扩展为空格。

### Vim 教程

在 Unix 系统上`$ vimtutor`
