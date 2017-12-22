<VirtualHost *:800>

ServerName p.me

DocumentRoot "/data/php"
	
<Directory "/data/php">

   AllowOverride None
   Order deny,allow   #deny后面的逗号后不能有空格
   #Require local

   Allow from all
</Directory>

</VirtualHost>


#访问文件目录，
<VirtualHost *:80>
    <Directory "/data/php">
		#DirectoryIndex a.php  #define open file，a.php在此路径下是不存在的，所以就会列出目录，需要下面一行的支持。（下面一行我也不知道具体是做什么的）
		Options +Indexes
    </Directory>
</VirtualHost>