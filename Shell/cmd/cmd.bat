::http://www.jb51.net/article/5828.htm
::http://ss64.com/nt/syntax-brackets.html
::http://www.cnblogs.com/linglizeng/archive/2010/01/29/Bat-CMD-ChineseVerion.html  (主要语法的说明 )

echo #########common#############
dir dirctory
del f.txt
rename f.txt f.txt_new
copy src.txt dist.txtc
move src.txt dist.txt

# System config
inetcpl.cpl    # 打开Internet属性
netstat -an    # 查看网络端口
services.msc   # 查看系统服务
config system  # 直接打开系统属性设置窗口（可修改环境变量的）


echo #以管理员的方式打开CMD窗口#
echo From:http://stackoverflow.com/questions/8249705/how-to-run-an-application-as-run-as-administrator-from-the-command-prompt
C:\> runas /user:<localmachinename>\administrator cmd

echo #获得文件的所有权限#
takeown -f filename.ext                 # 获得文件访问权
Icacls filename.ext /grant {currentUser}:F  # 获得文件的所有权限

echo #删除很长文件名的文件#
dir /X                   # 显示文件列表，额外显示文件的短名{shortFileName}}
del {shortFileName}      # 用上一步显示的短名删除即可

:: ()里的是组合命令group expression,是在编译时把变量就赋值了,而一般情况下是运行到某一行时把变量赋值的
:: ()里的变量与外面的一样都是全局的
:: 如果在()里面需要运行到某行时给变量赋值,则setlocal EnableDelayedExpansion,结合!var!
:: set a='3'
:: set a='4'&&echo %a%  输出3,因为是单行执行时就给变量赋值了
:: 如果碰到'ECHO 处于关闭状态'，则多半是用了(echo %var%),此时%var%为空
setlocal EnableDelayedExpansion
set a='4'
(
    set a='3'
    echo %a%   ::输出4
    echo !a!   ::输出3
)

::变量输出时不带引号 %var:"=%，用到了变量替换
set widget="change_file_pkg.dat"
FOR /f "tokens=1,2 delims= " %%A in (%ZIP_FILE_LIST:"=%) do echo %%B >> %PKG_FILE%

::截取字符串长度
set date=%date:~3,2%
::替换字符串内容
set date=%date:"='%

::datetime YYmmdd_hhmmss,%date:~0,4%表示从0开始截取4个字符
set datetime=%date:~0,4%%date:~5,2%%date:~8,2%_%time:~0,2%%time:~3,2%%time:~6,2%

:: @：在一些命令中@filename，可以输出文件时的内容当作参数
7za a -tzip compress.zip @filename

rem   这是一行注释
:: 这也是一行注释

echo ************关闭命令行自身输出**************
rem 关闭所有命令行本身的输出
echo off

rem @:关闭当前行本身的输出
@cd ../

rem 关闭所有命令行本身+本行的输出
@echo off
echo ************************************


echo  *********Stat: 文件路径、大小等*******************
rem 文件路径
echo 当前盘符：%~d0
echo 当前路径：%cd%
echo 当前执行命令行：%0
echo 当前bat文件路径：%~dp0
echo 当前bat文件短路径：%~sdp0

:: 下面的?表示数字，%1为cmd命令的路径，%~n1就是取这个路径的filename
ECHO File Name Only       : %%~n?   
ECHO File Extension       : %%~x?
ECHO Name in 8.3 notation : %%~sn?
ECHO File Attributes      : %%~a?
ECHO Located on Drive     : %%~d?
ECHO File Size            : %%~z?
ECHO Last-Modified Date   : %%~t?
ECHO Parent Folder        : %%~dp?
ECHO Fully Qualified Path : %%~f?
ECHO FQP in 8.3 notation  : %%~sf?
ECHO Location in the PATH : %%~dp$PATH:?
echo *************************************


echo **********小函数*********************
rem 按任意键继续
pause

rem 调用bat文件，使bat文件执行完后返回当前bat
call invoke.bat
start invoke.bat

rem 输出文字颜色
color 02
echo ************************************



:: functions
:: get CUR_PATH string length
call :strlen CUR_PATH_LEN CUR_PATH
:: @function get string length
:strlen <resultVar> <stringVar>
(
    setlocal EnableDelayedExpansion
    set "s=!%~2!#"
    set "len=0"
    for %%P in (4096 2048 1024 512 256 128 64 32 16 8 4 2 1) do (
        if "!s:~%%P,1!" NEQ "" ( 
            set /a "len+=%%P"
            set "s=!s:~%%P!"
        )
    )
)
( 
    endlocal
    set "%~1=%len%"
    exit /b
)
