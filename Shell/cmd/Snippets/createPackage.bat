@echo off
setlocal EnableDelayedExpansion

::复制7za.exe到Path路径下去
if exist 7za.exe (
	move 7za.exe C:\Windows\system32
)

set CUR_PATH=%~dp0
set SVN_DEV_PATH=trunk\node
set PKG_DIR=%CUR_PATH%\Packages
set ZIP_FILE_LIST=%PKG_DIR%\svn_modify_list.dat
::%1为svn临时文件，内有文件路径 
::set ZIP_FILE_LIST=%1
set PKG_FILE=%PKG_DIR%\change_file_path.dat

::提交文件数量
set /a FILE_COUNTS=0

cd %CUR_PATH%
::不兼容有changlist存在的情况，用%1更准确，但却是绝对路径，得换成相对路径 
svn status %SVN_DEV_PATH% > %ZIP_FILE_LIST%

echo. > %PKG_FILE%
FOR /f "tokens=1,2 delims= " %%A in (%ZIP_FILE_LIST:"=%) do (
	set /a FILE_COUNTS+=1

	set file=%%B
	::set file=!file:~%CUR_PATH_LEN%!
	echo !file! >> %PKG_FILE%
)

::get hour single, and padding left of hour with '0'
:: ' 9' => '9' => '09'
set _hh=%time:~0,2%
set _hh=%_hh: =%
if 1%_hh% lss 20 set _hh=0%_hh%
::get time
set datetime=%date:~0,4%%date:~5,2%%date:~8,2%_%_hh%%time:~3,2%%time:~6,2%

if %FILE_COUNTS% GTR 0 (
	7za a -tzip %PKG_DIR%\node_pkg_!datetime!.zip @%PKG_FILE%
	:: open packages folder
	start %PKG_DIR%
)

exit 0