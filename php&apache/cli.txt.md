1. php -S localhost:8080
   内建服务器
   
2. php -r <code>   (windows7下代码用双引号，其它操作系统用单引号或是双引号)
   php -r "echo 3;"
   
3. php -a （开启interactive mode，可输入多行代码运行，没）
http://stackoverflow.com/questions/17391811/how-to-execute-in-php-interactive-mode
	php -a --with-readline (interactive没开启时运行这行)

	php -a (enter)
	<?php 
	  $v = 3;
	  echo $v;
	?>
	(按Ctrl+Z)
	（enter)
   