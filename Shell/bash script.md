#### Debug

https://coolshell.cn/articles/1379.html

1.  `bash -x $shell.sh` # 打印出了每一行命令的输出
2.  `export PS4='+${BASH_SOURCE}:${LINENO}:${FUNCNAME[0]}: '` # 在上面的跟踪里输出行号
3.  开始处`set -x`，结束时`set +x`。只输出区域内的命令
4.  [bashdb](http://bashdb.sourceforge.net/) 专门的调试工具

```bash
sh -x some.sh;  -x 用来调试脚本
sh -n some.sh   -n 沙箱测试脚本有没有错误，不会实际执行
```

#### String

> Shell Parameter Expansion
> https://ss64.com/bash/syntax-expand.html#parameter

```bash
var="i am teal"
${var}             # $var
${var-DEFAULT}     # 如果$var没有声明，以$DEFAULT为其值
${#var}            # get $var's length

## Shell Parameter Expansion (表达示扩展)
${str:position}    # from $position to slice string
${str:position:length} # from $position get $length substring
${str#pattern}     # 从$str开头，删除最短匹配$pattern的子串
${str##pattern}    # 从$str开头，删除最长匹配$pattern的子串
${str%pattern}     # 从$str结尾，删除最短匹配$pattern的子串
${str%%pattern}    # 从$str结尾，删除最长匹配$pattern的子串
${str/pattern/replacement}  # 使用 $replacement, 来代替第一个匹配的 $pattern
${str//pattern/replacement}  # 使用 $replacement, 来代替所有匹配的 $pattern

long='123456789abdcdefg'
echo ${long#*a}   # dbcdefg  (*a)为正则表达示

# 获取文件扩展名 & 文件名
# https://www.gnu.org/software/bash/manual/html_node/Shell-Parameter-Expansion.html
filename=$(basename "$fullfile")
extension="${filename##*.}"
filename="${filename%.*}"
```

#### Var

```bash
f='i am  teal'
echo $f   # 'i am teal'
echo "$f"  # 'i am   teal'  # 用双引号输出变量时，里面的空格会保留

## 位置变量
$$  # pid
$@  # 传递给脚本或函数的参数个数, "$@" => "$1" "$2" "$3"
$*  # 传递给脚本或函数的参数个数, "$*" => "$1 $2 $3"
$0  # 当前脚本文件名
$1  # 第一个参数
```

#### Array

```bash
arr=(a1 a2 a3 a4)
echo ${#arr[@]}      # get arr length
echo $arr[0]
for i in ${arr[@]};   # ${arr[@]}输出所有数组元素
```

#### Function

```bash
# 函数调用之前要先赋值
function sum() {
	sum=$[$1 + $2]
	echo $sum
}
sum $1 $2   # 函数调用就像命令行一样

function sum() {
	i=1
	sum=0
	while [ $i -lt $1 ]; do
		sum=$[$sum+$i]
		i=$[$i+1]
	done

	echo sum
}
n=0
while [ $n -lt 1 ]; do
	read -p 'input a num:' n
done
sum $n
```

#### if/for/while/case

```bash
# for
apps=('app1' 'app2' 'app3')
for app in ${apps[@]}; do
   echo $app
done

for i in `ls`; do
for f in /path/to/*; do   # 路径不能加”“，不然f不是想要的结果
for i in `seq 1 5`; do
	echo $i
done

for f in /path/*; do
    if [ -f $f ];then
        continue
    fi
    if [ -d /path/$file ]; then
        break
    fi
done

# 用for结合cat $file时，先把IFS设置成换行符，避免单行中空格会被分隔
# IFS(internal field separator) :内部域分隔符
# !! windows中的文本编辑，换行其实是回车符(\n)，而不是\r，也需要替换成\r
IFS=$'\n';
for line in `cat $file`; do
	echo $line
done

# read line by line
# IFS='' (or IFS=) prevents leading/trailing whitespace from being trimmed.
# -r prevents backslash escapes from being interpreted.
# [[ -n $line ]] prevents the last line from being ignored if it doesn't end with a \n (since read returns a non-zero exit code when it encounters EOF).
while IFS='' read -r line || [[ -n "$line" ]]; do
    echo "Text read from file: $line"
done < $file

# while
a=0
while [ $a -ge 1 ]; do  # [ xx ],中括号与字符之间有空格
	echo "$a"
	a=$[$a - 1]
done

# case
case $a in
	1)
		echo 'case 1'
		;;
	2)
		echo 'case 2'
		;;
	*)
		;;
esac

# if command
# 如果command输出的状态码为0，则if执行then部分
# test condition，专门用来判断条件是否成立，成立则输出状态码为0，故 if test condition => if [ condition ]

# condition
read -p 'input a:' a
if ((a < 6)); then   # 得两层括号
	echo 'if'
elif ((a > 7 && a < 10)); then
	echo 'elif'
else
	echo 'else'
fi

# getopts
# exec   -p xxx -h
while getopts :p:h: OPTION
do
    case ${OPTION} in
        p)
        PROJECT=${OPTARG}
        have_p=true
        ;;
	    h)
        Usage
        exit 0
        ;;
	esac
done

# http://tldp.org/LDP/Bash-Beginners-Guide/html/sect_07_01.html
# 正则比较
if [[ $url =~ ^https && ! $url =~ \.scss$ ]]    # 以https开头的url，正则不需要加/regexp/
if [[ $url =~ \.[a-zA-Z]+$ ]]  # 路径为文件
# 比较符：-gt -eq -ge -ne
if [$a -lt 1] || [$a -gt 3]; then
# 文件属性
if [ ! -d /home ]     #  !
if [ -d /home ]         # 是否是目录且存在
   [ -e $file/$direction ] # 文件或目录是否存在
   [ -s $file]            #file exists and size greater than zero
   [ -f $file ]          # 是否是普通文件且存在
   [ -r $file ]          # 读权限
   [ -w $file ]          # 写权限
```

#### Other

```bash
# date
date '+%Y%m%d %H:%M:%S'    # 20160916 12:00:00
d=`date '+%Y%m%d %H:%M:%S'  # 反引号直接执行，同$()
echo "the script begin at $d"

# cala
num1=3   # 等号之间不能有空格
num2=4
sum=$[$num1+$num2]         # 数学计算加上$[]

# repl
read -p 'please input a number' x      # 读屏，赋值给x变量
echo 'please input a number'
read x

# params
# $0：脚本名，$1: 第一个参数值，$2:每2个参数值
otherSum=$[$1+$2]
echo $otherSum

# numeric argument required, exit的参数得是整数
exit 0
```
